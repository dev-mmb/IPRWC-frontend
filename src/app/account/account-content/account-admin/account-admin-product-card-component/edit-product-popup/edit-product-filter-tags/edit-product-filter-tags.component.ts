import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../../../../../shop/ProductModel";
import {FilterTagModel} from "../../../../../../shop/search-filters/search-filter-group/filterTag.model";
import {FilterTagService} from "../../../../../../../services/filter-tag.service";
import {NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-product-filter-tags',
  templateUrl: './edit-product-filter-tags.component.html',
  styleUrls: ['./edit-product-filter-tags.component.scss']
})
export class EditProductFilterTagsComponent implements OnInit {
  @Input()
  product : ProductModel = new ProductModel();
  filterTags : FilterTagModel[] = [];


  constructor(private filterTagService : FilterTagService, config : NgbDropdownConfig) {
    config.autoClose = "outside";
  }

  ngOnInit(): void {
    this.filterTagService.getAllTags().then((tags) => {
      this.filterTags = tags;
    });
  }

  getAllSelectedTags() : string {
    let tags = "";
    let c = "";
    for (let i = 0; i < this.product.filterTags.length; i++) {
      tags += c + this.product.filterTags[i].name;
      c = ", ";
    }
    return tags;
  }

  isTagSelected(tag : FilterTagModel) : boolean {
    let found = false;
    for (let j = 0; j < this.product.filterTags.length; j++) {
      if (this.product.filterTags[j].name === tag.name) {
        found = true;
      }
    }
    return found
  }

  toggleDropdownItem(tag : FilterTagModel) {
    let found = false;
    for (let j = 0; j < this.product.filterTags.length; j++) {
      if (this.product.filterTags[j].name === tag.name) {
        this.product.filterTags.splice(j, 1);
        return;
      }
    }
    this.product.filterTags.push(tag);
  }

  onNewTagCreated(tags : FilterTagModel[]) {
    tags.forEach(tag => this.filterTags.push(tag));
  }
}
