import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { Article } from '../../models/article.model';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  imports: [DatePipe, CommentFormComponent],
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
    private api: ApiService,
    private destroyRef: DestroyRef,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.fetchArticle();
  }

  fetchArticle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getArticle(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (article) => {
        this.article.set(article);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching article:', err);
        if (err.status === 404) {
          this.loading.set(false);
          this.notFound.set(true);
        } else {
          this.loading.set(false);
          this.error.set('Could not load article. Please check if the API is running.');
        }
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  onCommentAdded(): void {
    // reload to get updated comments
    this.fetchArticle();
  }
}
