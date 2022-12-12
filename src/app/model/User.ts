export class User {
  _id?: string;
    name!: String;
    email!: String;
    password!: String;
    userToken?: String;
    passwordResetToken?: String;
    passwordResetExpires?: String;
    created_At?: Date;
    member?: Boolean;
    selected?: Boolean;
  
  }
  