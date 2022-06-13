import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';
import { Note } from '../_models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  baseUrl = environment.apiUrl;
  notes: Note[] = []

  constructor(private http: HttpClient) { 
    this.seedNotes();
  }

  getNotes(categoryId: number){
    if(this.notes.length > 0){
      return of(this.notes.filter(n => n.categoryId == categoryId));
    }
    return this.http.get<Note[]>(this.baseUrl + categoryId);
  }

  getNote(noteId: number){
    
    const existingNote = this.notes.find(n => n.noteId == noteId);
    if(existingNote) return of(existingNote);

    return this.http.get<Note>(this.baseUrl + `note/${noteId}`);
  }

  seedNotes(){
    const notesSeeded : Note[] = [
      {noteId: 1, title: 'Otorrinolaringologia de parangaricutirimicuaro', noteBody: 'body1', categoryId: 1},
      {noteId: 2, title: 'title2', noteBody: 'body2', categoryId: 1},
      {noteId: 3, title: 'title3', noteBody: 'body3', categoryId: 1},
      {noteId: 4, title: 'title4', noteBody: 'body4', categoryId: 1},
      {noteId: 5, title: 'title5', noteBody: 'body5', categoryId: 2},
      {noteId: 6, title: 'title6', noteBody: 'body6', categoryId: 2},
      {noteId: 7, title: 'title7', noteBody: 'body7', categoryId: 2},
      {noteId: 8, title: 'title8', noteBody: 'body8', categoryId: 2},
      {noteId: 9, title: 'title9', noteBody: 'body9', categoryId: 3},
      {noteId: 10, title: 'title10', noteBody: 'body10', categoryId: 3},
      {noteId: 11, title: 'title11', noteBody: 'body11', categoryId: 3},
      {noteId: 12, title: 'title12', noteBody: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam nihil impedit iusto dignissimos voluptate minus provident iste ab sapiente expedita.', categoryId: 3}
    ];

    this.notes.push(...notesSeeded);
  }

  getNextIndex(){
    return this.notes.length + 1
  }

  addNote(newNote: Note){
    this.notes.push(newNote);
  }


  deleteNotes(notesToDelete: Note[]){
    
    this.notes = this.notes.filter(n => !notesToDelete.includes(n));
    // return this.http.delete(this.baseUrl + 'note', {body: notesIndexes});
  }

  deleteNote(noteId: number){
    this.notes = this.notes.filter(n => n.noteId !== noteId);
    // return this.http.delete(this.baseUrl + 'note/' + noteId);
  }

  moveNotes(notesToMove: Note[], newCategory: Category){

    notesToMove.forEach(n => {
      this.moveNote(n, newCategory);
    });

    //return this.http.put(this.baseUrl + 'note', {notesToMove, newCategory});

  }

  moveNote(noteToMove: Note, newCategory: Category){
    const index = this.notes.indexOf(noteToMove);
    this.notes[index].categoryId = newCategory.categoryId;
  }


  editNote(noteId: number, noteDto: {title: string, body: string}){
    const noteToEdit = this.notes.find(n => n.noteId === noteId);
    if(noteToEdit){
      noteToEdit.title = noteDto.title;
      noteToEdit.noteBody = noteDto.body;
    }
  }

}
