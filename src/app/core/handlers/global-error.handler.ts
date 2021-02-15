import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UiService } from '../services/ui.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(private injector: Injector, private zone: NgZone) { }

    handleError(error: Error | HttpErrorResponse): void {
      if (environment.production === false) {
        console.log(error)
      }

      if (error instanceof HttpErrorResponse) {
          return this.handleHttpResponseError(error);
      }
    }

    private handleHttpResponseError(error: HttpErrorResponse): void {
      if (error instanceof HttpErrorResponse) {
        this.displayError(error);
      }
    }

    private displayError(error: Error) {
      this.zone.run(() => {
        const uiService = this.injector.get(UiService);
        uiService.alert(error.message || "Undefined error");
      });
    }
}
