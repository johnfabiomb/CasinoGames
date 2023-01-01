import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Components
import PanelContainerComponent from "@app/template/panel-container/panel-container.component";

const ROUTES: Routes = [
	{
		path: "",
		component: PanelContainerComponent,
		loadChildren: () =>
			import("./pages/pages.module").then(module => module.default),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(ROUTES)],
	exports: [RouterModule],
})
export default class AppRoutingModule {}
