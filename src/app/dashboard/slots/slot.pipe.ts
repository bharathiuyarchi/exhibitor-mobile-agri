import { formatDate } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "slot",
})
export class SlotPipe implements PipeTransform {
  transform(value: any, selectedDate: string): any {
    if (!value) return [];
    if (!selectedDate) return value;

    console.log(value.filter((slot: any) => {
      let chooseTime = formatDate(
        new Date(slot.chooseTime),
        "yyyy-MM-dd",
        "en-IN"
      );
      let match = formatDate(new Date(selectedDate), "yyyy-MM-dd", "en-IN");

      return chooseTime == match;
    }))
    return value.filter((slot: any) => {
      let chooseTime = formatDate(
        new Date(slot.chooseTime),
        "yyyy-MM-dd",
        "en-IN"
      );
      let match = formatDate(new Date(selectedDate), "yyyy-MM-dd", "en-IN");

      return chooseTime == match;
    });
   
  }
}
