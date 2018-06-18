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
import { ChatroomService } from "../../services/services";
import { Environment } from "../../environment/environment";
import { ChatroomPage } from "./chatroom";

describe("ChatroomPage", () => {
	let de: DebugElement;
	let component: ChatroomPage;
	let fixture: ComponentFixture<ChatroomPage>;
	let service: ChatroomService;
	let spy: jasmine.Spy;
	let serviceStub: any;

	beforeEach(async(() => {
		serviceStub = {

		};

		TestBed.configureTestingModule({
			imports: [
				AngularFireModule.initializeApp(Environment.firebase),
				AngularFireDatabaseModule
			],
			providers: [ChatroomService]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChatroomPage);
		component = fixture.componentInstance;

		service = de.injector.get(ChatroomService);
		/*spy = spyOn(service, "getContent").and.returnValue(
			of("You have been warned")
		);*/

		fixture.detectChanges();
	});

	xit("should call getContent one time and update the view", () => {
		expect(spy).toHaveBeenCalled();
		expect(spy.calls.all().length).toEqual(1);

		expect(de.query(By.css(".message-body")).nativeElement.innerText).toContain(
			"warn"
		);
	});
});
