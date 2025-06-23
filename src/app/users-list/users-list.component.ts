import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, combineLatest, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter, startWith, map, shareReplay } from 'rxjs/operators';

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
  users$: Observable<User[]>;
  filteredUsers$!: Observable<User[]>;
  searchTerm$ = new Subject<string>();

  constructor(private http: HttpClient) {
    this.users$ = this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(shareReplay(1));
  }

  ngOnInit() {
    this.filteredUsers$ = combineLatest([
      this.users$,
      this.searchTerm$.pipe(
        startWith(''),
        debounceTime(2000),
        distinctUntilChanged(),
        filter(term => term.length === 0 || term.length >= 2)
      )
    ]).pipe(
      map(([users, term]) => {
        if (!term) return users;
        const lowerTerm = term.toLowerCase();
        return users.filter(user =>
          user.name.toLowerCase().includes(lowerTerm) ||
          user.username.toLowerCase().includes(lowerTerm) ||
          user.email.toLowerCase().includes(lowerTerm)
        );
      })
    );
  }

  onSearch(event: any) {
    this.searchTerm$.next(event.target.value);
  }
}
