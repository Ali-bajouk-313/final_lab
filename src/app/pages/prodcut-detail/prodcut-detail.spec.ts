import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdcutDetail } from './prodcut-detail';

describe('ProdcutDetail', () => {
  let component: ProdcutDetail;
  let fixture: ComponentFixture<ProdcutDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdcutDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdcutDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
