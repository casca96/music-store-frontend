import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
})

export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  success = false;
  error: string | null = null;
  contactInfo: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    this.apiService.submitContactData(this.contactForm.value).subscribe({
      next: (response) => {
        this.success = true;
        this.contactForm.reset();
        this.submitted = false;
      },
      error: (error) => {
        this.error = error.error.error || 'An error occurred. Please try again.';
        console.error('Error submitting form:', error);
      }
    });
  }

  get form() { return this.contactForm.controls; }
}
