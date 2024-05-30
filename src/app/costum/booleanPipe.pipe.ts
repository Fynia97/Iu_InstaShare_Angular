import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'BooleanPipe'
})
export class BooleanPipe implements PipeTransform {

  transform(value: Boolean): string {
    return value == true ? "Ja" : "Nein";
  }
}
