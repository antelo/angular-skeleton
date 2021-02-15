import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface ModalButtonInterface {
  text: string;
  cssClass: string;
  value: any;
}

export interface ModalInputsInterface {
  title: string;
  message: string;
  buttons: ModalButtonInterface[];
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() buttons: ModalButtonInterface[];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
