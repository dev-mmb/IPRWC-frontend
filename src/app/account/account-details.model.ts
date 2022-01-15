
export class AccountDetailsModel {
  email : string;
  roles : {authority: string}[]
  constructor() {
    this.email = "";
    this.roles = [];
  }
}
