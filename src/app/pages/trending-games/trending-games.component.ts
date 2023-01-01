import { Component, OnInit } from "@angular/core";
import { Game } from "@app/shared";
import AbstractGameListComponent from "@app/shared/core/abstracts/game-list.component";
import { GameState } from "@app/state/games.state";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";

@Component({
	selector: "app-trending-games",
	templateUrl: "./trending-games.component.html",
	styleUrls: ["./trending-games.component.scss"],
})
export default class TrendingGamesComponent extends AbstractGameListComponent implements OnInit {
	/**
	 * This property is an Observable that holds the list of trending games
	 */
	@Select(GameState.selectTrendingGames) trendingList$!: Observable<any>;

	/**
	 * The constructor is inherited from the AbstractGameListComponent class
	 */
	constructor() {
		super();
	}

	/**
	 * ngOnInit
	 */
	ngOnInit(): void {
		// This adds a safe subscription to the trendingList$ Observable
		// When the Observable emits a new value, the component's 'games' property is updated
		this.addSafeSubscription(
			this.trendingList$.subscribe((data: Game[]) => (this.games = data))
		);
	}
}
