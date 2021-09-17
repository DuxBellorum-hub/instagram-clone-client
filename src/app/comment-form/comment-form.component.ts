import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { Comment } from './../models/comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  comment: Comment = { date: "", content: ""};
  idToSend: number ;

  constructor(private actRoute : ActivatedRoute, private commService : CommentService) { }
  
  @Input() id : number;

  ngOnInit(): void {
    if(this.id != undefined) this.idToSend = this.id;
    else this.idToSend = +this.actRoute.snapshot.params.id;

  }

  addComment():void{
    this.comment.date = Date.now().toString();
    if(this.comment.content != "" && this.idToSend != undefined){
      this.commService.addComment(this.idToSend, this.comment)
        .subscribe(data => this.handleSuccess(data)
        , err => console.error(err));
    }
  }

  handleSuccess(data): void{
    this.commService.dispatchNewComment(this.comment.date);
    this.comment.date = "";
    this.comment.content ="";
  }



}
