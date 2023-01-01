import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Components
import GameCardComponent from "./game-card/game-card.component";
import LastPlayedGamesComponent from "./last-played-games/last-played-games.component";

@NgModule({
	declarations: [GameCardComponent, LastPlayedGamesComponent],
	exports: [GameCardComponent, LastPlayedGamesComponent],
	imports: [CommonModule],
})
export default class ComponentsModule {}
