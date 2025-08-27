"use client";

import useIngredientGroupColors from "@/hooks/use-ingredient-group-colors";
import useIngredientGroups from "@/hooks/use-ingredient-groups";
import useIngredients from "@/hooks/use-ingredients";
import usePantries from "@/hooks/use-pantries";
import useUnits from "@/hooks/use-units";
import { Ingredient, IngredientGroup } from "@/types";
import clsx from "clsx";
import { useMemo } from "react";

const PantriesPage = () => {
  const { pantries } = usePantries();
  const { ingredients } = useIngredients();
  const { ingredientGroups } = useIngredientGroups();
  const { ingredientGroupColors } = useIngredientGroupColors();
  const { units } = useUnits();

  type PantryIngredient = Ingredient & {
    quantity: string;
    unitName: string;
  };

  const { pantryIngredients, pantryGroups } = useMemo<{
    pantryIngredients: PantryIngredient[];
    pantryGroups: IngredientGroup[];
  }>(() => {
    const ingredientIds = new Set(pantries.map((p) => p.ingredientId));
    const filteredIngredients = ingredients.filter((i) =>
      ingredientIds.has(i.id)
    );

    const unitNameById = new Map(units.map((unit) => [unit.id, unit.name]));
    const quantityByIngredientId = new Map(
      pantries.map((pantry) => [pantry.ingredientId, pantry.quantity])
    );

    const pantryIngredients: PantryIngredient[] = filteredIngredients.flatMap(
      (fi) => {
        const unitName = unitNameById.get(fi.unitId);
        const quantity = quantityByIngredientId.get(fi.id);

        if (unitName == null || quantity == null) return [];
        return [{ ...fi, unitName, quantity }];
      }
    );

    const groupIds = new Set(
      pantryIngredients.map((pi) => pi.ingredientGroupId)
    );
    const pantryGroups = ingredientGroups.filter((g) => groupIds.has(g.id));

    return { pantryIngredients, pantryGroups };
  }, [pantries, ingredients, ingredientGroups, units]);

  return (
    <>
      <ul className="py-5">
        {pantryGroups.map((pantryGroup) => {
          const groupColor = ingredientGroupColors.find(
            (c) => c.ingredientGroupId === pantryGroup.id
          );
          const groupIngredients = pantryIngredients.filter(
            (p) => p.ingredientGroupId === pantryGroup.id
          );

          return (
            <li
              key={pantryGroup.id}
              className={clsx("p-3 mb-5", "rounded", "shadow-md")}
              style={{
                backgroundColor: `${
                  groupColor?.bgColorCode ? groupColor?.bgColorCode : "inherit"
                }`,
              }}
            >
              <div
                className={clsx("mb-3", "text-lg font-bold")}
                style={{
                  color: `${
                    groupColor?.textColorCode
                      ? groupColor?.textColorCode
                      : "inherit"
                  }`,
                }}
              >
                {pantryGroup.name}
              </div>
              <ul>
                {groupIngredients.map((groupIngredient) => {
                  return (
                    <li
                      key={groupIngredient.id}
                      className={clsx(
                        "relative",
                        "inline-block py-2 px-3 mr-3",
                        "bg-white rounded"
                      )}
                      style={{
                        borderWidth: "1px",
                        borderColor: `${
                          groupColor?.textColorCode
                            ? groupColor?.textColorCode
                            : "inherit"
                        }`,
                      }}
                    >
                      <button className={clsx(
                        "absolute top-0 left-0 z-2",
                        "w-full h-full",
                        "rounded cursor-pointer"
                      )}>
                      </button>
                      <span className="mr-3">{groupIngredient.name}</span>
                      <span className="font-bold mr-1">{parseFloat(groupIngredient.quantity)}</span>
                      <span>{groupIngredient.unitName}</span>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PantriesPage;
