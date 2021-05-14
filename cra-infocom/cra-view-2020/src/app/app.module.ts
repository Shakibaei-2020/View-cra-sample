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



@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,

    AddCollaborateurComponent,
    EditCollaborateurComponent,
    AdministrateurComponent,
    SearchCollaborateurComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
