import {RecipeDisplayModel} from './recipe-display.model';

export class RecipeListModel {
  currentPage: number;
  size: number;
  totalPages: number;
  totalElements: number;
  recipes: RecipeDisplayModel[];

}
