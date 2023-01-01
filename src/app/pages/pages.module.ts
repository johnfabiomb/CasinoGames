import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

/** Imports */
import ComponentsModule from "./components/components.module";
import TemplateModule from "@app/template/template.module";

/** Routing */
import AppPagesRoutingModule from "./pages-routing.module";

/** Components */
import MainComponent from "./pages.component";
import GameListComponent from "./game-list/game-list.component";
import GameDetailsComponent from "./game-details/game-details.component";
import TrendingGamesComponent from "./trending-games/trending-games.component";

@NgModule({
	imports: [
		CommonModule,
		AppPagesRoutingModule,
		TemplateModule,
		FormsModule,
		ComponentsModule,
		NgMultiSelectDropDownModule.forRoot(),
	],
	declarations: [
		MainComponent,
		GameListComponent,
		GameDetailsComponent,
		TrendingGamesComponent,
	],
})
export default class AppPagesModule {}
