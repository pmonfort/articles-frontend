import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ArticleListComponent } from './article-list.component';

describe('ArticleListComponent', () => {
  let fixture: ComponentFixture<ArticleListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ArticleListComponent);
  });

  afterEach(() => httpMock.verify());

  it('should load and display articles', () => {
    fixture.detectChanges();

    httpMock.expectOne('http://localhost:3000/api/articles').flush([
      { id: 1, title: 'Test Post', body: 'content', author_name: 'John', created_at: '2024-01-01', comments_count: 5 }
    ]);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h2')?.textContent).toContain('Test Post');
    expect(el.textContent).toContain('5 comments');
  });

  it('should handle empty state', () => {
    fixture.detectChanges();
    httpMock.expectOne('http://localhost:3000/api/articles').flush([]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No articles yet');
  });
});
