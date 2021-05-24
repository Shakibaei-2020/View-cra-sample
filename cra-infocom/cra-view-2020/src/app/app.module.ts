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

import { CongeEditComponent } from './administrateur/conge/edit/conge-edit.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { CongeDemandeComponent } from './utilisateur/conge-demande/conge-demande.component';
import { DeclarationActiviteComponent } from './utilisateur/declaration-activite/declaration-activite.component';

import { MissionComponent } from './administrateur/mission/mission.component';
import { MissionEditComponent } from './administrateur/mission/edit/mission-edit.component';
import { MissionAddComponent } from './administrateur/mission/add/mission-add.component';
import { FraisComponent } from './administrateur/frais/frais.component';
import { CongeComponent } from './administrateur/conge/conge.component';
import { CollaborateurComponent } from './administrateur/collaborateur/collaborateur.component';
import { ChildComponent } from './administrateur/collaborateur/child/child.component';

@NgModule({
  declarations: [

    /** Componente commun */
    AppComponent,
    ConnexionComponent,

    /**  administrateur Componente */
    AdministrateurComponent,

    AddCollaborateurComponent,
    EditCollaborateurComponent,

    EditFraisComponent,

    MissionEditComponent,

    CongeEditComponent,

    /**  utilisateur Componente */
    UtilisateurComponent,

    CongeDemandeComponent,
    DeclarationActiviteComponent,
    MissionAddComponent,
    MissionComponent,
    FraisComponent,
    CongeComponent,
    CollaborateurComponent,
    ChildComponent,

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
