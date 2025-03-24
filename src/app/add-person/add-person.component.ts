import { Component } from '@angular/core';
import { AddressBookService } from '../services/address-book.service';
import { Router } from '@angular/router';
import { AddressBook } from '../models/address-book';  // Import model

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent {
  newPerson: AddressBook = {   //  Use AddressBook model
    id: 0,   // Optional if your backend auto-generates ID
    name: '',
    phone: ''
  };

  constructor(private addressBookService: AddressBookService, private router: Router) {}

  navigateBack(): void {
    this.router.navigate(['/']); //  Redirects to home page
  }

  addPerson(): void {
    if (!this.newPerson.name || !this.newPerson.phone) {  
      alert('All fields are required.');
      return;
    }

    this.addressBookService.createContact(this.newPerson).subscribe(
      () => {
        alert('Person added successfully!');
        this.router.navigate(['/']); // Redirect to Home Page after adding
      },
      (error) => {
        console.error('Error adding contact:', error);
        alert('Failed to add person.');
      }
    );
  }
}
