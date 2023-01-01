import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@env";

/**
 * service to make http requests
 */
@Injectable({
	providedIn: "root",
})
export default class HttpService {
	/** url base */
	url: string;

	/**
	 * Constructor
	 * @param http Angular http client
	 */
	constructor(private http: HttpClient) {
		this.url = environment.API_URL;
	}

	/**
	 * Method for get resources
	 * @param url
	 * @param options
	 * @returns Observable
	 */
	get<T>(url: string, options = {}): Observable<any> {
		return this.http.get<T>(`${this.url}${url}`, options);
	}

	/**
	 * Method for create resources
	 * @param data
	 * @param url
	 * @param options
	 * @returns Observable
	 */
	post<T>(data: any, url: string, options = {}): Observable<any> {
		return this.http.post<T>(`${this.url}${url}`, data, options);
	}
}
