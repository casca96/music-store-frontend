import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { InstrumentsComponent } from './pages/instruments/instruments.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'artists', component: ArtistsComponent },
  { path: 'instruments', component: InstrumentsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: 'home' }
];
