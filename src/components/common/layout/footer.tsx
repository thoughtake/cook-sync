"use client"

import Link from "next/link";
import Container from "./container";

const Footer = () => {
  return (
    <footer className="bg-primary h-15 fixed bottom-0 left-0 w-full">
      <Container>
        <nav>
          <ul className="grid grid-cols-5">
            <li className="mr-5">
              <Link href="/">ホーム</Link>
            </li>
            <li>
              <Link href="/ingredients">材料</Link>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
};

export default Footer;
