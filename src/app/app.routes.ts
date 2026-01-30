import { Routes } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: ArticleListComponent }
];
