import Link from "next/link";
import Image from "next/image";

interface TwitterIconLinkProps {
  url: string;
  color?: "white" | "black";
  size?: number;
}

const TwitterIconLink = ({ url, size, color }: TwitterIconLinkProps) => {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
      className="hover:opacity-80 active:opacity-60 aria-pressed:opacity-60 duration-300 ease-in-out"
    >
      <Image
        src={color === "white" ? "/x-icon.svg" : "/x-icon-black.svg"}
        alt="twitter"
        width={size}
        height={size}
      />
    </Link>
  );
};

export default TwitterIconLink;
