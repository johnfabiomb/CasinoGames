import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

// Imports
import InjectorService from "@app/shared/services/injector/injector.service";

/**
 * BaseComponent
 */
@Component({ template: "" })
export default abstract class BaseComponent implements OnDestroy {
	// Provider for navigation
	router: Router;
	// subscriptions
	private subscriptions: Subscription = new Subscription();

	constructor() {
		this.router = InjectorService.injector.get(Router);

		// override ngOnDestroy in order to perform unsubscription of the passed subscriptions
		const f = this.ngOnDestroy.bind(this);
		this.ngOnDestroy = () => {
			f();
			this.subscriptions.unsubscribe();
		};
	}

	/**
	 * ngOnDestroy
	 */
	ngOnDestroy() {
		console.log("ngOnDestroy");
	}

	/**
	 * The subscription passed will be unsubscribed on the ngOnDestroy method.
	 * If the subscription is already added nothing happens.
	 * @param sub - the subscription to unsubscribe
	 */
	protected addSafeSubscription(...sub: Subscription[]): void {
		if (!sub) {
			return;
		}
		sub.forEach((subscription: Subscription) =>
			this.subscriptions.add(subscription)
		);
	}
}
