import { FormControl } from '@angular/forms';

export function websiteValidator(control: FormControl): {[key: string]: any} {
  var websiteRegexp = /(https?:\/\/)?([\w\d]+\.)?[\w\d]+\.\w+\/?.+$/;    
  if (control.value && !websiteRegexp.test(control.value)) {
    return { invalidUrl: true };
  }
}
