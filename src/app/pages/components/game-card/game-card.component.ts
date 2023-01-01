import {
	ChangeDetectionStrategy,
	EventEmitter,
	Component,
	Input,
	Output,
} from "@angular/core";
@Component({
	selector: "app-game-card",
	templateUrl: "./game-card.component.html",
	styleUrls: ["./game-card.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GameCardComponent {
	/**
	 *  This property is an input binding that holds the image URL for the game card
	 */
	@Input() image!: string;

	/**
	 * This property is an output binding that emits an event when the game card is clicked
	 */
	@Output() click = new EventEmitter();
}
