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
  colorCode: string;
};

export type Dishes = {
    id: number;
    name: string;
    timeMinutes: number;
    servings: number;
    isFavorite: boolean;
    imageUrl: string;
}
