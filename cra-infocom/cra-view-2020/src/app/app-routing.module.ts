import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCollaborateurComponent } from './administrateur/add-collaborateur/add-collaborateur.component';
import { AddFraisComponent } from './administrateur/add-frais/add-frais.component';
import { AdministrateurComponent } from './administrateur/administrateur.component';
import { EditCollaborateurComponent } from './administrateur/edit-collaborateur/edit-collaborateur.component';
import { EditFraisComponent } from './administrateur/edit-frais/edit-frais.component';
import { SearchCollaborateurComponent } from './administrateur/search-collaborateur/search-collaborateur.component';
import { SearchFraisComponent } from './administrateur/search-frais/search-frais.component';
import { ConnexionComponent } from './connexion/connexion.component';



const routes: Routes = [
  {path:'',component:ConnexionComponent },
  {path:'connexion',component:ConnexionComponent },

  {path:'administrateur',component:AdministrateurComponent },

  {path:'editCollaborateur',component:EditCollaborateurComponent },
  {path:'addCollaborateur',component:AddCollaborateurComponent },
  {path:'searchCollaborateur',component:SearchCollaborateurComponent },

  {path:'editFrais',component: EditFraisComponent},
  {path:'addFrais',component: AddFraisComponent},
  {path:'searchFrais',component:SearchFraisComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
