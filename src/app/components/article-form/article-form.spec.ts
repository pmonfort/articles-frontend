import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ArticleFormComponent } from './article-form.component';

describe('ArticleFormComponent', () => {
  let fixture: ComponentFixture<ArticleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleFormComponent);
    fixture.detectChanges();
  });

  it('should render form with all fields', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('input[name="title"]')).toBeTruthy();
    expect(el.querySelector('input[name="author_name"]')).toBeTruthy();
    expect(el.querySelector('textarea[name="body"]')).toBeTruthy();
    expect(el.querySelector('button[type="submit"]')).toBeTruthy();
  });
});
