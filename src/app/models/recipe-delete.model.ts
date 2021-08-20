export class RecipeDeleteModel{
  idRecipe: number;
  idUser: number;


  constructor(idRecipe: number, idUser: number) {
    this.idRecipe = idRecipe;
    this.idUser = idUser;
  }
}
