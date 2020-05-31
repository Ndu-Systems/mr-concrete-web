import { Pipe, PipeTransform } from '@angular/core';
import { Orderproduct } from '../_models/orderproduct .model';

@Pipe({
  name: 'formatOrderproducts'
})
export class FormatOrderproductPipeCustomer implements PipeTransform {

  transform(value: Orderproduct[] = []): any {
    let results = '';
    if (!value) {
      return results;
    }
    value.forEach((x, index) => {
      results += `${x.ProductName}`;
      if (index < value.length - 1) {
        results += ', ';
      }
    });
    return results;
  }

}
