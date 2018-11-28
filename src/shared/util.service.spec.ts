import { UtilService } from "./util.service";
import { TestBed } from "@angular/core/testing";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFirestore } from "angularfire2/firestore";
import {
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";

let httpClientSpy: { get: jasmine.Spy };
let service;

describe("UtilService", () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AngularFirestore, AngularFireDatabase]
		});
		service = TestBed.get(UtilService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should return a date", () => {
		let date = service.createDate();
		expect(date).toBeDefined();
	});
});
