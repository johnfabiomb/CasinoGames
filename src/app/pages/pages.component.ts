import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { FetchGames } from "../state/games.action";

@Component({
	selector: "app-pages",
	templateUrl: "./pages.component.html",
	styleUrls: ["./pages.component.scss"],
})
export default class PagesComponent implements OnInit {
	/**
	 * constructor
	 * @param store
	 */
	constructor(private store: Store) {}

	/**
	 * ngOnInit
	 */
	ngOnInit(): void {
		// Dispatch the 'FetchGames' action
		this.store.dispatch(new FetchGames());
	}
}
