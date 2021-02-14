import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvalidFeedbackComponent } from './components/invalid-feedback/invalid-feedback.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';



@NgModule({
  declarations: [LoaderComponent, InvalidFeedbackComponent, SubmitButtonComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    InvalidFeedbackComponent,
    SubmitButtonComponent
  ]
})
export class SharedModule { }
