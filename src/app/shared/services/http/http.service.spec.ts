import { TestBed } from "@angular/core/testing";

import {
	HttpClientTestingModule,
	HttpTestingController,
} from "@angular/common/http/testing";
import HttpService from "./http.service";

describe("FormsService", () => {
	let service: HttpService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		});
		service = TestBed.inject(HttpService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("post() should be send a POST", () => {
		const response = {};
		service.post({}, "test").subscribe((res: any) => {
			expect(res).toEqual(response);
		});

		const request = httpMock.expectOne(`${service.url}test`);
		expect(request.request.method).toBe("POST");
		request.flush({});
	});

	it("get() should be send a GET", () => {
		const response = {};
		service.get("test").subscribe((res: any) => {
			expect(res).toEqual(response);
		});

		const request = httpMock.expectOne(`${service.url}test`);
		expect(request.request.method).toBe("GET");
		request.flush({});
	});
});
