import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Modules Area
// Browser Animation Module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// App Routing Module
import { AppRoutingModule } from './app-routing.module';
// Auth Module
import { AuthModule } from './shared/modules/auth/auth.module';
// Core Module
import { CoreModule } from './core/core.module';
// Http Client Module
import { HttpClientModule } from '@angular/common/http';
// Material Module
import { MaterialModule } from './shared/modules/material.module';
////////////////////////////////////////////////////////////////////////////
// Components Area
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    CoreModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
