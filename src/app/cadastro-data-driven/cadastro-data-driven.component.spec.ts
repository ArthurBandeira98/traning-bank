import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDataDrivenComponent } from './cadastro-data-driven.component';

describe('CadastroDataDrivenComponent', () => {
  let component: CadastroDataDrivenComponent;
  let fixture: ComponentFixture<CadastroDataDrivenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroDataDrivenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDataDrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
