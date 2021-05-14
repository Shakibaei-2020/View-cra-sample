import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCollaborateurComponent } from './administrateur/add-collaborateur/add-collaborateur.component'
import { AdministrateurComponent } from './administrateur/administrateur.component';
import { DeleteCollaborateurComponent } from './administrateur/delete-collaborateur/delete-collaborateur.component'
import { EditCollaborateurComponent} from './administrateur/edit-collaborateur/edit-collaborateur.component'
import { ListCollaborateurComponent } from './administrateur/list-collaborateur/list-collaborateur.component';
import { ConnexionComponent } from './connexion/connexion.component';



const routes: Routes = [
  {path:'',component:ConnexionComponent },
  {path:'connexion',component:ConnexionComponent },

  {path:'administrateur',component:AdministrateurComponent },
  {path:'addCollaborateur',component:AddCollaborateurComponent },
  {path:'deleteCollaborateur',component: DeleteCollaborateurComponent},
  {path:'editCollaborateur',component: EditCollaborateurComponent},
  {path:'administrateur/listCollaborateur',component:ListCollaborateurComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
