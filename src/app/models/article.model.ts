import { Comment } from './comment.model';

export interface Article {
  id: number;
  title: string;
  body: string;
  author_name: string;
  created_at: string;
  comments_count?: number;
  comments?: Comment[];
}

export interface ArticleCreate {
  title: string;
  body: string;
  author_name: string;
}
