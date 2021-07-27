import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) {
  }

  getAllRecipes(size: number = 5, page: number = 0): Observable<any> {
    const ALL_RECIPES = environment.baseApiUrl + 'recipe';
    return this.http.get(ALL_RECIPES, {
      params: {
        size: size.toString(),
        page: page.toString()
      }
    });
  }
}
