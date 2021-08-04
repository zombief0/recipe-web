import {IngredientModel} from './ingredient.model';

export class RecipeDetailModel{
  id: number;
  name: string;
  description: string;
  imagePath: string;
  createdDate: Date;
  lastModifiedDate: Date;
  idUser: number;
  username: string;
  ingredients: IngredientModel[];
}
