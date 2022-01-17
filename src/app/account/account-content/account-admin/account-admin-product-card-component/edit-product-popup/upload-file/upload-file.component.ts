import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from "../../../../../../../services/http.service";
import {ProductModel} from "../../../../../../shop/ProductModel";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  @Input() product : ProductModel = new ProductModel();

  constructor(private http : HttpService) { }

  ngOnInit() : void {
  }

  onFileSelected(event : any) {
    const file : File = event.target.files[0];
    if (file) {
      let formData = new FormData();
      formData.append("file", file);
      this.http.postWithReturnType("/product_image", formData,  (rf : {fileName: string, fileDownloadUri: string, fileType: string, size: number}) => {
        this.product.image = rf.fileName;
      });
    }
  }

}