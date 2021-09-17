import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicationsService } from 'src/app/services/publications.service';
import { UserService } from './../../services/user.service';
import { environment } from 'src/environments/environment';
import { Publication } from './../../models/publication';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-publication-detail',
  templateUrl: './publication-detail.component.html',
  styleUrls: ['./publication-detail.component.scss']
})
export class PublicationDetailComponent implements OnInit {

  photo: string;
  date : Date;
  imagePath: string = environment.imagePath;
  user : User;
  assetImg: string = '../../assets/img/profile.png';
  likes: number;
  id : number;
  isConnected: boolean = false;
  errorMsg: string;

  constructor(
    private actRoute: ActivatedRoute,
    private publServ: PublicationsService,
    private userService: UserService,
    private el: ElementRef,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.id = +this.actRoute.snapshot.params.id;
    let userId = +this.actRoute.snapshot.params.userId;

    if (localStorage.getItem("token")) {
      let token = { "token": localStorage.getItem("token") };
      this.userService.getUserIdWithToken(token).subscribe(id => {
        this.isConnected = id == userId ? true : false;
      });
    }

    this.errorMsg = "";
    this.publServ.getSinglePublicationWithId(this.id).subscribe((data:Publication[]) => {
      this.photo = (data[0].url);
      this.date = data[0].date;
    }, err => console.log(err));

    this.userService.getUserById(userId).subscribe((data:User) => {
      this.user = data
    }
      , err => console.log(err));

    this.getNumberLikes(this.id);

    this.publServ.handleImageLiked().subscribe(data => this.getNumberLikes(this.id));
  }

  getNumberLikes(id: number):void {
    this.publServ.getPhotoLikes(id).subscribe(data => this.likes = data[0].likes);

  }

  likePhoto():void {
    if (localStorage.getItem("token")) {
      let token = { "token": localStorage.getItem("token") };
      this.userService.getUserIdWithToken(token).subscribe((id: number) => {
        this.publServ.likePhoto(id, this.id).subscribe(data => {
          this.likeEffect(".heart");
          this.publServ.dispatchImgLiked(true);
          this.errorMsg = "";
        }, error => this.errorMsg = error.error.err);
      }, err => console.log(err));
    }

  }

  likeEffect(element):void {
    let el: HTMLElement = this.el.nativeElement.querySelector(element);
    el.style.setProperty('visibility', 'visible');
    el.classList.add("animate__heartBeat");
    setTimeout(() => {
      el.style.setProperty('visibility', 'hidden');
    }, 600);
  }

  deletePhoto():void {
    if (this.isConnected) {
      this.publServ.deletePhoto(this.id).subscribe(data => {
        this.router.navigate(["/profil"]);
      }, err => console.log(err));
    }

  }




}
