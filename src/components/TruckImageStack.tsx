/* eslint-disable @next/next/no-img-element */

type TruckImageStackProps = {
  image: string;
  shadowImage?: string;
  alt: string;
  className?: string;
  frontClassName?: string;
  shadowClassName?: string;
};

export function TruckImageStack({
  image,
  shadowImage,
  alt,
  className,
  frontClassName,
  shadowClassName,
}: TruckImageStackProps) {
  const stackClassName = ["truck-image-stack", className].filter(Boolean).join(" ");
  const composedFrontClassName = ["truck-image-layer", "truck-image-layer-front", frontClassName].filter(Boolean).join(" ");

  if (!shadowImage) {
    return <img src={image} alt={alt} className={composedFrontClassName} />;
  }

  const backClassName = ["truck-image-layer", "truck-image-layer-shadow", shadowClassName].filter(Boolean).join(" ");

  return (
    <div className={stackClassName}>
      <img src={shadowImage} alt="" aria-hidden="true" className={backClassName} />
      <img src={image} alt={alt} className={composedFrontClassName} />
    </div>
  );
}
