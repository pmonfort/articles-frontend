import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { EngagementOverview } from '../../models/engagement.model';

@Component({
  selector: 'app-engagement-overview',
  imports: [RouterLink],
  templateUrl: './engagement-overview.component.html',
  styleUrl: './engagement-overview.component.scss'
})
export class EngagementOverviewComponent implements OnInit {
  data = signal<EngagementOverview | null>(null);
  error = signal<string | null>(null);

  constructor(private api: ApiService, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.api.getEngagementOverview().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => this.data.set(res),
      error: (err) => {
        console.error(err);
        this.data.set(null);
        this.error.set('Failed to load engagement stats');
      }
    });
  }
}
