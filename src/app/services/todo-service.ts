import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { TodoModel } from '../models/todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private collectionName = 'todos';

  constructor(private firestore: Firestore) {}

  async createItem(data: TodoModel): Promise<void> {
    const itemsCollection = collection(this.firestore, this.collectionName);
    await addDoc(itemsCollection, data);
  }

  async updateItem(id: string, data: any): Promise<void> {
    const itemRef = doc(this.firestore, `${this.collectionName}/${id}`);
    await updateDoc(itemRef, data);
  }

  async deleteItem(id: string): Promise<void> {
    const itemRef = doc(this.firestore, `${this.collectionName}/${id}`);
    await deleteDoc(itemRef);
  }

  getItemById(id: string): Observable<any> {
    const itemRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(itemRef, { idField: 'id' });
  }

  getItems(): Observable<any[]> {
    const itemsCollection = collection(this.firestore, this.collectionName);
    return collectionData(itemsCollection, { idField: 'id' });
  }

}
