import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

/**
 * Components
 */
import WindowComponent from "./window/window.component";
import SideBarComponent from "./side-bar/side-bar.component";
import PanelContainerComponent from "./panel-container/panel-container.component";

const components = [WindowComponent, SideBarComponent, PanelContainerComponent];
/**
 * Template module
 */
@NgModule({
	declarations: components,
	exports: components,
	imports: [CommonModule, RouterModule],
})
export default class TemplateModule {}
