export interface Game {
	id: string;
	slug: string;
	title: string;
	tag?: any;
	providerName: string;
	startUrl: string;
	thumb: Thumb;
}

export interface Thumb {
	url: string;
	title: string;
}

export interface IGameFilter {
	provider: string;
	search: string;
}
