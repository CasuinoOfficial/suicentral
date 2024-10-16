import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface IconLinkProps {
  url: string;
  Icon: IconType;
  color?: string;
  size?: string | number;
  iconClass?: string;
}

const SocialMediaIcon: React.FC<IconLinkProps> = ({
  url,
  Icon,
  color = "#000",
  size = "",
  iconClass = "",
}) => {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color, textDecoration: "none" }}
      className="hover:opacity-80 active:opacity-60 aria-pressed:opacity-60 duration-300 ease-in-out"
    >
      <Icon className={iconClass} style={{ fontSize: size }} />
    </Link>
  );
};

export default SocialMediaIcon;
