import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomMaterialModule} from "./material/material.module";

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';

import { ListCalculationsComponent } from './list-calculations/list-calculations.component';


import { authInterceptorProviders } from './_helpers/auth.interceptor';
import {CalculationService} from "./_services/calculation.service";
import { AddCalculationComponent } from './add-calculation/add-calculation.component';
import { EditCalculationComponent } from './edit-calculation/edit-calculation.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,

    ListCalculationsComponent,
  
    AddCalculationComponent,
    EditCalculationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule
  ],
  providers: [authInterceptorProviders, CalculationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
