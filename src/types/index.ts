export type User = {
  id: number;
  name: string;
  pantry: UserPantry[];
}

export type Unit = {
  id : number;
  name: "個" | "g";
  amountPerUnit : number;
}


export type Ingredient = {
  id: number;
  name: string;
  ingredientGroupId: number;
  unitId: number;
  pricePerUnit?: number; 
}

export type IngredientGroup = {
  id: number;
  name: string;
}

export type DishIngredient = {
  ingredientId: number;
  amount: string;  
  unitId: number;
  ingredient?: Ingredient; 
}

export type Recipe = {
  id: number;
  order: number;
  description: string;
}


export type Dish = {
  id: number;
  name: string;
  ingredients: Ingredient[];
  recipe: Recipe[];
  favorite: boolean;
  dishGroupId: number;
  servings: number;
}

export type DishGroup = {
  id: number;
  name: string;
}

export type UserPantry = {
  ingredientId: number;
  amount: number;
  unitId: number;
}

export type MissingIngredient = {
  ingredientId: number;
  requiredAmount: number;
  userAmount: number;
  shortageAmount: number;
}