import { Component, OnInit, ElementRef } from '@angular/core';
import { UserService } from './../../services/user.service';
import { PublicationsService } from 'src/app/services/publications.service';
import { environment } from 'src/environments/environment';
import { Publication } from './../../models/publication';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  publications: Publication[];
  tempImgUrl: string = "https://fakeimg.pl/450x320/?text=Hello";
  imgPath: string = environment.imagePath;
  likes;
  userId;
  liked = true;
  errMessageLike: string;
  flyoverIdImg;

  constructor(private pubService: PublicationsService, private userService: UserService, private el: ElementRef) { }

  ngOnInit(): void {
    this.pubService.getAllPublications().subscribe((data: Publication[]) => {
      this.getLikes(data);
    }, err => console.error(err));

    if (localStorage.getItem("token")) {
      let token = { "token": localStorage.getItem("token") };
      this.userService.getUserIdWithToken(token).subscribe(id => this.userId = id, err => console.log(err));
    }

    this.pubService.handleImageLiked().subscribe(data => {
      this.pubService.getAllPublications().subscribe(data => {
        this.getLikes(data);
      }, err => console.error(err)
      );
    }, err => console.log(err));


  }

  getLikes(data: Publication[]): void {
    this.pubService.getHowManyLike().subscribe(likes => {
      this.likes = likes;
      this.publications = this.addLikesToPublications(data);
    });
  }

  addLikesToPublications(data): Publication[] {
    let result = [...data];
    this.likes.map(el => {
      let index = result.map(e => e.id_publications).indexOf(el.id_publications);
      if (index !== -1) {
        result[index].likes = el.likes;
      }
    });
    return result;
  }

  likePhoto(idPhoto): void {
    if (this.userId) {
      this.pubService.likePhoto(this.userId, idPhoto)
        .subscribe(data => this.handleSuccess(data), err => this.handleError(err));
    }
  }

  handleSuccess(data): void {
    this.liked = false;
    this.likeEffect(".heart");
    this.pubService.dispatchImgLiked(true);
  }
  handleError(data): void {
    console.log(data.error.err);
    this.errMessageLike = data.error.err;

  }

  likeEffect(selector: string): void {
    let el: HTMLElement[] = this.el.nativeElement.querySelectorAll(selector);
    el.forEach((e: HTMLElement) => {
      e.style.setProperty('visibility', 'visible');
      e.classList.add("animate__heartBeat");
      e.classList.remove("fa-1x");
      e.classList.add("fa-3x");
      e.style.setProperty('--animate-duration', '0.5s');

      e.style.setProperty('color', 'red');

    });
    setTimeout(() => {
      el.forEach((e: HTMLElement) => {
        e.style.setProperty('visibility', 'hidden');
        e.classList.remove("animate__heartBeat");
        e.classList.remove("fa-3x");
        e.classList.add("fa-1x");
        e.style.setProperty('color', 'white');

      });
      this.liked = true;

    }, 500);

  }

  whichImgId(id): void {
    this.flyoverIdImg = id;
  }
  resetImgId(): void {
    this.flyoverIdImg = 0;
    this.errMessageLike = "";
  }


}
