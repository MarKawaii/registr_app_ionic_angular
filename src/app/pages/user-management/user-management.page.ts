import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
})
export class UserManagementPage implements OnInit {
  users: User[] = [];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  toggleUserStatus(user: User): void {
    user.status = !user.status;
    this.firebaseService.updateUserStatus(user)
      .then(() => {
        console.log('User status updated successfully');
      })
      .catch(error => {
        console.error('Error updating user status:', error);
      });
  }
  
}
