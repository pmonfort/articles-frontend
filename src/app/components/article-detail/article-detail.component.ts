import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Article } from '../../models/article.model';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-article-detail',
  imports: [RouterLink, DatePipe, CommentFormComponent],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent implements OnInit {
  article = signal<Article | null>(null);
  loading = signal(true);
  notFound = signal(false);
  error = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.fetchArticle();
  }

  fetchArticle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getArticle(id).subscribe({
      next: (article) => {
        this.article.set(article);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to fetch article:', err);
        this.loading.set(false);
        this.error.set('Could not load article. Please check if the API is running.');
      }
    });
  }

  onCommentAdded(): void {
    // reload to get updated comments
    this.fetchArticle();
  }
}
