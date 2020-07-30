import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByNames',
  pure: false
})
export class SortByNamesPipe implements PipeTransform {

  transform(value: any): any{
    let docName = 'doctorName';
    return value.sort((a,b) => {
      if(a[docName] > b[docName])
      { return 1; }
      else
      { return -1; }
    })
  }

}
