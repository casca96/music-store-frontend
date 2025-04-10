import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artists.component.html',
})
export class ArtistsComponent implements OnInit {
  artists: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getArtists().subscribe({
      next: (data) => {
        this.artists = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load artists. Please try again later.';
        this.loading = false;
        console.error('Error loading artists:', err);
      }
    });
  }
}
