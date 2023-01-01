import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Components
import GameDetailsComponent from "./game-details/game-details.component";
import GameListComponent from "./game-list/game-list.component";
import PagesComponent from "./pages.component";
import TrendingGamesComponent from "./trending-games/trending-games.component";

const ROUTES: Routes = [
	{
		path: "",
		component: PagesComponent,
		children: [
			{
				path: "",
				pathMatch: "full",
				redirectTo: "home",
			},
			{
				path: "home",
				component: TrendingGamesComponent,
				data: { title: "Home" },
			},
			{
				path: "games",
				component: GameListComponent,
				data: { title: "Games" },
			},
			{
				path: "games/:slug",
				component: GameDetailsComponent,
				data: { title: "Game" },
			},
			{
				path: "*",
				pathMatch: "full",
				redirectTo: "home",
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(ROUTES)],
	exports: [RouterModule],
})
export default class PagesRoutingModule {}
