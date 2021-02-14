import { Component, Host, Input, OnInit, SkipSelf } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-invalid-feedback',
  templateUrl: './invalid-feedback.component.html',
  styleUrls: ['./invalid-feedback.component.scss']
})
export class InvalidFeedbackComponent {

  @Input() controlName: string;
  @Input() errorKey: string;

  constructor(
    @Host() @SkipSelf() private form: FormGroupDirective
  ) {
  }


  public get isInvalid(): boolean {
    const control = this.form.form.get(this.controlName);
    if (control === null) {
      return false;
    }
    return  control.hasError(this.errorKey) && (this.form.submitted || control.dirty);
  }


}
