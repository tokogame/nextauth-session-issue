import Image from "next/legacy/image";
import React from "react";

function OptimizedImage({
  src,
  alt,
  height,
  width,
  priority,
  unoptimized,
  onClick,
  layout,
  objectFit,
  className,
}) {
  return (
    <Image
      src={src}
      alt={alt}
      height={height}
      width={width}
      priority={priority}
      unoptimized={unoptimized}
      onClick={onClick}
      layout={layout}
      objectFit={objectFit}
      className={className}
      blurDataURL={
        "data:image/webp;base64,UklGRrIDAABXRUJQVlA4WAoAAAAgAAAAuQAAuQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggxAEAAHAQAJ0BKroAugA+0WisUyglo6KgSFkAGglnbt5RWOZEdan++BfrPu3fkArPCtuaIlbcQW3pqVZH8/r4Qzk4Q8RSFXTE/iNHtuOrptWb/+eH3XqnplN9GRAGdFvZXUxvGxEfWw5I9/prsltiwj+anxc9BXa7lSLktduvVOOuNu9qsCLJPhNX5/5ZUIMAAP7pr/mwknv+evlf7dFsMkrC4EfuaizJPYYXXVzPUTpye315LWMSe3xaQFLZIz/PLq/AkurIu9NXNi4PBG/Ct11PRBbDUawDh2bO4EDvEol+Mnc6JqDS9JFGDaiQN8yQkRgxXG5JUtbi9ejaX3/dNaB9O1PB3wMtaslbwzyXUf45fikwGnoxqxpJ7SuEjwZgHeQc6sEcYzRNG1gh99mwiSr7cIbxxF5ZxW8uXZ/B95vC+ltdTo2D0MEnlY4KQ188hkdZxjE6zKSCxT8LM2dWSYuwhaEAK4vExWAcQ+S3F/hd3LbSzkIdDS8Kab4hQO2YDpQFYeEM51yRgIHN+3Slp3m0CzqXI7O8mjb1ZPSKvvktyABLukkAQDo4EZwDQM5MGsnPD6LlYZW5MttMzEJyue2ClOfeQAAA"
      }
      placeholder={height < 40 || width < 40 ? "empty" : "blur"}
    />
  );
}

export default OptimizedImage;
