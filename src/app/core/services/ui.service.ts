import { Injectable } from '@angular/core';
import { ModalComponent, ModalInputsInterface } from '../layout/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private modalService: NgbModal) { }

  alert(message: string, title?: string) {
    this.modal({
      message,
      title,
      buttons: [
        {
          text: 'Accept',
          value: true,
          cssClass: 'btn-outline-dark'
        }
      ]
    })
  }
  confirm(message: string, title?: string): Observable<boolean|null> {
    return this.modal({
      message,
      title,
      buttons: [
        {
          text: 'No',
          value: false,
          cssClass: 'btn-secondary'
        },
        {
          text: 'Yes!',
          value: true,
          cssClass: 'btn-primary'
        }
      ]
    });

  }

  private modal<R>(inputs: Partial<ModalInputsInterface>): Observable<R|null> {
    const modal = this.modalService.open(ModalComponent,{ backdrop: 'static', centered: true });
    Object.assign(modal.componentInstance, inputs);
    return from(modal.result).pipe(catchError(() => of(null)));
  }

}
