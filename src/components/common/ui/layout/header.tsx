"use client";

import Link from "next/link";
import Container from "./container";
import { Plus } from "lucide-react";
import IconButton from "../button/icon-button";
import { useModal } from "@/components/context/modal-context";
import IngredientsForm from "../ingredients/ingredients-form";

const Header = () => {
  const {showModal} = useModal();

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
            bgColor="bg-inherit"
            className="border-2 rounded p-0.5"
            iconClassName="w-8 h-8"
            onClick={() => {
              // showModal(
              //   <IngredientsForm 
              //       targetId = null
              //       ingredients: Ingredient[];
              //       setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
              //       // setClickedListId: React.Dispatch<React.SetStateAction<number | null>>;
              //       ingredientGroups: IngredientGroup[];
              //       units: Unit[];
                
              //   />
              // )
            }}
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
