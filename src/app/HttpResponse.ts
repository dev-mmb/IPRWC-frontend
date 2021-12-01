
export class HttpResponse<type> {
  response : string = "";
  errorMessage : string = "";
  data : type;

  constructor(data : type) {
    this.data = data;
  }
}
