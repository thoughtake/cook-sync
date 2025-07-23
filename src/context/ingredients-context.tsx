// "use client";

// import {
//   Ingredient,
//   IngredientGroup,
//   ingredientGroupColor,
//   Unit,
// } from "@/types";
// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// type IngredientsContextType = {
//   ingredients: Ingredient[];
//   setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
//   ingredientGroups: IngredientGroup[];
//   ingredientGroupColors: ingredientGroupColor[];
//   units: Unit[];
// };
// const IngredientsContext = createContext<IngredientsContextType | undefined>(
//   undefined
// );

// export const IngredientsProvider = ({ children }: { children: ReactNode }) => {
//   //材料
//   const [ingredients, setIngredients] = useState<Ingredient[]>([]);

//   //分類の候補
//   const [ingredientGroups, setIngredientGroups] = useState<IngredientGroup[]>(
//     []
//   );

//   //材料分類の色
//   const [ingredientGroupColors, setIngredientGroupColors] = useState<
//     ingredientGroupColor[]
//   >([]);

//   // 単位の候補
//   const [units, setUnits] = useState<Unit[]>([]);

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [ing, gr, gc, un] = await Promise.all([
//           fetch("api/ingredients").then((res) => res.json()),
//           fetch("/api/ingredient-groups").then((res) => res.json()),
//           fetch("/api/ingredient-group-colors").then((res) => res.json()),
//           fetch("/api/units").then((res) => res.json()),
//         ]);
//         setIngredients(ing);
//         setIngredientGroups(gr);
//         setIngredientGroupColors(gc);
//         setUnits(un);
//       } catch (err) {
//         console.error("データの取得に失敗", err);
//       }
//     };
//     fetchAll();
//   }, []);

//   return (
//     <IngredientsContext.Provider
//       value={{
//         ingredients,
//         setIngredients,
//         ingredientGroups,
//         ingredientGroupColors,
//         units,
//       }}
//     >
//       {children}
//     </IngredientsContext.Provider>
//   );
// };

// export const useIngredientContext = () => {
//   const ctx = useContext(IngredientsContext);
//   if (!ctx)
//     throw new Error(
//       "useIngredientContextがIngredientsProviderの中で使われていません"
//     );
//   return ctx;
// };
