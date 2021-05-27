import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AdministrateurComponent } from './administrateur/administrateur.component';

import { AddCollaborateurComponent } from './administrateur/collaborateur/add/add-collaborateur.component';
import { EditCollaborateurComponent } from './administrateur/collaborateur/edit/edit-collaborateur.component';


import { EditFraisComponent } from './administrateur/frais/edit/edit-frais.component';

import { ConnexionComponent } from './connexion/connexion.component';

import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { DeclarationActiviteComponent } from './utilisateur/declaration-activite/declaration-activite.component';

import { FraisComponent } from './administrateur/frais/frais.component';
import { CongeComponent } from './administrateur/conge/conge.component';
import { CongeEditComponent } from './administrateur/conge/edit/conge-edit.component';
import{ CongeDemandeComponent} from './utilisateur/conge-demande/conge-demande.component';

import { CollaborateurComponent } from './administrateur/collaborateur/collaborateur.component';
import { ActiviteComponent } from './administrateur/activite/activite.component';
import { AddComponent } from './administrateur/activite/add/add.component';
import { EditComponent } from './administrateur/activite/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AdministrateurComponent,
    AddCollaborateurComponent,
    EditCollaborateurComponent,
    EditFraisComponent,
    CongeDemandeComponent,
    CongeEditComponent,
    UtilisateurComponent,
    DeclarationActiviteComponent,
    FraisComponent,
    CongeComponent,
    CollaborateurComponent,
    ActiviteComponent,
    AddComponent,
    EditComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
