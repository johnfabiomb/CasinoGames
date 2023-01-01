import { Game } from "@app/shared";

export class FetchGames {
	static readonly type = "[Games] Fetch";
}

export class GameFilter {
	static readonly type = "[Games] Filter";
	constructor(public term: string, public providers: string[]) {}
}

export class AddLastPlayedGames {
	static readonly type = "[Games] add Last Played";
	constructor(public game: Game) {}
}

export class UpdateSlug {
	static readonly type = "[Games] Update Slug";
	constructor(public slug: string) {}
}
