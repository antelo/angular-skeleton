import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent {

  @Input() form: FormGroup;
  @Input() loading = false;
  @Input() block = false;

  public get isDisabled(): boolean {
    return this.loading || this.form.invalid;
  }

}
