import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  loading: boolean = true;
  error: string | null = null;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userId = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(userId).subscribe(
      (response) => {
        this.user = response.data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching user:', error);
        this.error = 'Failed to load user profile.';
        this.loading = false;
      }
    );
  }
  navigateToEdit(): void {
    this.router.navigate(['/users/edit', this.user.id]);
  }
}
