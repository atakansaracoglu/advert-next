import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type LogoCloudProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
};

export function LogoCloud({ className, children, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden",
        className
      )}
      style={{
        padding: "1.5rem 0",
        maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.4) 20%, black 35%, black 65%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.15) 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.4) 20%, black 35%, black 65%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.15) 90%, transparent 100%)",
      }}
    >
      <InfiniteSlider gap={72} reverse duration={30} durationOnHover={60}>
        {children}
      </InfiniteSlider>
    </div>
  );
}
