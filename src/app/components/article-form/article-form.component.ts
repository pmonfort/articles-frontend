import { Component } from '@angular/core';
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
  article: ArticleCreate = {
    title: '',
    body: '',
    author_name: ''
  };
  submitting = false;
  errorMsg = '';

  constructor(private api: ApiService, private router: Router) {}

  onSubmit(): void {
    if (this.submitting) return;

    this.submitting = true;
    this.errorMsg = '';

    this.api.createArticle(this.article).subscribe({
      next: (created) => {
        this.router.navigate(['/articles', created.id]);
      },
      error: (err) => {
        this.submitting = false;
        // API returns { errors: [...] } on validation failure
        if (err.error?.errors) {
          this.errorMsg = err.error.errors.join(', ');
        } else {
          this.errorMsg = 'Something went wrong. Please try again.';
        }
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/articles']);
  }
}
