import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RagForm } from './rag-form';

describe('RagForm', () => {
  let component: RagForm;
  let fixture: ComponentFixture<RagForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RagForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RagForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
