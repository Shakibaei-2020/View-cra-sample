import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';

import { AddCollaborateurComponent } from './administrateur/add-collaborateur/add-collaborateur.component';
import { DeleteCollaborateurComponent } from './administrateur/delete-collaborateur/delete-collaborateur.component';
import { EditCollaborateurComponent } from './administrateur/edit-collaborateur/edit-collaborateur.component';
import { ListCollaborateurComponent } from './administrateur/list-collaborateur/list-collaborateur.component';
import { AddFraisComponent } from './administrateur/add-frais/add-frais.component';
import { DeleteFraisComponent } from './administrateur/delete-frais/delete-frais.component';
import { EditFraisComponent } from './administrateur/edit-frais/edit-frais.component';
import { ListFraisComponent } from './administrateur/list-frais/list-frais.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdministrateurComponent } from './administrateur/administrateur.component';



@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,

    AddCollaborateurComponent,
    DeleteCollaborateurComponent,
    EditCollaborateurComponent,
    ListCollaborateurComponent,

    AddFraisComponent,
    DeleteFraisComponent,
    EditFraisComponent,
    ListFraisComponent,
    AdministrateurComponent,
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
