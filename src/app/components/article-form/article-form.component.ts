import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ArticleCreate } from '../../models/article.model';

@Component({
  selector: 'app-article-form',
  imports: [FormsModule],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss'
})
export class ArticleFormComponent {
  article = signal<ArticleCreate>({
    title: '',
    body: '',
    author_name: ''
  });
  submitting = signal(false);
  errorMsg = signal<string | null>(null);

  constructor(private api: ApiService, private router: Router) {}

  onSubmit(): void {
    if (this.submitting()) return;

    this.submitting.set(true);
    this.errorMsg.set(null);

    this.api.createArticle(this.article()).subscribe({
      next: (created) => {
        this.router.navigate(['/articles', created.id]);
      },
      error: (err) => {
        this.submitting.set(false);
        // API returns { errors: [...] } on validation failure
        if (err.error?.errors) {
          this.errorMsg.set(err.error.errors.join(', '));
        } else {
          this.errorMsg.set('Something went wrong. Please try again.');
        }
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/articles']);
  }
}
