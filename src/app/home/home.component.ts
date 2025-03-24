import { Component, OnInit } from '@angular/core';
import { AddressBookService } from '../services/address-book.service';
import { Router } from '@angular/router';
import { AddressBook } from '../models/address-book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  contacts: AddressBook[] = [];  // Strong typing

  constructor(private addressBookService: AddressBookService, private router: Router) {}

  ngOnInit(): void {
    this.fetchContacts();
  }

  fetchContacts(): void {
    this.addressBookService.getAllContacts().subscribe(
      (data: AddressBook[]) => {  
        this.contacts = data;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
        alert('Failed to fetch contacts. Please try again later.');
      }
    );
  }

  editContact(id: number): void {
    this.router.navigate(['/edit-person', id]);
  }

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.addressBookService.deleteContact(id).subscribe(
        () => {
          console.log(`Deleted contact with ID: ${id}`);
          this.fetchContacts();  //  Refresh contact list after deletion
        },
        (error) => {
          console.error('Error deleting contact:', error);
          alert('Failed to delete contact. Please try again.');
        }
      );
    }
  }
}
