import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';

import { AddCollaborateurComponent } from './administrateur/add-collaborateur/add-collaborateur.component';
import { EditCollaborateurComponent } from './administrateur/edit-collaborateur/edit-collaborateur.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { SecurityComponent } from './security/security.component';
=======
import { AdministrateurComponent } from './administrateur/administrateur.component';
import { SearchCollaborateurComponent } from './administrateur/search-collaborateur/search-collaborateur.component';
import { AddFraisComponent } from './administrateur/add-frais/add-frais.component';
import { EditFraisComponent } from './administrateur/edit-frais/edit-frais.component';

>>>>>>> 385cfe9ff707cbec078e9fdd6ea244a4452da09a



@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AddCollaborateurComponent,
    EditCollaborateurComponent,
    AdministrateurComponent,
    SearchCollaborateurComponent,
    AddFraisComponent,
    EditFraisComponent,
<<<<<<< HEAD
    ListFraisComponent,
    SecurityComponent,
=======
>>>>>>> 385cfe9ff707cbec078e9fdd6ea244a4452da09a
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
