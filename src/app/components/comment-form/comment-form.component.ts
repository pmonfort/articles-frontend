import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-comment-form',
  imports: [FormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss'
})
export class CommentFormComponent {
  @Input() articleId!: number;
  @Output() commentAdded = new EventEmitter<void>();

  authorName = '';
  body = '';
  saving = false;
  errorMsg = '';

  constructor(private api: ApiService) {}

  submit(): void {
    this.saving = true;
    this.errorMsg = '';

    this.api.createComment({
      article_id: this.articleId,
      author_name: this.authorName,
      body: this.body
    }).subscribe({
      next: () => {
        this.authorName = '';
        this.body = '';
        this.saving = false;
        this.commentAdded.emit();
      },
      error: () => {
        this.saving = false;
        this.errorMsg = 'Failed to post comment';
      }
    });
  }
}
