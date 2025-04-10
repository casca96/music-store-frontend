import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-instruments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instruments.component.html',
})
export class InstrumentsComponent implements OnInit {
  instruments: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  loading = false;
  error: string | null = null;

  constructor(
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadInstruments();
  }

  loadInstruments(): void {
    this.loading = true;
    this.apiService.getInstruments().subscribe({
      next: (data) => {
        //store to instruments
        this.instruments = data;
        this.extractCategories();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load instruments. Please try again later.';
        this.loading = false;
        console.error('Error loading instruments:', err);
      }
    });
  }

  extractCategories(): void {
    const categorySet = new Set<string>();
    this.instruments.forEach(instrument => {
      categorySet.add(instrument.category);
    });

    this.categories = Array.from(categorySet);
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;

    if (category === '') {
      this.loadInstruments();
      return;
    }

    this.loading = true;
    this.apiService.getInstrumentByCategory(category).subscribe({
      next: (data) => {
        this.instruments = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load instruments. Please try again later.';
        this.loading = false;
        console.error('Error loading instruments by category:', err);
      }
    });
  }
}
