import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverItemComponent } from './discover-item.component';

describe('DiscoverItemComponent', () => {
  let component: DiscoverItemComponent;
  let fixture: ComponentFixture<DiscoverItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoverItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
