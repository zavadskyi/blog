import { AlertService } from './../shared/services/alert.service';
import { Post } from './../../shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from './../../shared/posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit , OnDestroy{

  form: FormGroup;
  post:Post;
  submited = false;
  uSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alertService:AlertService
  ) { }

    ngOnDestroy(): void {
    if(this.uSub){
      this.uSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getPostById(params['id'])
      })).subscribe((post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text,Validators.required)
        })
      })
  }

  submit(){

    if(this.form.invalid){
      return;
    }

    this.submited = true;

    this.uSub = this.postsService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    }).subscribe(()=>{
      this.submited = false;
      this.alertService.success('Post was updated')
    })
  }
}
