import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExploreComponent } from './feeds/explore/explore.component';
import { PersonnalFeedComponent } from './feeds/personnal-feed/personnal-feed.component';
import { EditProfilComponent } from './profile/edit/edit-profil/edit-profil.component';
import { InscriptionComponent } from './auth/inscription/inscription.component';
import { LoginComponent } from './auth/login/login.component';
import { PublicationDetailComponent } from './profile/publication-detail/publication-detail.component';
import { PersonnalProfilComponent } from './profile/personnal-profil/personal-profil/personnal-profil.component';
import { UserProfilComponent } from './profile/user-profil/user-profil.component';

const routes: Routes = [
  {path: '', component: PersonnalFeedComponent, canActivate: [AuthGuard]},
  {path: 'explore', component: ExploreComponent, canActivate: [AuthGuard]},
  {path: 'profil', component: PersonnalProfilComponent, canActivate: [AuthGuard]},
  {path: 'profil/:id', component: UserProfilComponent, canActivate: [AuthGuard]},
  {path:'publication-detail/:userId/:id', component: PublicationDetailComponent, canActivate: [AuthGuard]},
  {path:'auth', component:LoginComponent},
  {path: 'register', component:InscriptionComponent},
  {path: 'edit-profil/:id', component: EditProfilComponent, canActivate: [AuthGuard]},
	{ path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
