import {Component, Input, OnInit} from '@angular/core';
import {RecipeDisplayModel} from '../../../models/recipe-display.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input()
  recipe: RecipeDisplayModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
