
export class ProductModel  {
  description: string;
  filterTags: [{name : string, filterGroup : {name : string}}];
  id: string;
  image: string;
  name: string;
  price: number;
  specs: string;

  constructor() {
    this.description = "";
    this.filterTags = [{name: "", filterGroup: {name: ""}}];
    this.id = "";
    this.image = "";
    this.name = "";
    this.price = 0;
    this.specs = "";
  }


}
