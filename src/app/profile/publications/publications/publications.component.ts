import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicationsService } from './../../../services/publications.service';
import { UserService } from './../../../services/user.service';
import { Publication } from './../../../models/publication';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {

  photoUploadForm: FormGroup;
  photos :Publication[] ;
  imagePath : string = environment.imagePath;
  isConnected : boolean = false;
  likes: any[];
  errorMsg : string;

  constructor(private fb: FormBuilder, private el: ElementRef, private publicationsService: PublicationsService, private router : Router, private UserService : UserService) { }

  @Input() id: any;
  @ViewChild('imgInput', {static: false}) inputVar : ElementRef;


  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      let token = { "token": localStorage.getItem("token") };
      this.UserService.getUserIdWithToken(token).subscribe((data:number) => {
        if (data === +this.id) this.isConnected = true;
      });

    }

    this.createForm();
    this.publicationsService.getAllPublicationsById(this.id).subscribe((photos:Publication[]) => {
      this.getLikes(photos);
    }, err => console.log(err))
    
    this.publicationsService.handleImageUpdated()
    .subscribe(data => this.refresh(data));
  }

  createForm() {
    this.photoUploadForm = this.fb.group({
      publications: "", 
      idUser: this.id
    });
  }

  addPhoto():void {
    let inputElement: HTMLInputElement = this.el.nativeElement.querySelector('#publications');
    let fileCount: number = inputElement.files.length;
    if (fileCount > 0) {
      let formData = new FormData();
      formData.append('publications', inputElement.files.item(0));
      formData.append('idUser', this.id);
      formData.append('date', Date.now().toString());
       this.publicationsService.uploadImage(formData)
        .subscribe(data =>{
          this.errorMsg  = "";
          this.inputVar.nativeElement.value = "";
          this.publicationsService.dispatchImageUploaded(+this.photos.length + 1)
          
        }
        , error => this.handleError(error)); 
    }

  }

  handleError(error):void{
    console.error(error.error.msg);
    this.errorMsg = error.error.msg  != undefined ? error.error.msg : "format incorrect!";;
    this.inputVar.nativeElement.value = "";

  }


  refresh(data):void{
    this.publicationsService.getAllPublicationsById(this.id).subscribe((data:Publication[]) => this.photos = data);
    this.publicationsService.dispatchNumberOfPhotos(+this.photos.length +1);
  }

  goTo(idImg, idUser):void{
    this.router.navigate([`publication-detail/${idUser}/${idImg}`]);
    
  }


  
   getLikes(data):void{
     this.publicationsService.getHowManyLike().subscribe((likes:any[]) => {
       this.likes = likes;
       this.photos = this.addLikesToPublications(data);
       this.publicationsService.dispatchNumberOfPhotos(+this.photos.length);
     });
   }
 
   addLikesToPublications(data:any[]):Publication[]{
     let result = [...data];
     this.likes.map(el =>{
       let index = result.map(e => e.id_publications).indexOf(el.id_publications);
       if(index !== -1){
        result[index].likes = el.likes;
       }
     });
     return result;
   }

   
}
