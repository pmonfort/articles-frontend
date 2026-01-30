export interface Comment {
  id: number;
  body: string;
  author_name: string;
  article_id: number;
  created_at: string;
}

export interface CommentCreate {
  body: string;
  author_name: string;
  article_id: number;
}
