"use client";

import Link from "next/link";
import Container from "./container";
import { Plus } from "lucide-react";
import IconButton from "../ui/button/icon-button";
import { useModal } from "@/context/modal-context";
import IngredientsForm from "../../ingredients/ingredients-form";

const Header = () => {

  const { showModal } = useModal();

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
          <IconButton
            icon={Plus}
            variant="outline"
            color="black"
            size="lg"
            onClick={() => {
              showModal(
                <IngredientsForm
                  targetId={null}
                />
              );
            }}
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
