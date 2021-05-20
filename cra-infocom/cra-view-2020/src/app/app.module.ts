import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AdministrateurComponent } from './administrateur/administrateur.component';

import { AddCollaborateurComponent } from './administrateur/collaborateur-add/add-collaborateur.component';
import { SearchCollaborateurComponent } from './administrateur/collaborateur-search/search-collaborateur.component';
import { EditCollaborateurComponent } from './administrateur/collaborateur-edit/edit-collaborateur.component';


import { EditFraisComponent } from './administrateur/frais-edit/edit-frais.component';
import { SearchFraisComponent } from './administrateur/frais-search/search-frais.component';

import { ConnexionComponent } from './connexion/connexion.component';
import { MissionEditComponent } from './administrateur/mission-edit/mission-edit.component';
import { MissionSearchComponent } from './administrateur/mission-search/mission-search.component';
import { CongeEditComponent } from './administrateur/conge-edit/conge-edit.component';
import { CongeSearchComponent } from './administrateur/conge-search/conge-search.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { CongeDemandeComponent } from './utilisateur/conge-demande/conge-demande.component';
import { DeclarationActiviteComponent } from './utilisateur/declaration-activite/declaration-activite.component';


@NgModule({
  declarations: [

    /** Componente commun */
    AppComponent,
    ConnexionComponent,

    /**  administrateur Componente */
    AdministrateurComponent,

    AddCollaborateurComponent,
    EditCollaborateurComponent,
    SearchCollaborateurComponent,

    EditFraisComponent,
    SearchFraisComponent,

    MissionEditComponent,
    MissionSearchComponent,

    CongeEditComponent,
    CongeSearchComponent,

    /**  utilisateur Componente */
    UtilisateurComponent,

    CongeDemandeComponent,
    DeclarationActiviteComponent,

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
