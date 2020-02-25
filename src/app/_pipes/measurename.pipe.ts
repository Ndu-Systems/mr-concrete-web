import { Pipe, PipeTransform } from '@angular/core';
import { Measurement } from '../_models';

@Pipe({
  name: 'measurename'
})
export class MeasurenamePipe implements PipeTransform {

  transform( id: number, mausurements: Measurement[]): any {
    const item = mausurements.find(x => Number(x.MeasurementId) === Number(id));
    return item.Name;
  }

}
