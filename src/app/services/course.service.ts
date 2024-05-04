import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Importerar Observable från RxJS som används för att hantera asynkron data.
import { Observable } from 'rxjs';

// Definierar ett interface för kursobjekt som definierar vilka fält varje kursobjekt ska ha.
export interface Course {
  code: string;
  coursename: string;
  progression: string;
  syllabus: string;
  [key: string]: string; //så att man kan lägga till fält vid behov
}

// Dekorerar klassen som Injectable så att den kan injiceras vid behov i hela applikationen.
@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = 'https://webbutveckling.miun.se/files/ramschema_ht23.json';
  constructor(private http: HttpClient) { }

  // Metod för att hämta kurser från API. Returtypen är en Observable som innehåller en array av kurser.
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }
}
