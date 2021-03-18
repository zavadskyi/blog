import { AlertService } from './../shared/services/alert.service';
import { PostsService } from './../../shared/posts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../shared/interfaces';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;

  text = 'dsds'
  constructor(
    private postsService: PostsService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
    })
  }
submit(){
  if(this.form.invalid){
    return;
  }

  const post: Post = {
    title: this.form.value.title,
    text: this.form.value.text,
    author: this.form.value.author,
    date: new Date()
  }

  this.postsService.create(post).subscribe(res =>{
    this.form.reset()
    this.alertService.success('Post was successfully created')
  })
}
}
