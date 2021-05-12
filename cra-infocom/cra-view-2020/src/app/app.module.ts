import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';

import { AddCollaborateurComponent } from './Admin/Gestion collaborateur/add-collaborateur/add-collaborateur.component';
import { DeleteCollaborateurComponent } from './Admin/Gestion collaborateur/delete-collaborateur/delete-collaborateur.component';
import { EditCollaborateurComponent } from './Admin/Gestion collaborateur/edit-collaborateur/edit-collaborateur.component';
import { ListCollaborateurComponent } from './Admin/Gestion collaborateur/list-collaborateur/list-collaborateur.component';
import { AddFraisComponent } from './Admin/Gestion notes de frais/add-frais/add-frais.component';
import { DeleteFraisComponent } from './Admin/Gestion notes de frais/delete-frais/delete-frais.component';
import { EditFraisComponent } from './Admin/Gestion notes de frais/edit-frais/edit-frais.component';
import { ListFraisComponent } from './Admin/Gestion notes de frais/list-frais/list-frais.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



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
