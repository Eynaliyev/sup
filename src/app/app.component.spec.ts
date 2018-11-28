import { VIPPage } from "../pages/pages";
import { MeetSomebodyPage } from "../pages/pages";
import { MyProfilePage } from "../pages/pages";
import { LoginPage } from "../pages/pages";
import { async, fakeAsync, tick, TestBed, inject } from "@angular/core/testing";
import { Http } from "@angular/http";
import { IonicModule, Platform } from "ionic-angular";
import { UserService, AuthService, UtilService } from "../services/services";
import { MenuController } from "ionic-angular";
import { LoadingController } from "ionic-angular";
import { MyApp } from "./app.component";
import { PlatformMock } from "../../test-config/mocks-ionic";
// Http testing module and mocking controller
import {
	HttpClientTestingModule,
	HttpTestingController
} from "@angular/common/http/testing";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
// Other imports
import { HttpClient } from "@angular/common/http";
import firebase from "firebase";
import { Environment } from "../environment/environment";

describe("MyApp Component", () => {
	let app, fixture, originalTimeout, component, mockBackend, service;
	let httpClient: HttpClient;
	let httpTestingController: HttpTestingController;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				MyApp,
				LoginPage,
				MeetSomebodyPage,
				MyProfilePage,
				VIPPage
			],
			imports: [
				AngularFireAuthModule,
				AngularFireModule.initializeApp(Environment.firebase),
				AngularFireDatabaseModule,
				AngularFirestoreModule,
				HttpClientTestingModule,
				IonicModule.forRoot(MyApp, Environment.config)
			],
			providers: [
				UserService,
				MenuController,
				UtilService,
				AuthService,
				{ provide: Http, useClass: HttpClient },
				LoadingController,
				{ provide: Platform, useClass: PlatformMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MyApp);
		app = fixture.debugElement.componentInstance;
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
		fixture.detectChanges();
	});

	afterEach(done => {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = this.originalTimeout;
	});

	it("should be created", () => {
		expect(app instanceof MyApp).toBe(true);
	});

	xit("should have three pages", done => {
		expect(app.pages.length).toBe(3);
		done();
	});
});
