import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter, startWith } from 'rxjs/operators';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
    });

    this.searchTerm$
      .pipe(
        startWith(''),
        debounceTime(2000),
        distinctUntilChanged(),
        filter(term => term.length === 0 || term.length >= 2),
        switchMap(term => this.filterUsers(term))
      )
      .subscribe(filtered => {
        this.filteredUsers = filtered;
      });
  }

  onSearch(event: any) {
    this.searchTerm$.next(event.target.value);
  }

  private filterUsers(term: string) {
    if (!term) {
      return of([...this.users]);
    }
    const lowerTerm = term.toLowerCase();
    return of(
      this.users.filter(user =>
        user.name.toLowerCase().includes(lowerTerm) ||
        user.username.toLowerCase().includes(lowerTerm) ||
        user.email.toLowerCase().includes(lowerTerm)
      )
    );
  }
}
