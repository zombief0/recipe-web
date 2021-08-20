import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../service/recipe.service';
import {RecipeListModel} from '../../models/recipe-list.model';
import {RecipeDisplayModel} from '../../models/recipe-display.model';

@Component({
  selector: 'app-list-recipe',
  templateUrl: './list-recipe.component.html',
  styleUrls: ['./list-recipe.component.css']
})
export class ListRecipeComponent implements OnInit {
  recipes: RecipeListModel;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipeService.getAllRecipes()
      .subscribe(x => {
        this.recipes = x;
      });
  }

  removeItem(recipe: RecipeDisplayModel): void {
    this.recipes.recipes = this.recipes.recipes.filter(r => r.id !== recipe.id);
  }
}
