import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressBookService } from './services/address-book.service';
import { AddressBook } from './models/address-book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  contacts: AddressBook[] = [];  // Use AddressBook model

  constructor(private router: Router, private addressBookService: AddressBookService) {}

  ngOnInit(): void {
    this.fetchContacts(); // Fetch contacts from API on load
  }

  fetchContacts(): void {
    this.addressBookService.getAllContacts().subscribe(
      (data: AddressBook[]) => {  //  Ensure strong typing
        this.contacts = data;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }

  showForm() {
    this.router.navigate(['/add-person']);
  }

  editContact(contact: AddressBook) {
    alert(`Editing details for ${contact.name}`);
    this.router.navigate(['/edit-person', contact.id]); // Navigate to edit page
  }

  deleteContact(contact: AddressBook) {
    if (!contact.id) return;

    const confirmed = confirm(`Are you sure you want to delete ${contact.name}?`);
    if (confirmed) {
      this.addressBookService.deleteContact(contact.id).subscribe(
        () => {
          this.fetchContacts(); //  Refresh list after deletion
          alert(`${contact.name} has been deleted.`);
        },
        (error) => {
          console.error('Error deleting contact:', error);
        }
      );
    }
  }
}
