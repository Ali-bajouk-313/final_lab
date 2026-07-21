import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Products } from './products';

import { IProduct } from '../../shared/interface/product.interface';

describe('Products', () => {
  let component: Products;
  let fixture: ComponentFixture<Products>;
  const mockproduct: IProduct = {
    id: 1,
    title: 'Shirt',
    price: 100,
    description: 'Nice shirt',
    category: 'Men',
    image: '',
    rating: {
      rate: 4.5,
      count: 120,
    },
};
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Products],
    }).compileComponents();

    fixture = TestBed.createComponent(Products);
    component = fixture.componentInstance;
    await fixture.whenStable();

  });
  it('delete products',()=>{
    expect(component.deleteProduct(mockproduct))
  })
  it('edit products',()=>{
    expect(component.editProduct(mockproduct))
  })
  it ('addproduct',()=>{
    expect(component.addProduct()).toBeNull;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
});
