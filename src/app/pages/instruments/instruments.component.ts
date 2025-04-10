import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-instruments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instruments.component.html',
  styleUrl: './instruments.component.css'
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
    //listens
    this.apiService.getInstruments().subscribe({
      //on success
      next: (data) => {
        //store to instruments
        this.instruments = data;
        //extract from instruments
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
    //loops trough set of categories and stores unique
    this.instruments.forEach(instrument => {
      categorySet.add(instrument.category);
    });

    this.categories = Array.from(categorySet);
    //saves as an array to categories

  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;

    //validation for null cases
    if (category === '') {
      this.loadInstruments();
      return;
    }

    this.loading = true;

    //fetches data for selected category
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
