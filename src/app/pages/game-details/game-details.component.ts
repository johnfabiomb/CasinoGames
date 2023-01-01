import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Game } from "@app/shared";
import BaseComponent from "@app/shared/core/abstracts/base.component";
import { Select, Store } from "@ngxs/store";
import { combineLatest, Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { AddLastPlayedGames, UpdateSlug } from "../../state/games.action";
import { GameState } from "../../state/games.state";

@Component({
	selector: "app-game-details",
	templateUrl: "./game-details.component.html",
	styleUrls: ["./game-details.component.scss"],
})
export default class GameDetailsComponent extends BaseComponent implements OnInit {
	/**
	 * This property is an Observable that holds the list of games
	 */
	@Select(GameState.selectGames) gameList$!: Observable<any>;

	/**
	 *  This property is an Observable that holds the game selected by the 'slug' parameter in the URL
	 */
	@Select(GameState.selectBySlug) selectedGame$!: Observable<any>;

	/**
	 * This property holds the selected game
	 */
	game!: Game;

	/**
	 * constructor
	 * @param activatedRoute
	 * @param store
	 */
	constructor(private activatedRoute: ActivatedRoute, private store: Store) {
		super();
	}

	/**
	 * ngOnInit
	 */
	ngOnInit(): void {
		// When the route parameters change, update the 'slug' in the store
		this.activatedRoute.params
			.pipe(
				tap(({ slug }) => {
					this.store.dispatch(new UpdateSlug(slug));
				})
			)
			.subscribe();

		// Combine the 'selectedGame$' and 'gameList$' Observables and subscribe to them
		// When the Observables emit new values, filter the combined value to only include the data if it exists
		this.addSafeSubscription(
			combineLatest([this.selectedGame$, this.gameList$])
				.pipe(filter(([game, list]) => game && list.length))
				.subscribe({
					next: ([game]) => {
						// If the game exists, assign it to the 'game' property
						// If the game does not exist, navigate to the 'games' route
						if (game) {
							this.game = game;
						} else {
							this.router.navigate(["/home"]);
						}
					},
				})
		);
	}

	/**
	 * ngOnDestroy
	 */
	ngOnDestroy(): void {
		// If the 'game' property is not empty, dispatch the 'AddLastPlayedGames' action with the value of the 'game' property
		if (this.game) {
			this.store.dispatch(new AddLastPlayedGames(this.game));
		}
	}
}
