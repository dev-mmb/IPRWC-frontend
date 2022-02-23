import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FilterTagModel} from "../../../../../../../shop/search-filters/search-filter-group/filterTag.model";
import {FilterGroupModel} from "../../../../../../../shop/search-filters/search-filter-group/filterGroup.model";
import {FilterTagService} from "../../../../../../../../services/filter-tag.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GenericPopupComponent} from "../../../../../../../generic-popup/generic-popup.component";

@Component({
  selector: 'app-product-group-select',
  templateUrl: './product-group-select.component.html',
  styleUrls: ['./product-group-select.component.scss']
})
export class ProductGroupSelectComponent implements OnInit {
  tag : FilterTagModel = new FilterTagModel();
  groups : FilterGroupModel[] = [];
  @Output() onCreateNewTag : EventEmitter<FilterTagModel[]> = new EventEmitter<FilterTagModel[]>();

  constructor(private tagService : FilterTagService, private modalService : NgbModal) { }

  ngOnInit(): void {
    this.tag.filterGroup.name = "Geen";
    this.tagService.getAllGroups().then((g) => {
      this.groups = g;
    });
  }

  onSetName(event : any) {
    this.tag.name = event.target.value;
  }

  setFilterGroup(group : FilterGroupModel) {
    this.tag.filterGroup.name = group.name;
  }

  shouldEnableCreateButton() : boolean {
    return (this.tag.filterGroup.name !== "Geen" && this.tag.name !== "");
  }

  createFilterTag() {
    this.tagService.createTag([this.tag]).then((tags) => {
      this.onCreateNewTag.emit(tags);
      let ref = this.modalService.open(GenericPopupComponent).componentInstance;
      ref.title = "Filter succesvol opgeslagen!";
      ref.confirmText = "Sluit popup";
    }, () => {
      let ref = this.modalService.open(GenericPopupComponent).componentInstance;
      ref.title = "Er is iets mis gegaan!";
      ref.confirmText = "Sluit popup";
    });
  }

  onCreateGroup(event : any) {
    this.tag.filterGroup.name = event.target.value;
  }

}
