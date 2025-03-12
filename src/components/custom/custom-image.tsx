import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";

interface CustomImageProps
  extends Omit<ImageProps, "alt" | "width" | "height"> {
  alt?: string;
  className?: string;
  containerClassName?: string;
  objectFit?: "cover" | "contain";
  width?: number;
  height?: number;
}

export const CustomImage = ({
  src,
  alt = "",
  className,
  containerClassName,
  objectFit = "cover",
  ...props
}: CustomImageProps) => {
  return (
    <div
      className={cn(
        "relative rounded-md w-full h-full overflow-clip",
        containerClassName,
      )}
    >
      <Image
        src={src}
        alt={alt || "Image"}
        fill
        className={cn(
          "rounded-md shadow-md",
          objectFit === "cover" ? "object-cover" : "object-contain",
          className,
        )}
        {...props}
      />
    </div>
  );
};
