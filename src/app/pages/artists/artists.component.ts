import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})
export class ArtistsComponent implements OnInit {
  artists: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private apiService: ApiService) { }

  //on initialization set it to:
  ngOnInit(): void {
    this.loading = true;
    // listener
    this.apiService.getArtists().subscribe({
      //on success
      next: (data) => {
        //adds data to array
        this.artists = data;
        //ain't loading because it finished loading
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load artists. Please try again later.';
        //loading false because unseccessfull
        this.loading = false;
        console.error('Error loading artists:', err);
      }
    });
  }
}
