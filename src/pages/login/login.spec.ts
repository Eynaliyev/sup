import {
	async,
	fakeAsync,
	tick,
	TestBed,
	inject,
	ComponentFixture
} from "@angular/core/testing";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { of } from "rxjs/observable/of";
import { AuthService } from "../../services/services";
import { UserService } from "../../services/services";
import { Environment } from "../../environment/environment";
import { LoginPage } from "./login";

describe("LoginPage", () => {
	let de: DebugElement;
	let component: LoginPage;
	let fixture: ComponentFixture<LoginPage>;
	let authService: AuthService;
	let userService: UserService;
	let spy: jasmine.Spy;
	let serviceStub: any;

	beforeEach(async(() => {
		serviceStub = {};

		TestBed.configureTestingModule({
			imports: [
				AngularFireModule.initializeApp(Environment.firebase),
				AngularFireDatabaseModule
			],
			providers: [AuthService, UserService]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginPage);
		component = fixture.componentInstance;

		authService = de.injector.get(AuthService);
		userService = de.injector.get(UserService);
		/*
		spy = spyOn(chatroomService, "facebookLogin").and.returnValue(
			of("You have been warned")
		);
		spy = spyOn(userService, "getContent").and.returnValue(
			of("You have been warned")
		);*/

		fixture.detectChanges();
	});

	xit("should call facebookLogin one time and update the view", () => {
		expect(spy).toHaveBeenCalled();
		expect(spy.calls.all().length).toEqual(1);

		expect(de.query(By.css(".message-body")).nativeElement.innerText).toContain(
			"warn"
		);
	});
});
