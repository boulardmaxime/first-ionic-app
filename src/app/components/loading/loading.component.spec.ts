import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store/AppState';
import { show, hide } from 'src/app/store/loading/loading.action';
import { loadingReducer } from 'src/app/store/loading/loading.reducers';

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingComponent ],
      imports: [
		IonicModule.forRoot(),
		StoreModule.forRoot([]),
		StoreModule.forFeature('loading', loadingReducer)
	  ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
	store = TestBed.get(Store);

    component = fixture.componentInstance;
	fixture.detectChanges();
  }));

  it('should hide the loading component when it is not loading', () => {
	const compiled = fixture.nativeElement;

	store.dispatch(hide());
	fixture.detectChanges();

    expect(compiled.querySelector('.backdrop')).toBeNull();
  });

  it('should show the loading component when it is loading', () => {
	const compiled = fixture.nativeElement;

	store.dispatch(show());
	fixture.detectChanges();

    expect(compiled.querySelector('.backdrop')).not.toBeNull();
  });
});
