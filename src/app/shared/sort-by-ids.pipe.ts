import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByIds',
  pure: false
})
export class SortByIdsPipe implements PipeTransform {

  transform(value: any): any{
    let docID = 'doctorId';
    return value.sort((a,b) => {
      if(a[docID] > b[docID])
      { return 1; }
      else
      { return -1; }
    })
  }
}
