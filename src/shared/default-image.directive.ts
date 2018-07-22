import { Directive, Input } from "@angular/core";

@Directive({
	selector: "img[default]",
	host: {
		"[src]": "checkPath(src)",
		"(error)": "updateUrl()"
	}
})
export class DefaultImageDirective {
	@Input() src: string;
	default: string = "assets/images/other-assets/profile.png";

	public updateUrl() {
		return this.default;
	}
	public checkPath(src) {
		return src ? src : this.default;
	}
}
