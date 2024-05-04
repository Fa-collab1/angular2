import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../services/course.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [CourseService]
})
export class CoursesComponent {
  courses: Course[] = [];  // Håller en lista av kurser hämtade från API.
  filteredCourses: Course[] = [];  // Håller en filtrerad lista av kurser baserat på sökterm.
  error: string | null = null;  // Används för att visa felmeddelanden.
  searchTerm: string = '';  // Sökterm som används för att filtrera kurser.
  sortKey: string = '';  // Nyckeln som används för sortering.
  sortOrder: 'asc' | 'desc' = 'asc';  // Ordningen för sortering.

  // Konstruktor som injicerar CourseService och kallar på loadCourses metoden.
  constructor(private courseService: CourseService) {
    this.loadCourses();
  }

  // Metod för att hämta kurser från servern och initialisera kurserna och filtrerade kurser.
  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.filteredCourses = this.courses.map(course => ({
          ...course,
          code: course.code.toUpperCase() // Gör kurskoderna till versaler.
        })).filter(course => // Filtrera kurser baserat på sökterm.
          course.code.toUpperCase().includes(this.searchTerm.toUpperCase()) || course.coursename.toUpperCase().includes(this.searchTerm.toUpperCase())
        );
      },
      error: (err) => { // Hanterar fel från API-anrop.
        this.error = 'Failed to load courses';
      }
    });
  }

  // Sorterar de filtrerade kurserna baserat på angiven nyckel och ordning.
  sort(key: string) {
    if (this.sortKey === key) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Byter sortordning om samma nyckel sorteras igen.
      this.filteredCourses.reverse(); // Vänder på ordningen av listan.
    } else {
      this.sortOrder = 'asc';
      this.sortKey = key;
      this.filteredCourses.sort((a, b) => { // Utför sorteringen baserat på den valda nyckeln.
        if (a[key] < b[key]) {
          return this.sortOrder === 'asc' ? -1 : 1;
        } else if (a[key] > b[key]) {
          return this.sortOrder === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
  }
  // Filtrerar kurserna baserat på en sökterm.
  filter(searchTerm: string) {
    this.filteredCourses = this.courses.filter(course =>
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) || course.coursename.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Kallas när sökfältet ändras, för att filtrera listan igen.
  onSearchChange(): void {
    this.filter(this.searchTerm);
  }

}
