import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCollaborateurComponent } from './administrateur/collaborateur/add/add-collaborateur.component';
import { AdministrateurComponent } from './administrateur/administrateur.component';



import { EditCollaborateurComponent } from './administrateur/collaborateur/edit/edit-collaborateur.component';
import{ CollaborateurComponent} from './administrateur/collaborateur/collaborateur.component';


import { ConnexionComponent } from './connexion/connexion.component';


import { CongeEditComponent } from './administrateur/conge/edit/conge-edit.component';
import { CongeComponent } from './administrateur/conge/conge.component';


import { FraisComponent } from './administrateur/frais/frais.component';
import { EditFraisComponent } from './administrateur/frais/edit/edit-frais.component';

import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { DeclarationActiviteComponent } from './utilisateur/declaration-activite/declaration-activite.component';
import{ CongeDemandeComponent} from './utilisateur/conge-demande/conge-demande.component';

import {ActiviteComponent} from './administrateur/activite/activite.component';
import {AddComponent } from './administrateur/activite/add/add.component';
import {EditComponent} from './administrateur/activite//edit/edit.component';
import { AddClientComponent } from './administrateur/client/add-client/add-client.component';
import { EditClientComponent } from './administrateur/client/edit-client/edit-client.component';

import { ClientComponent } from './administrateur/client/client.component';
import { EditMissionComponent } from './administrateur/mission/edit-mission/edit-mission.component';
import { AddMissionComponent } from './administrateur/mission/add-mission/add-mission.component';
import { MissionComponent } from './administrateur/mission/mission.component';
import { MonProfileComponent } from './utilisateur/mon-profile/mon-profile.component';
import { AccueilUtilisateurComponent } from './utilisateur/Accueil/accueil-utilisateur.component';
import { NoteDeFraisDeclarationComponent } from './utilisateur/note-de-frais-declaration/note-de-frais-declaration.component';
import { AccueilAdministrateurComponent } from './administrateur/accueil-administrateur/accueil-administrateur.component';




const routes: Routes = [

/**componente commun */

  {path:'',component:ConnexionComponent },
  {path:'connexion',component:ConnexionComponent },

  
  {path:'declarationActivite',component:DeclarationActiviteComponent },
  {path:'demandeConge',component: CongeDemandeComponent},

  {path:'utilisateur',component: AccueilUtilisateurComponent},

{path:'administrateur',component:AccueilAdministrateurComponent },


  {path:'editLeave',component:CongeEditComponent },
  {path:'searchLeave',component:CongeComponent},

  {path:'editActivite',component:EditComponent },
  {path:'addActivite',component:AddComponent },
  {path:'searchActivity',component: ActiviteComponent},


  {path:'editCollaborateur',component:EditCollaborateurComponent },
  {path:'addCollaborateur',component:AddCollaborateurComponent },
  {path:'searchCollaborateur',component:CollaborateurComponent },

  {path:'editFrais',component: EditFraisComponent},
  {path:'searchFrais',component:FraisComponent},

  {path:'editClient',component: EditClientComponent },
  {path:'addClient',component:AddClientComponent },
  {path:'searchClient',component:ClientComponent },


  {path:'editMission',component: EditMissionComponent },
  {path:'addMission',component:AddMissionComponent },
  {path:'searchMission',component:MissionComponent },

  {path:'monProfil',component:MonProfileComponent },
  
  {path:'ajouterNoteDeFraisUser',component:NoteDeFraisDeclarationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
