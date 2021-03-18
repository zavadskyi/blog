import { AlertService } from './../shared/services/alert.service';
import { Post } from './../../shared/interfaces';
import { PostsService } from './../../shared/posts.service';
import { AuthService } from '../shared/services/auth.services';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchStr: string =''

  constructor(private postsService: PostsService, private alertService: AlertService) { }


  ngOnInit(): void {
   this.pSub = this.postsService.getAll().subscribe(posts=>{
      this.posts = posts;
    })
  }

  ngOnDestroy(): void {
    if(this.pSub){
      this.pSub.unsubscribe()
    }

    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }

  remove(id: string){
    this.dSub = this.postsService.remove(id).subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id)
        this.alertService.warning('Post was removed')
    })
  }



}
