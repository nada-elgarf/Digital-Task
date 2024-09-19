import { Component } from '@angular/core';
import { UserService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.css']
})
export class CreateUpdateUserComponent {
  user: any = {};
  loading: boolean = true;
  error: string | null = null;
  countries: any[] = [];
  isEditMode: boolean = false;
  selectedImage: File | null = null;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loadCountries();
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditMode = true;
      this.loadUserProfile(+userId);
    } else {
      this.isEditMode = false;
    }
  }

  loadUserProfile(userId: number): void {
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

  loadCountries(): void {
    this.userService.getAllCountries().subscribe(
      (response) => {
        this.countries = response.data;
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  isValidPhoneNumber(phone: string): boolean {
    const phonePattern = /^[0-9]{10,15}$/;
    return phonePattern.test(phone);
  }

  saveUser(): void {
    if (!this.isValidPhoneNumber(this.user.phone)) {
      alert('Please enter a valid phone number.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.user.name);
    formData.append('email', this.user.email);
    formData.append('phone', this.user.phone);
    formData.append('gender', this.user.gender);
    formData.append('country_id', this.user.country_id);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    if (this.isEditMode) {
      this.userService.editUser(this.user.id, formData).subscribe(
        (response) => {
          console.log('User updated:', response);
          alert('User updated successfully!');
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Error updating user:', error);
          alert('Failed to update user: ' + (error.error.message || 'Unknown error'));
        }
      );
    } else {
      this.userService.createUser(formData).subscribe(
        (response) => {
          console.log('User created:', response);
          alert('User created successfully!');
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Error creating user:', error);
          alert('Failed to create user: ' + (error.error.message || 'Unknown error'));
        }
      );
    }
  }

  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }
}
