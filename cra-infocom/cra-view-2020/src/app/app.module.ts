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
import { AddFraisComponent } from './administrateur/add-frais/add-frais.component';
import { EditFraisComponent } from './administrateur/edit-frais/edit-frais.component';
import { SearchFraisComponent } from './administrateur/search-frais/search-frais.component';


import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdministrateurComponent,
    ConnexionComponent,

    AddCollaborateurComponent,
    EditCollaborateurComponent,
    SearchCollaborateurComponent,

    AddFraisComponent,
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
