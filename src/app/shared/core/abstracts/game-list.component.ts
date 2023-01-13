import { Component } from "@angular/core";
import { Game } from "@app/shared/client/game.model";
import BaseComponent from "./base.component";

/**
 * AbstractGameListComponent
 */
@Component({ template: "" })
export default abstract class AbstractGameListComponent extends BaseComponent {
	/**
	 * Game list
	 */
	games: Game[] | undefined;

	constructor() {
		super();
	}
	/**
	 * ngOnInit
	 */
	selectGame(game: Game) {
		this.router.navigate([`/games/${game.slug}`]);
	}

	/**
	 * trackBy function
	 */
	trackByFn(index: number, item: Game) {
		return item.slug;
	}
}
