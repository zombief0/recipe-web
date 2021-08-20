export class UserSaveModel{
  email: string;
  nom: string;
  password: string;


  constructor(email: string, nom: string, password: string) {
    this.email = email;
    this.nom = nom;
    this.password = password;
  }
}
