import { async, TestBed, ComponentFixture } from "@angular/core/testing";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import {
	ChatroomService,
	UserService,
	UtilService
} from "../../services/services";
import { Environment } from "../../environment/environment";
import { ChatroomPage } from "./chatroom";

describe("ChatroomPage", () => {
	let de: DebugElement;
	let component: ChatroomPage;
	let fixture: ComponentFixture<ChatroomPage>;
	let spy: jasmine.Spy;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularFireModule.initializeApp(Environment.firebase),
				AngularFireDatabaseModule
			],
			providers: [ChatroomService, UserService, UtilService]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChatroomPage);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it("should be created", () => {
		expect(component).toBeTruthy();
	});

	xit("should call ngAfterViewInit one time and update the view", () => {
		expect(spy).toHaveBeenCalled();
		expect(spy.calls.all().length).toEqual(1);

		expect(de.query(By.css(".message-body")).nativeElement.innerText).toContain(
			"warn"
		);
	});
});
