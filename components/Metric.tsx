import Link from "next/link";
import React from "react";
import Image from "next/image";
interface Props {
  imgUrl: string;
  alt: string;
  value: number;
  title: string;
  href: string;
  textStyles: string;
  imgStyles: string;
  isAuthor?: boolean;
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
}: Props) => {
  const metriContent = (
    <>
      <Image src={imgUrl} width={16} height={16} alt="f" />
    </>
  );

  return href ? (
    <Link href={href}>{metriContent}</Link>
  ) : (
    <div>{metriContent}</div>
  );
};

export default Metric;
