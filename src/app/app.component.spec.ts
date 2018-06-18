/*import { Injectable, Injector } from "@angular/core";
import { async, fakeAsync, tick, TestBed, inject } from "@angular/core/testing";
import {
	BaseRequestOptions,
	ConnectionBackend,
	Http,
	RequestOptions
} from "@angular/http";
import { Response, ResponseOptions } from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";
import { IonicModule, Platform } from "ionic-angular";
import { UserService, AuthService } from "../services/services";
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

describe("MyApp Component", () => {
	let fixture, component, mockBackend, service;
	let httpClient: HttpClient;
	let httpTestingController: HttpTestingController;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MyApp],
			imports: [
				AngularFireAuthModule,
				AngularFireModule,
				AngularFireDatabaseModule,
				AngularFirestoreModule,
				HttpClientTestingModule,
				IonicModule.forRoot(MyApp)
			],
			providers: [
				UserService,
				MenuController,
				AuthService,
				{ provide: Http, useClass: HttpClient },
				LoadingController,
				{ provide: Platform, useClass: PlatformMock }
			]
		});
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MyApp);
		component = fixture.componentInstance;
	});

	it("should be created", () => {
		expect(component instanceof MyApp).toBe(true);
	});

	it("should have three pages", () => {
		expect(component.pages.length).toBe(3);
	});
});
*/
