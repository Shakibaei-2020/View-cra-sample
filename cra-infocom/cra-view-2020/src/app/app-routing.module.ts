import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCollaborateurComponent } from './administrateur/collaborateur-add/add-collaborateur.component';
import { AdministrateurComponent } from './administrateur/administrateur.component';
import { EditCollaborateurComponent } from './administrateur/collaborateur-edit/edit-collaborateur.component';
import { EditFraisComponent } from './administrateur/frais-edit/edit-frais.component';
import { SearchCollaborateurComponent } from './administrateur/collaborateur-search/search-collaborateur.component';
import { SearchFraisComponent } from './administrateur/frais-search/search-frais.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { CongeEditComponent } from './administrateur/conge-edit/conge-edit.component';
import { CongeSearchComponent } from './administrateur/conge-search/conge-search.component';
import { MissionEditComponent } from './administrateur/mission-edit/mission-edit.component';
import { MissionSearchComponent } from './administrateur/mission-search/mission-search.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { CongeDemandeComponent } from './utilisateur/conge-demande/conge-demande.component';
import { DeclarationActiviteComponent } from './utilisateur/declaration-activite/declaration-activite.component';
import { MissionAddComponent } from './administrateur/mission-add/mission-add.component';



const routes: Routes = [

/**componente commun */

  {path:'',component:ConnexionComponent },
  {path:'connexion',component:ConnexionComponent },

/** utilisateur componente */
  {path:'utilisateur',component:UtilisateurComponent },
  
  {path:'congeDemande',component:CongeDemandeComponent },
  {path:'declarationActivite',component:DeclarationActiviteComponent },


/** Administrateur  componente */
{path:'administrateur',component:AdministrateurComponent },

  {path:'editConge',component:CongeEditComponent },
  {path:'searchconge',component:CongeSearchComponent},

  {path:'editMission',component: MissionEditComponent},
  {path:'searchMission',component: MissionSearchComponent},
  {path:'addMission',component: MissionAddComponent},


  {path:'editCollaborateur',component:EditCollaborateurComponent },
  {path:'addCollaborateur',component:AddCollaborateurComponent },
  {path:'searchCollaborateur',component:SearchCollaborateurComponent },

  {path:'editFrais',component: EditFraisComponent},
  {path:'searchFrais',component:SearchFraisComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
