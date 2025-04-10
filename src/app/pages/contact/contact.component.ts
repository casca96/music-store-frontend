import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
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
    //creates contact form
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], //validates email address
      subject: ['', Validators.required], // checks the field is not empty
      message: ['', Validators.required]
    });

    this.loadContactInfo();
  }

  loadContactInfo(): void {
    this.apiService.getContactInfo().subscribe({
      next: (data) => {
        this.contactInfo = data;
      },
      error: (err) => {
        console.error('Error loading contact info:', err);
      }
    });
  }

  //after I submit immediatelly
  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    //calls backedn and sends data (contactForm.value)
    this.apiService.submitContactData(this.contactForm.value).subscribe({
      next: (response) => {
        this.success = true;
        //resets the form and sets submitted to to false
        this.contactForm.reset();
        this.submitted = false;
      },
      error: (error) => {
        this.error = error.error.error || 'An error occurred. Please try again.';
        console.error('Error submitting form:', error);
      }
    });
  }

  get f() { return this.contactForm.controls; }
}
