import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PublicationsService } from 'src/app/services/publications.service';
import { Publication } from './../../../models/publication';

@Component({
  selector: 'app-enregistrements',
  templateUrl: './enregistrements.component.html',
  styleUrls: ['./enregistrements.component.scss']
})
export class EnregistrementsComponent implements OnInit {

  photosLiked: Observable<Publication[]>;
  imagePath: string = environment.imagePath;

  constructor(private publiService: PublicationsService, private router: Router, private el: ElementRef) { }

  @Input() id: number;

  ngOnInit(): void {
    this.photosLiked = this.publiService.getAllPublicationsLikedWithId(this.id);

  }

  resize(url):void {
    let fullUrl = this.imagePath + url;
    let el: HTMLImageElement[] | NodeList[] = this.el.nativeElement.querySelectorAll(".likedImg");
    el.forEach(e => {
      if (e.currentSrc === fullUrl) {
        e.parentNode.classList.remove("col-md-6");
        e.parentNode.classList.remove("col-lg-4");
        e.parentNode.classList.add("col-md-12");
        e.style.width = "100%";
        e.style.height ="auto";
        
      } else {
        e.style.display = "none";
       
      }
    });

  }

  decreaseSize(url):void {
    let el : HTMLImageElement[] | NodeList[] = this.el.nativeElement.querySelectorAll(".likedImg");
   
    el.forEach(e => {
      e.style.removeProperty("display");
      e.parentNode.classList.add("col-md-6");
      e.parentNode.classList.add("col-lg-4");
      e.parentNode.classList.remove("col-md-12");
      e.style.width ="293px";
      e.style.height ="293px";
      e.style.transition = "transform 0.25s ease";
    });
  }


}
