import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressBook } from '../models/address-book';

@Injectable({
  providedIn: 'root',
})
export class AddressBookService {
  private baseUrl = 'http://localhost:8080/addressbook';  //  Base API URL

  constructor(private http: HttpClient) {}

  //  Fetch all contacts (Fixing endpoint)
  getAllContacts(): Observable<AddressBook[]> {
    return this.http.get<AddressBook[]>(`${this.baseUrl}/showcontacts`);
  }

  //  Get contact by ID
  getContactById(id: number): Observable<AddressBook> {
    return this.http.get<AddressBook>(`${this.baseUrl}/getbyid/${id}`);
  }

  //  Create new contact
  createContact(contact: AddressBook): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, contact);
  }

  //  Update contact
  updateContact(id: number, contact: AddressBook): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, contact);
  }

  //  Delete contact
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
