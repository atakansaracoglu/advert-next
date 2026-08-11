"use client";

import { useEffect, useRef, useCallback } from "react";

export function useFullpage(containerRef: React.RefObject<HTMLDivElement | null>) {
  const currentIndex = useRef(0);
  const isAnimating = useRef(false);
  const sectionOffsets = useRef<number[]>([]);
  const touchStartY = useRef(0);

  const computeOffsets = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const sections = container.querySelectorAll<HTMLElement>(
      ".fullpage-section, .fullpage-section-auto"
    );
    let offset = 0;
    const offsets: number[] = [0];
    sections.forEach((section, i) => {
      if (i > 0) {
        offset += sections[i - 1].offsetHeight;
        offsets.push(offset);
      }
    });
    sectionOffsets.current = offsets;
  }, [containerRef]);

  const scrollTo = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;
      const wrapper = container.querySelector<HTMLElement>(".fullpage-wrapper");
      if (!wrapper) return;

      computeOffsets();
      const offsets = sectionOffsets.current;
      const maxScroll = wrapper.scrollHeight - container.clientHeight;

      if (index < 0) index = 0;
      if (index >= offsets.length) index = offsets.length - 1;

      let targetOffset = offsets[index];
      if (targetOffset > maxScroll) targetOffset = maxScroll;

      currentIndex.current = index;
      isAnimating.current = true;
      wrapper.style.transform = `translateY(-${targetOffset}px)`;

      setTimeout(() => {
        isAnimating.current = false;
      }, 1000);
    },
    [containerRef, computeOffsets]
  );

  const scrollToId = useCallback(
    (id: string) => {
      const container = containerRef.current;
      if (!container) return;
      const sections = container.querySelectorAll<HTMLElement>(
        ".fullpage-section, .fullpage-section-auto"
      );
      for (let i = 0; i < sections.length; i++) {
        const target = sections[i].querySelector(`#${id}`) || sections[i].querySelector(`[id="${id}"]`);
        if (target || sections[i].id === id) {
          scrollTo(i);
          return;
        }
      }
    },
    [containerRef, scrollTo]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    computeOffsets();
    window.addEventListener("resize", computeOffsets);

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;

      if (e.deltaY > 30) {
        scrollTo(currentIndex.current + 1);
      } else if (e.deltaY < -30) {
        scrollTo(currentIndex.current - 1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current) return;
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 50) return;

      if (diff > 0) {
        scrollTo(currentIndex.current + 1);
      } else {
        scrollTo(currentIndex.current - 1);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        scrollTo(currentIndex.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollTo(currentIndex.current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollTo(sectionOffsets.current.length - 1);
      }
    };

    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a[href^='#']");
      if (!anchor) return;
      const id = (anchor as HTMLAnchorElement).getAttribute("href")?.slice(1);
      if (!id) return;
      e.preventDefault();
      scrollToId(id);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onAnchorClick);

    return () => {
      window.removeEventListener("resize", computeOffsets);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onAnchorClick);
    };
  }, [containerRef, computeOffsets, scrollTo, scrollToId]);

  return { scrollTo, scrollToId, currentIndex };
}
