
import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses/courses.component';


export const appRoutes: Routes = [
  { path: '', component: CoursesComponent},
  { path: 'courses', component: CoursesComponent },
  { path: '**', redirectTo: 'courses', pathMatch: 'full' }
  
   
];
