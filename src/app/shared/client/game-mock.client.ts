import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Game } from "./game.model";
import HttpService from "@services/http/http.service";
import endpoints from "../endpoints";

@Injectable({
	providedIn: "root",
})
export class GameMockClient {
	/**
	 * constructor
	 * @param httpService
	 */
	constructor(private httpService: HttpService) {}

	/**
	 * getAll$
	 * This method returns an Observable that emits an array of games
	 * @returns Return the Observable that emits the response data as an array of games
	 */
	getAll$(): Observable<Game[]> {
		// Use the 'HttpService' to make a GET request to the 'getAll' endpoint
		return this.httpService.get<Game[]>(endpoints.games.getAll);
	}
}
