import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { PublicationsService } from 'src/app/services/publications.service';
import { Publication } from './../../models/publication';
import { Comment } from './../../models/comment';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-personnal-feed',
  templateUrl: './personnal-feed.component.html',
  styleUrls: ['./personnal-feed.component.scss']
})
export class PersonnalFeedComponent implements OnInit {

  allPublications: Publication[];
  users: User[];
  allComments: Comment[];
  imgDefaultUrl: string = "../../../assets/img/profile.png";
  imgPath: string = environment.imagePath;
  isComments: boolean = false;

  constructor(private publiService: PublicationsService, private authService: AuthService, private commService: CommentService, private userService : UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      let token = { "token": localStorage.getItem("token") };
      this.userService.getUserIdWithToken(token).subscribe((id: number) => {
        this.publiService.getAllPublicationsExceptId(+id).subscribe((data: Publication[]) => this.allPublications = data);
      }, err => console.log(err));

    } else {
      this.publiService.getAllPublications()
        .subscribe((data: Publication[]) => {
          this.allPublications = data;
        }, err => console.log(err))

    }

    this.userService.getAllUsersWhoPublished().subscribe((data: User[]) => {
      this.users = data;
    }, err => console.log(err));

    this.commService.getAllComments().subscribe((data: Comment[]) => {
      this.allComments = data;
    }, err => console.log(err));

    this.commService.handleNewComment()
      .subscribe((data:string) =>this.commService.getAllComments()
        .subscribe((data:Comment[]) => this.allComments = data));
  }




}
