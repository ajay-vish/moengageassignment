import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnimeComponent } from './view-anime.component';

describe('ViewAnimeComponent', () => {
  let component: ViewAnimeComponent;
  let fixture: ComponentFixture<ViewAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAnimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
