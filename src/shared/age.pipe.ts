import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";
@Pipe({
	name: "age"
})
export class AgePipe implements PipeTransform {
	transform(value: string): string {
		let transformedVal = value.slice().replace("/", "-");
		let today = moment();
		let birthdate = moment(transformedVal, "MM-DD-YYYY");
		let years = today.diff(birthdate, "years");
		return years.toString();
	}
}
