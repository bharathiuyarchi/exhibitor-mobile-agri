import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortpipePipe implements PipeTransform {
  transform(array: any, field: string): any[] {
    if (!Array.isArray(array)) {
      return [];
    }
    return array.sort((a, b) => a.updatedAt !== b.updatedAt ? a.updatedAt < b.updatedAt && a[field] < b[field] ? -1 : 1 : 0);
  }
}

