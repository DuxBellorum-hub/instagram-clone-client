import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { PersonnalProfilComponent } from './profile/personnal-profil/personal-profil/personnal-profil.component';
import { PublicationsComponent } from './profile/publications/publications/publications.component';
import { EnregistrementsComponent } from './profile/enregistrements/enregistrements/enregistrements.component';
import { FooterComponent } from './shared/footer/footer/footer.component';
import { PublicationDetailComponent } from './profile/publication-detail/publication-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { InscriptionComponent } from './auth/inscription/inscription.component';
import { EditProfilComponent } from './profile/edit/edit-profil/edit-profil.component';
import { EditPasswordComponent } from './profile/edit/edit-password/edit-password.component';
import { EditUserDataComponent } from './profile/edit/edit-user-data/edit-user-data.component';
import { PersonnalFeedComponent } from './feeds/personnal-feed/personnal-feed.component';
import { ExploreComponent } from './feeds/explore/explore.component';
import { EditUserPhotoComponent } from './profile/edit/edit-user-photo/edit-user-photo.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfilComponent } from './profile/user-profil/user-profil.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CommentHandleComponent } from './comment-handle/comment-handle.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonnalProfilComponent,
    NavbarComponent,
    PublicationsComponent,
    EnregistrementsComponent,
    FooterComponent,
    PublicationDetailComponent,
    LoginComponent,
    InscriptionComponent,
    EditProfilComponent,
    EditPasswordComponent,
    EditUserDataComponent,
    PersonnalFeedComponent,
    ExploreComponent,
    EditUserPhotoComponent,
    UserProfilComponent,
    CommentHandleComponent,
    CommentFormComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    IvyCarouselModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
