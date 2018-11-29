import { Injectable, Injector } from "@angular/core";
import { async, fakeAsync, tick, TestBed, inject } from "@angular/core/testing";
import {
	BaseRequestOptions,
	ConnectionBackend,
	Http,
	RequestOptions
} from "@angular/http";
import { IonicModule, Platform } from "ionic-angular";
import { UserService, AuthService, UtilService } from "../services/services";
import { MenuController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { LoadingController } from "ionic-angular";
import { MyApp } from "./app.component";
import { exec } from "child_process";
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
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import firebase from "firebase";
import { Environment } from "../environment/environment";

describe("MyApp Component", () => {
	let app, fixture, originalTimeout, component, mockBackend, service;
	let httpClient: HttpClient;
	let httpTestingController: HttpTestingController;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MyApp],
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
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
	});

	afterEach(() => {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});

	it("should be created", () => {
		expect(app instanceof MyApp).toBe(true);
	});

	it("should have three pages", () => {
		expect(app.pages.length).toBe(3);
	});
});