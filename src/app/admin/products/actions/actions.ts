import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../../shared/interface/product.interface';

@Component({
  selector:'app-action-renderer',
  standalone:true,
  template:`

  <button
  (click)="editProduct()"
  class="edit-btn">
    Edit
  </button>


  <button
  (click)="deleteProduct()"
  class="delete-btn">
    Delete
  </button>

  `
})
export class ActionRenderer {


  @Input() product!: IProduct;


  @Output() edit = new EventEmitter<IProduct>();

  @Output() delete = new EventEmitter<IProduct>();



  editProduct(){

    this.edit.emit(this.product);

  }



  deleteProduct(){

    this.delete.emit(this.product);

  }


}