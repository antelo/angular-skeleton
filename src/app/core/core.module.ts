import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { HttpMockApiInterceptor } from './mock/http-mock-api.interceptor';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './layout/modal/modal.component';



@NgModule({
  declarations: [AuthLayoutComponent, ContentLayoutComponent, HeaderComponent, FooterComponent, ModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NgbModalModule
  ],
  providers: [
    AuthGuard,
    NoAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpMockApiInterceptor, multi: true },
  ],
  exports: [AuthLayoutComponent, ContentLayoutComponent, ModalComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
