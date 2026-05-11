import Image from "next/image";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
interface Props {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  href?: string;
  textStyles: string;
  imgStyles?: string;
  isAuthor?: boolean;
  titleStyle?: string;
}
const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  imgStyles,
  isAuthor,
  titleStyle,
}: Props) => {
  const metriContent = (
    <>
      <Image
        src={imgUrl}
        width={16}
        height={16}
        alt={alt}
        className={`rounded-full object-contain ${imgStyles}`}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        {title ? (
          <span className={cn(`small-regular line-clamp-1 `, titleStyle)}>
            {title}
          </span>
        ) : null}
      </p>
    </>
  );

  return href ? (
    <Link href={href} className="flex-center gap-1">
      {metriContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metriContent}</div>
  );
};

export default Metric;
