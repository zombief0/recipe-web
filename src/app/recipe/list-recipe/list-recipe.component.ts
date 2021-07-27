import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../service/recipe.service';

@Component({
  selector: 'app-list-recipe',
  templateUrl: './list-recipe.component.html',
  styleUrls: ['./list-recipe.component.css']
})
export class ListRecipeComponent implements OnInit {

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipeService.getAllRecipes()
      .subscribe(x => {
        console.log(x);
      });
  }

}
