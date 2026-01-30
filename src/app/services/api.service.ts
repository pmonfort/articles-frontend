import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { Comment, CommentCreate } from '../models/comment.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/articles`);
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/articles/${id}`);
  }

  createComment(comment: CommentCreate): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/comments`, { comment });
  }
}
