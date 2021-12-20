
export class ProductModel  {
  description: string;
  filterTags: string[];
  id: string;
  image: string;
  name: string;
  price: number;
  specs: string;

  constructor() {
    this.description = "";
    this.filterTags = [];
    this.id = "";
    this.image = "";
    this.name = "";
    this.price = 0;
    this.specs = "";
  }


}
