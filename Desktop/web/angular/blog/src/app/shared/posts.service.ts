import { environment } from './../../environments/environment';
import { FbCreateResponse, Post } from './interfaces';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbUrl}/posts.json`, post)
      .pipe(map((res: FbCreateResponse) => {
        return { ...post, id: res.name, date: new Date(post.date) }
      }))
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbUrl}/posts.json`).pipe(
      map((res: { [key: string]: any }) => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }))

      })
    )
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get(`${environment.fbUrl}/posts/${id}.json`).pipe(map((post: Post) => {
      return { ...post, id, date: new Date(post.date) }
    }))
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbUrl}/posts/${id}.json`)
  }

  update(post: Post): Observable<Post>{
    return this.http.patch<Post>(`${environment.fbUrl}/posts/${post.id}.json`, post)
  }
}
