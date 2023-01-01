import { Component, OnInit } from "@angular/core";

// Imports
import BaseComponent from "@app/shared/core/abstracts/base.component";
import NavLink from "../shared/link.interface";

/**
 * Side bar component
 */
@Component({
	selector: "app-side-bar",
	templateUrl: "./side-bar.component.html",
	styleUrls: ["./side-bar.component.scss"],
})
export default class SideBarComponent extends BaseComponent {
	/**
	 * links: links for the side bar
	 */
	links: NavLink[] = [
		{
			title: "Home",
			path: `/home`,
		},
		{
			title: "Games",
			path: `/games`,
		},
	];

	/**
	 * constructor
	 */
	constructor() {
		super();
	}
}
