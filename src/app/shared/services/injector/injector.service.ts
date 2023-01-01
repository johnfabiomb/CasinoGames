import { Injector, Type } from "@angular/core";

/**
 * InjectorService allows us to inject services manually
 */
export default class InjectorService {
	static injector: Injector;
	static get<T>(value: Type<T>) {
		return InjectorService.injector.get<T>(value);
	}
	static set(value: Injector): void {
		InjectorService.injector = value;
	}
}
