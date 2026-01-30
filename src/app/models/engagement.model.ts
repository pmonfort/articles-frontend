import { Article } from './article.model';

export interface EngagementOverview {
  total_articles: number;
  total_comments: number;
  most_commented_articles: Article[];
}
