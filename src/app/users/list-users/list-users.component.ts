import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: any[] = [];
  loading: boolean = true;
  searchTerm: string = '';

  constructor(private userService: UserService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response.data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.loading = false;
      }
    );
  }
  viewUser(userId: number) {
    this.router.navigate(['/users/profile', userId]);
}
navigateToCreate() {
  this.router.navigate(['/users/create']);
}
toggleActivation(userId: number): void {
  this.userService.activateUser(userId).subscribe(
    () => this.loadUsers(),
    () => {
      alert('Failed to toggle activation status.');
    }
  );
}

deleteUser(userId: number) {
  if (confirm('Are you sure you want to delete this user?')) {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.users = this.users.filter(user => user.id !== userId);
        this.snackBar.open('User deleted successfully', 'Close', {
          duration: 2000,
        });
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.snackBar.open('Error deleting user', 'Close', {
          duration: 2000,
        });
      }
    );
  }
}
logout() {
  // Clear authentication token
  localStorage.removeItem('authToken'); // Adjust if your token is stored differently
  // Navigate to login page
  this.router.navigate(['/login']);
}

  filterUsers(): any[] {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
