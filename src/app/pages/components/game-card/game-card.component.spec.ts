import { ComponentFixture, TestBed } from "@angular/core/testing";

import Component from "./game-card.component";

describe("GameCardComponent", () => {
	let component: Component;
	let fixture: ComponentFixture<Component>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [Component],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(Component);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
