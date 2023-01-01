import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Injector } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import InjectorService from "@app/shared/services/injector/injector.service";

import Component from "./side-bar.component";

describe("SideBarComponent", () => {
	let component: Component;
	let fixture: ComponentFixture<Component>;
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [Component],
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				HttpClientTestingModule,
			],
		}).compileComponents();
	});

	beforeEach(() => {
		InjectorService.set(TestBed.inject(Injector));
		fixture = TestBed.createComponent(Component);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
