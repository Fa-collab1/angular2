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
  if (this.sortKey !== key) {
    this.sortOrder = 'asc';  // Sätt standardordningen till 'asc' om en ny kolumn valts
    this.sortKey = key;  // Spara vilken kolumn som ska sorteras
  } else {
    // Om samma kolumn väljs igen, byt ordning
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  this.filteredCourses.sort((a, b) => {
    let valueA = a[key];
    let valueB = b[key];
    if (valueA < valueB) {
      return this.sortOrder === 'asc' ? -1 : 1;
    } else if (valueA > valueB) {
      return this.sortOrder === 'asc' ? 1 : -1;
    }
    return 0;  // Om värdena är lika, returnera 0
  });
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
