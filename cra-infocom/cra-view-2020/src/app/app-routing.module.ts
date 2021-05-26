import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCollaborateurComponent } from './administrateur/collaborateur/add/add-collaborateur.component';
import { AdministrateurComponent } from './administrateur/administrateur.component';



import { EditCollaborateurComponent } from './administrateur/collaborateur/edit/edit-collaborateur.component';
import{ CollaborateurComponent} from './administrateur/collaborateur/collaborateur.component';


import { ConnexionComponent } from './connexion/connexion.component';


import { CongeEditComponent } from './administrateur/conge/edit/conge-edit.component';
import { CongeComponent } from './administrateur/conge/conge.component';

import {MissionComponent} from './administrateur/mission/mission.component';
import {MissionEditComponent } from './administrateur/mission/edit/mission-edit.component';
import {MissionAddComponent} from './administrateur/mission/add/mission-add.component'

import { FraisComponent } from './administrateur/frais/frais.component';
import { EditFraisComponent } from './administrateur/frais/edit/edit-frais.component';

import { UtilisateurComponent } from './utilisateur/utilisateur.component';

import { DeclarationActiviteComponent } from './utilisateur/declaration-activite/declaration-activite.component';




const routes: Routes = [

/**componente commun */

  {path:'',component:ConnexionComponent },
  {path:'connexion',component:ConnexionComponent },

/** utilisateur componente */
  {path:'utilisateur',component:UtilisateurComponent },
  
  {path:'declarationActivite',component:DeclarationActiviteComponent },


/** Administrateur  componente */
{path:'administrateur',component:AdministrateurComponent },

  {path:'editConge',component:CongeEditComponent },
  {path:'searchconge',component:CongeComponent},

  {path:'editMission',component: MissionEditComponent},
  {path:'addMission',component: MissionAddComponent},
  {path:'mission',component: MissionComponent},


  {path:'editCollaborateur',component:EditCollaborateurComponent },
  {path:'addCollaborateur',component:AddCollaborateurComponent },
  {path:'searchCollaborateur',component:CollaborateurComponent },

  {path:'editFrais',component: EditFraisComponent},
  {path:'searchFrais',component:FraisComponent},



  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
