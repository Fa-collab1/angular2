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
  imports: [CommonModule,FormsModule],
  providers: [CourseService]
})
export class CoursesComponent {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  error: string | null = null;
  searchTerm: string = '';
  sortKey: string = ''; 
  sortOrder: 'asc' | 'desc' = 'asc';


  constructor(private courseService: CourseService) {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
        next: (courses) => {
            this.courses = courses;
            this.filteredCourses = this.courses.map(course => ({
                ...course,
                code: course.code.toUpperCase()
            })).filter(course =>
                course.code.toUpperCase().includes(this.searchTerm.toUpperCase()) || course.coursename.toUpperCase().includes(this.searchTerm.toUpperCase())
            );
        },
        error: (err) => {
            this.error = 'Failed to load courses';
        }
    });
}

sort(key: string) {
  if (this.sortKey === key) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; 
      this.filteredCourses.reverse(); 
  } else {
      this.sortOrder = 'asc'; 
      this.sortKey = key; 
      this.filteredCourses.sort((a, b) => {
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

  filter(searchTerm: string) {
    this.filteredCourses = this.courses.filter(course =>
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) || course.coursename.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onSearchChange(): void {
    this.filter(this.searchTerm);
  }

}
