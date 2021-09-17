import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { PublicationsService } from 'src/app/services/publications.service';
import { User } from 'src/app/models/user';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit {

  user: User;
  numberofPhotos: number;
  imgDefaultUrl: string = "../../../assets/img/profile.png";
  imgPath: string = environment.imagePath;

  constructor(private actRoute: ActivatedRoute, private userService: UserService, private router: Router, private PublService : PublicationsService) { }

  ngOnInit(): void {
    let id = +this.actRoute.snapshot.params.id;

    if (localStorage.getItem("token")) {
      let token = { "token": localStorage.getItem("token") };
      this.userService.getUserIdWithToken(token).subscribe(data => {
        if (data === +id) this.router.navigate(['/profil']);
      });

    }

    this.userService.getUserById(id).subscribe((user:User) => {
      if(!user.id_users) this.router.navigate(['**'])
      this.user = user
    }, err => console.error(err));
    this.PublService.handleNumberOfPhotos().subscribe(data => this.numberofPhotos = data
      , err => console.log(err));
  

  }




}
