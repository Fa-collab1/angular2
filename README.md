# Course Overview Application (My 2nd Angular Application)
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.
This project is set-up for automatic deployment on [Netlify](https://dynamic-phoenix-4e27ce.netlify.app/).

## Project Overview
This Angular application is designed to help users view, search, and sort a list of courses for Webbutvecklingsprogrammet at MiUn. 
It fetches data from an external source.

## Features

- **View Courses**: Display a list of courses fetched from an external API.
- **Search Functionality**: Users can filter the data (name and code fields).
- **Sorting Capability**: Allows alphabetic sorting of courses by name, code, progression.

## Technology Stack

- **Frontend**: Angular
- **Styling**: SCSS

### Key Features of the  CourseService : 
 
1. **HTTP Client Usage**: Utilizes Angular's  HttpClient  to perform HTTP requests. 
2. **Observable Data Handling**: Returns an  Observable  of an array of  Course  objects, leveraging RxJS to handle asynchronous data streams. 
3. **Service Method -  getCourses() **: 
   - Fetches data from the API using  HttpClient.get<Course[]>(this.apiUrl) . 
   - The method is designed to return an  Observable  array of  Course  objects, allowing components to subscribe to this data and react to changes over time.

### Integration in Component: 
 
In  courses.component.ts, the  CourseService  is injected into the  CoursesComponent : 
 
- **Data Fetching**: Inside the constructor,  loadCourses()  is called to fetch course data immediately when the component is instantiated. 
- **Data Subscription**: The component subscribes to the data returned by  getCourses() , processes it to transform course codes to uppercase, and filters based on a search term. 
- **Error Handling**: Errors in fetching data are handled by setting an error message which can be displayed in the component's template. 
 
### Display in Template: 
 
The  courses.component.html template uses Angular's structural directives to conditionally display data: 
 
- **Conditional Rendering**: Uses  *ngIf  to check if there are courses to display or if an error message should be shown. 
- **Data Binding**: Implements two-way data binding with  [(ngModel)]  for the search term and displays courses using  *ngFor  to iterate over  filteredCourses . 
 
### Conclusion: 
 
CourseService fetches course data which is then displayed in the  CoursesComponent . This component allows for interaction such as searching and sorting courses.

## Setup and Installation

Ensure you have [Node.js](https://nodejs.org/) and [Angular CLI](https://angular.io/cli) installed.

Clone the repository:
bash 
git clone https://github.com/Fa-collab1/angular2.git 
cd course-management-system
Install dependencies:
bash 
npm install
Run the application:
bash 
ng serve
Navigate to `http://localhost:4200/` to view the application.

## Usage

Once the application is running:
- The main page displays a list of all courses.
- Use the search bar to filter courses by name or code.
- Click on column headers in the course table to sort the data.

## License

This project is licensed under the [MIT License](LICENSE).

---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
