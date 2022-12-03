export class User {
    name!: String;
    email!: String;
    password!: String;
    userToken?: String;
    passwordResetToken?: String;
    passwordResetExpires?: String;
    created_At?: Date;
  }
  