import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRenderer } from '../actions/actions';

describe('ActionRenderer', () => {
  let component: ActionRenderer;
  let fixture: ComponentFixture<ActionRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionRenderer],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionRenderer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
