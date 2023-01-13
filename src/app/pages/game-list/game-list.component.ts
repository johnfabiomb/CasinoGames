import AbstractGameListComponent from "@app/shared/core/abstracts/game-list.component";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Game, IGameFilter } from "@app/shared/client/game.model";
import { Select, Store } from "@ngxs/store";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { Observable } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { GameFilter } from "../../state/games.action";
import { GameState } from "../../state/games.state";

@Component({
	selector: "app-games-list",
	templateUrl: "./game-list.component.html",
	styleUrls: ["./game-list.component.scss"],
})
export default class GameListComponent
	extends AbstractGameListComponent
	implements OnInit
{
	/**
	 * term setter and getter
	 */
	set term(value: string) {
		this._term = value;
		this.navigateToFilter();
	}
	get term() {
		return this._term;
	}

	/**
	 * Provider setter and getter
	 */
	set provider(value: string[]) {
		this._provider = value;
		this.navigateToFilter();
	}
	get provider() {
		return this._provider;
	}
	/**
	 *  This property is an Observable that holds the list of trending games
	 */
	@Select(GameState.selectGames) gameList$!: Observable<Game[]>;

	@Select(GameState.selectGameProviders) gameProviders$!: Observable<string[]>;

	/**
	 * Providers options
	 */
	providers: string[] | undefined;

	/**
	 * dropdown setting
	 */
	dropdownSettings: IDropdownSettings = {
		singleSelection: false,
		idField: "",
		textField: "",
		selectAllText: "Select All",
		unSelectAllText: "UnSelect All",
		itemsShowLimit: 3,
		allowSearchFilter: true,
	};

	/**
	 * private _term
	 */
	private _term = "";

	/**
	 * private Provider
	 */
	private _provider: string[] = [];

	/**
	 * The constructor is inherited from the AbstractGameListComponent class
	 * @param activatedRoute
	 * @param store
	 */
	constructor(private activatedRoute: ActivatedRoute, private store: Store) {
		super();
	}

	/**
	 * OnInit function
	 */
	ngOnInit(): void {
		this.initFilters();
		// Http reques to get all the games
		this.activatedRoute.queryParams
			.pipe(
				debounceTime(500),
				tap(({ search, provider }) => {
					const parsedProviders = provider ? provider.split(",") : [];
					this.store.dispatch(new GameFilter(search, parsedProviders));
				})
			)
			.subscribe(),
			this.addSafeSubscription(
				this.gameList$.subscribe((data) => (this.games = data)),
				this.gameProviders$.subscribe((data) => (this.providers = data))
			);
	}
	/**
	 * initFilters
	 */
	initFilters() {
		// This line initializes the 'term' property with the value of the 'search' query parameter in the URL
		this.term = this.activatedRoute.snapshot.queryParams.search;

		// This line initializes the 'provider' property with the value of the 'provider' query parameter in the URL
		// If the 'provider' query parameter is not present, an empty array is assigned to the 'provider' property
		this.provider = this.activatedRoute.snapshot.queryParams.provider
			? this.activatedRoute.snapshot.queryParams.provider.split(",")
			: [];
	}

	/**
	 * navigateToFilter
	 */
	navigateToFilter() {
		// This object will hold the query parameters for the URL
		const params: Partial<IGameFilter> = {};

		// If the 'provider' property is not empty, add the 'provider' query parameter to the 'params' object
		if (this.provider.length) {
			params.provider = this.provider.join(",");
		}

		// If the 'term' property is not empty, add the 'search' query parameter to the 'params' object
		if (this.term) {
			params.search = this.term;
		}

		// Navigate to the current URL and update the query parameters with the values in the 'params' object
		this.router.navigate([], {
			queryParams: params,
		});
	}

	/**
	 * cleanFilter
	 */
	cleanFilter() {
		// Reset the 'term' and 'provider' properties
		this.term = "";
		this.provider = [];

		// Navigate to the current URL and remove all query parameters
		this.router.navigate([], {
			queryParams: {},
		});
	}
}
