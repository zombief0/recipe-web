import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {RecipeListModel} from '../models/recipe-list.model';
import {RecipeDetailModel} from '../models/recipe-detail.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) {
  }

  getAllRecipes(size: number = 5, page: number = 0): Observable<RecipeListModel> {
    const ALL_RECIPES_URL = environment.baseApiUrl + 'recipe';
    return this.http.get<RecipeListModel>(ALL_RECIPES_URL, {
      params: {
        size: size.toString(),
        page: page.toString()
      }
    });
  }

  getRecipeById(id: number): Observable<RecipeDetailModel> {
    const RECIPE_BY_ID_URL = environment.baseApiUrl + 'recipe/' + id;
    return this.http.get<RecipeDetailModel>(RECIPE_BY_ID_URL);
  }
}
