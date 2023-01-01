import { Component, OnInit } from "@angular/core";
import { Game } from "@app/shared";
import AbstractGameListComponent from "@app/shared/core/abstracts/game-list.component";
import { GameState } from "@app/state/games.state";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";

@Component({
	selector: "app-last-played-games",
	templateUrl: "./last-played-games.component.html",
	styleUrls: ["./last-played-games.component.scss"],
})
export default class LastPlayedGamesComponent
	extends AbstractGameListComponent
	implements OnInit {
	/**
	 *  This property is an Observable that holds the list of last played games
	 */
	@Select(GameState.selectLastPlayedGames) lastPlayedList$!: Observable<any>;

	/**
	 * constructor
	 */
	constructor() {
		super();
	}

	/**
	 * ngOnInit
	 */
	ngOnInit(): void {
		// This adds a safe subscription to the lastPlayedList$ Observable
		// When the Observable emits a new value, the component's 'games' property is updated
		this.addSafeSubscription(
			this.lastPlayedList$.subscribe((data: Game[]) => (this.games = data))
		);
	}
}
