"use client";

import Link from "next/link";
import Container from "./container";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const NavLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center justify-center h-full text-lg  font-bold cursor-pointer rounded",
        "hover: bg-[#FF8C00]",
        pathname === href
        ? "bg-[#FF8C00] text-white"
        : "bg-inherit text-text"
      )}
    >
      {label}
    </Link>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary h-15 fixed bottom-0 left-0 w-full">
      <Container className="h-full">
        <nav className="h-full py-1.5">
          <ul className="flex h-full">
            <li className="flex-1 h-full">
              <NavLink href="/" label="ホーム" />
            </li>
            <li className="flex-1">
              <NavLink href="/dishes" label="料理" />
            </li>
            <li className="flex-1">
              <NavLink href="/ingredients" label="材料" />
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
};

export default Footer;
