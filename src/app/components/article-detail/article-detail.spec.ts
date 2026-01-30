import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { ArticleDetailComponent } from './article-detail.component';

describe('ArticleDetailComponent', () => {
  let fixture: ComponentFixture<ArticleDetailComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleDetailComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ArticleDetailComponent);
  });

  afterEach(() => httpMock.verify());

  it('should load article and show comments', () => {
    fixture.detectChanges();

    httpMock.expectOne('http://localhost:3000/api/articles/1').flush({
      id: 1,
      title: 'My Article',
      body: 'Article content',
      author_name: 'Jane',
      created_at: '2024-01-15',
      comments: [{ id: 1, body: 'Nice post!', author_name: 'Reader', created_at: '2024-01-16' }]
    });
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('My Article');
    expect(text).toContain('Article content');
    expect(text).toContain('Jane');
    expect(text).toContain('Jan 15, 2024');
    expect(text).toContain('Comments (1)');
    expect(text).toContain('Nice post!');
    expect(text).toContain('Reader');
    expect(text).toContain('1/16/24');
  });
});
