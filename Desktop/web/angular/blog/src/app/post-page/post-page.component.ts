import { Post } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from './../shared/posts.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post>
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.post$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getPostById(params.id)
        })
      )
  }

}
