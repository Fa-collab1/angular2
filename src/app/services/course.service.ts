import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
  code: string;
  coursename: string;
  progression: string;
  syllabus: string;
  [key: string]: string;
}

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = 'https://webbutveckling.miun.se/files/ramschema_ht23.json';
  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }
}
