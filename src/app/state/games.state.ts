import { State, Selector, Action, StateContext } from "@ngxs/store";
import { Game, GameMockClient } from "@app/shared";
import {
	FetchGames,
	GameFilter,
	AddLastPlayedGames,
	UpdateSlug,
} from "./games.action";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { GameTags } from "@app/shared/client/game.enum";

export interface GameStateModel {
	gameList: Game[];
	lastPlayedGames: Game[];
	textFilter: string;
	selectBySlug: string;
	providerFilter: string[];
}

@State<GameStateModel>({
	name: "game",
	defaults: {
		gameList: [],
		selectBySlug: "",
		lastPlayedGames: [],
		textFilter: "",
		providerFilter: [],
	},
})
@Injectable()
export class GameState {
	constructor(private gameService: GameMockClient) {}

	@Selector()
	static selectGames({ gameList, providerFilter, textFilter }: GameStateModel) {
		return gameList.filter((game: Game) => {
			const providerCondition =
				!providerFilter.length ||
				providerFilter.some(
					(provider: string) => provider === game.providerName
				);
			const searchCondition =
				!textFilter ||
				!game.title.toLowerCase().indexOf(textFilter.toLowerCase());
			return providerCondition && searchCondition;
		});
	}

	@Selector()
	static selectLastPlayedGames({ lastPlayedGames }: GameStateModel) {
		return [...lastPlayedGames].reverse();
	}

	@Selector()
	static selectBySlug({ gameList, selectBySlug }: GameStateModel) {
		return gameList.find((game: Game) => game.slug === selectBySlug);
	}

	@Selector()
	static selectTrendingGames({ gameList }: GameStateModel) {
		return gameList.filter((game: Game) => game.tag === GameTags.TRENDING);
	}

	@Selector()
	static selectGameProviders({ gameList }: GameStateModel) {
		const providers = gameList?.map((game) => game.providerName);
		return Array.from(new Set(providers));
	}

	@Action(FetchGames)
	getDataFromState(ctx: StateContext<GameStateModel>) {
		return this.gameService.getAll$().pipe(
			tap((returnData: Game[]) => {
				const state = ctx.getState();
				ctx.setState({
					...state,
					gameList: returnData,
				});
			})
		);
	}

	@Action(GameFilter)
	updateFilter(
		{ patchState }: StateContext<GameStateModel>,
		{ term, providers }: GameFilter
	) {
		patchState({ textFilter: term, providerFilter: providers });
	}

	@Action(AddLastPlayedGames)
	AddLastPlayedGames(
		state: StateContext<GameStateModel>,
		{ game }: AddLastPlayedGames
	) {
		const lpg = state
			.getState()
			.lastPlayedGames.filter(
				(currentGame: Game) => currentGame.slug !== game.slug
			);
		state.patchState({ lastPlayedGames: [...lpg.slice(-4), game] });
	}

	@Action(UpdateSlug)
	UpdateSlug(
		{ patchState }: StateContext<GameStateModel>,
		{ slug }: UpdateSlug
	) {
		patchState({ selectBySlug: slug });
	}
}
