export type Unit = {
  id: number;
  name: string;
  amountPerUnit: number;
};

export type Ingredient = {
  id: number;
  name: string;
  ingredientGroupId: number;
  unitId: number;
  pricePerUnit: number;
};

export type IngredientGroup = {
  id: number;
  name: string;
};

export type IngredientGroupColor = {
  id: number;
  ingredientGroupId: number;
  bgColorCode: string;
  textColorCode: string;
};

export type Dish = {
  id: number;
  name: string;
  timeMinutes: number;
  servings: number;
  isFavorite: boolean;
  imageUrl?: string;
};

export type DishIngredient = {
   id: number
   dishId: number,
   ingredientId: number,
   quantity: "string", 
}

export type DishRecipe = {
    id: number,
    dishId: number,
    stepNumber: number,
    description: string,
}