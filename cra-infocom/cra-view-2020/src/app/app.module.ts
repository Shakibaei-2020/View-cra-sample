import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';

import { AddCollaborateurComponent } from './administrateur/add-collaborateur/add-collaborateur.component';
import { EditCollaborateurComponent } from './administrateur/edit-collaborateur/edit-collaborateur.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdministrateurComponent } from './administrateur/administrateur.component';
import { SearchCollaborateurComponent } from './administrateur/search-collaborateur/search-collaborateur.component';
import { EditFraisComponent } from './administrateur/edit-frais/edit-frais.component';
import { SearchFraisComponent } from './administrateur/search-frais/search-frais.component';


import {MatNativeDateModule} from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';




import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdministrateurComponent,
    ConnexionComponent,

    AddCollaborateurComponent,
    EditCollaborateurComponent,
    SearchCollaborateurComponent,

    EditFraisComponent,
    SearchFraisComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
