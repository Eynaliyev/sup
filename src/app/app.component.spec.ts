import { async, TestBed } from "@angular/core/testing";
import { IonicModule, Platform } from "ionic-angular";
import { UserService, AuthService } from "../services/services";
import { MenuController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { LoadingController } from "ionic-angular";
import { MyApp } from "./app.component";
import { exec } from "child_process";
import { PlatformMock } from "../../test-config/mocks-ionic";

describe("MyApp Component", () => {
	let fixture;
	let component;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MyApp],
			imports: [IonicModule.forRoot(MyApp)],
			providers: [
				UserService,
				MenuController,
				AuthService,
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
	/*
	it('should have three pages', () => {
		expect(component.pages.length).toBe(3);
	});*/
});
