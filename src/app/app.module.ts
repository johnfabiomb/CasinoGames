import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { Injector, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import InjectorService from "./shared/services/injector/injector.service";

// App
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsModule } from "@ngxs/store";
import { GameState } from "./state/games.state";
import { environment } from "@env";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import AppRoutingModule from "./app-routing.module";
import TemplateModule from "./template/template.module";
import { ApppComponent } from "./app.component";

@NgModule({
	declarations: [ApppComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule,
		BrowserModule,
		AppRoutingModule,
		NgxsLoggerPluginModule.forRoot({
			disabled: environment.production,
		}),
		NgxsModule.forRoot([GameState], {
			developmentMode: !environment.production,
		}),
		NgxsStoragePluginModule.forRoot(),
		TemplateModule,
	],
	bootstrap: [ApppComponent],
})
export class AppModule {
	/**
	 * constructor
	 * @param injector {Injector} it allows us to inject services manually
	 */
	constructor(private injector: Injector) {
		InjectorService.set(this.injector);
	}
}
