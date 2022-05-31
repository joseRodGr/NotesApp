import { FormGroup } from "@angular/forms";

export function validateAllFormControls(form: FormGroup){
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control?.markAsTouched({onlySelf: true});
    })
  }