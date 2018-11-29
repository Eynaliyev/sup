import { HttpClientModule } from "@angular/common/http";
import { UtilService } from "./util.service";
import { TestBed, async } from "@angular/core/testing";
import { AlertController } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { Http } from "@angular/http";

let service, originalTimeout;

describe("UtilService", () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule],
			providers: [
				AlertController,
				{ provide: Http, useClass: HttpClient },
				UtilService
			]
		});
		service = TestBed.get(UtilService);
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
	});

	afterEach(() => {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	xit("should return a date", () => {
		let date = service.createDate();
		expect(date).toBeDefined();
	});
});
