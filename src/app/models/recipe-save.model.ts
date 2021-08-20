import {IngredientModel} from './ingredient.model';

export class RecipeSaveModel{
  id: number;
  name: string;
  imagePath: string;
  description: string;
  ingredients: IngredientModel[];
  idUser: number;
}
