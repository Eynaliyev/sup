import {
	trigger,
	state,
	style,
	transition,
	animate,
	keyframes
} from "@angular/core";
export const flyInTopSlow1 = trigger("flyInTopSlow1", [
	state(
		"0",
		style({
			transform: "translate3d(0,0,0)"
		})
	),
	transition("* => 0", [
		animate(
			"200ms ease-in",
			keyframes([
				style({ transform: "translate3d(0,70px,0)", offset: 0 }),
				style({ transform: "translate3d(0,0,0)", offset: 1 })
			])
		)
	])
]);
export const flyInTopSlow2 = trigger("flyInTopSlow2", [
	state(
		"0",
		style({
			transform: "translate3d(0,0,0)"
		})
	),
	transition("* => 0", [
		animate(
			"400ms ease-in",
			keyframes([
				style({ transform: "translate3d(0,70px,0)", offset: 0 }),
				style({ transform: "translate3d(0,0,0)", offset: 1 })
			])
		)
	])
]);
export const flyInTopSlow3 = trigger("flyInTopSlow3", [
	state(
		"0",
		style({
			transform: "translate3d(0,0,0)"
		})
	),
	transition("* => 0", [
		animate(
			"600ms ease-in",
			keyframes([
				style({ transform: "translate3d(0,70px,0)", offset: 0 }),
				style({ transform: "translate3d(0,0,0)", offset: 1 })
			])
		)
	])
]);
export const flyInTopSlow4 = trigger("flyInTopSlow4", [
	state(
		"0",
		style({
			transform: "translate3d(0,0,0)"
		})
	),
	transition("* => 0", [
		animate(
			"800ms ease-in",
			keyframes([
				style({ transform: "translate3d(0,70px,0)", offset: 0 }),
				style({ transform: "translate3d(0,0,0)", offset: 1 })
			])
		)
	])
]);
export const flyInTopSlow5 = trigger("flyInTopSlow5", [
	state(
		"0",
		style({
			transform: "translate3d(0,0,0)"
		})
	),
	transition("* => 0", [
		animate(
			"800ms ease-in",
			keyframes([
				style({ transform: "translate3d(500px,0,0)", offset: 0 }),
				style({ transform: "translate3d(0,0,0)", offset: 1 })
			])
		)
	])
]);
export const heroState = trigger("heroState", [
	state(
		"zoom",
		style({
			transform: "translateX(0) scale(1)"
		})
	),
	transition("* => zoom", [
		animate(
			"800ms ease-in",
			keyframes([style({ transform: "translate3d(500px,0,0) scale(1)" })])
		)
	])
]);