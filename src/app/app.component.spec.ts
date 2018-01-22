import {async, TestBed} from '@angular/core/testing';
import {IonicModule} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {UserService} from '../services/services';
import {MenuController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {LoadingController} from 'ionic-angular';
import {MyApp} from './app.component';
import { exec } from 'child_process';

describe('MyApp Component', () => {
	let fixture;
	let component;

	beforeEach(async( () => {
		TestBed.configureTestingModule({
			declarations: [MyApp],
			imports: [
				IonicModule.forRoot(MyApp)
			],
			providers: [
				StatusBar,
				SplashScreen,
				UserService,
				MenuController,
				LoadingController,
				Storage
			]
		})
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MyApp);
		component = fixture.componentInstance;
	});

	it('should be created', () => {
		expect(component instanceof MyApp).toBe(true);
	});

	it('should have three pages', () => {
		expect(component.pages.length).toBe(3);
	});
});
