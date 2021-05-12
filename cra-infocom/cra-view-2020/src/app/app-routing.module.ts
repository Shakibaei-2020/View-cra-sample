import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCollaborateurComponent } from './Admin/Gestion collaborateur/add-collaborateur/add-collaborateur.component';
import { DeleteCollaborateurComponent } from './Admin/Gestion collaborateur/delete-collaborateur/delete-collaborateur.component';
import { EditCollaborateurComponent } from './Admin/Gestion collaborateur/edit-collaborateur/edit-collaborateur.component';
import { ListCollaborateurComponent } from './administrateur/list-collaborateur/list-collaborateur.component';
import { ConnexionComponent } from './connexion/connexion.component';



const routes: Routes = [
  {path:'',component:ConnexionComponent },
  {path:'connexion',component:ConnexionComponent },

  {path:'addCollaborateur',component:AddCollaborateurComponent },
  {path:'deleteCollaborateur',component: DeleteCollaborateurComponent},
  {path:'editCollaborateur',component: EditCollaborateurComponent},
  {path:'listCollaborateur',component:ListCollaborateurComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
