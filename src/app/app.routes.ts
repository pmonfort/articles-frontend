import { Routes } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: ArticleListComponent },
  { path: 'articles/new', loadComponent: () => import('./components/article-form/article-form.component').then(m => m.ArticleFormComponent) },
  { path: 'articles/:id', loadComponent: () => import('./components/article-detail/article-detail.component').then(m => m.ArticleDetailComponent) },
];
