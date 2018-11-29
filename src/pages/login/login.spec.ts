import {
	async,
	fakeAsync,
	tick,
	TestBed,
	inject,
	ComponentFixture
} from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { of } from "rxjs/observable/of";
import { AuthService, UserService, UtilService } from "../../services/services";
import { Environment } from "../../environment/environment";
import { LoginPage } from "./login";
import { NavController } from "ionic-angular/navigation/nav-controller";
import { LoadingController } from "ionic-angular/components/loading/loading-controller";

class NavCtrlMock {}

class LoadingCtrlMock {}

describe("LoginPage", () => {
	let de: DebugElement;
	let component: LoginPage;
	let fixture: ComponentFixture<LoginPage>;
	let authService: AuthService;
	let userService: UserService;
	let spy: jasmine.Spy;
	let serviceStub: any;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LoginPage],
			providers: [				
				{provide: NavController, useClass: NavCtrlMock},
				{provide: LoadingController, useClass: LoadingCtrlMock},
				AuthService, 
				UserService, 
				UtilService]
		}).compileComponents();
	}));		


	beforeEach(() => {
		fixture = TestBed.createComponent(LoginPage);
		component = fixture.debugElement.componentInstance;
		/*spy = spyOn(component, "ionViewDidLoad").and.returnValue(
			of("ionViewDidLoad LoginPage")
		);*/
	});
	xit("should be created", () => {
		expect(component instanceof LoginPage).toBe(true);
	});

	xit("should call ionViewDidLoad one time and update the view", () => {
		expect(spy).toHaveBeenCalled();
		expect(spy.calls.all().length).toEqual(1);
	});
});
