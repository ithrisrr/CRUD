import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PopoverModule } from 'ngx-smart-popover';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserlistComponent } from './userlist/userlist.component';
import {routes} from './app-routing.module'
import { CrudService } from './crud.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    PopoverModule,
    ToastrModule.forRoot()
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
