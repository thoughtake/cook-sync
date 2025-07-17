import Link from "next/link";
import Container from "./container";

const Header = () => {
  return (
    <header className="bg-primary h-15">
      <Container>
        <div className="flex justify-between items-center h-15">
          <Link href="/">
            <h1
              style={{ fontFamily: "var(--font-heading)", fontWeight: "700" }}
              className="text-4xl"
            >
              クックシンク
            </h1>
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;
