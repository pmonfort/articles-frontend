import { Component, OnInit, signal } from '@angular/core';
import { DatePipe, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-list',
  imports: [DatePipe, SlicePipe, RouterLink],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent implements OnInit {
  articles = signal<Article[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.api.getArticles().subscribe({
      next: (data) => {
        this.articles.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading articles:', err);
        this.error.set('Could not load articles. Please check if the API is running.');
        this.loading.set(false);
      }
    });
  }
}
