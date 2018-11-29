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
import { ChatroomService } from "./services";
import { Environment } from "../environment/environment";

describe("ChatroomService", () => {
	let de: DebugElement;
	let fixture, component;
	let service: ChatroomService;
	let spy: jasmine.Spy;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularFireModule.initializeApp(Environment.firebase),
				AngularFireDatabaseModule
			],
			providers: [ChatroomService]
		}).compileComponents();
	}));

	beforeEach(() => {
	});
	
	xit("should call getAvailableChatrooms one time and update the view", () => {
	});
});
