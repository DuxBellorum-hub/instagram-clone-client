import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { Comment } from './../models/comment';

@Component({
  selector: 'app-comment-handle',
  templateUrl: './comment-handle.component.html',
  styleUrls: ['./comment-handle.component.scss']
})
export class CommentHandleComponent implements OnInit {

   comments: Comment[] = [];

  constructor(private commService : CommentService, private actRoute : ActivatedRoute) { }
  


  ngOnInit(): void {

    let id =  +this.actRoute.snapshot.params.id;
    this.commService.getComments(id)
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
      }, err => console.log(err));

      this.commService.handleNewComment().subscribe(data => this.commService.getComments(id).subscribe(data => this.comments = data));
  }





}
