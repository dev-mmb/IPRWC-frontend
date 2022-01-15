
export class DecodedJwtModel {
  sub: string;
  exp: number;
  iat: number;
  roles: {authority: string}[];
  constructor() {
    this.sub = "";
    this.exp = 0;
    this.iat = 0;
    this.roles = [];
  }
}


