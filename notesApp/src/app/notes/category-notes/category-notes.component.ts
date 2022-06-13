import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateNoteComponent } from 'src/app/_dialogs/create-note/create-note.component';
import { DeleteDialogComponent } from 'src/app/_dialogs/delete-dialog/delete-dialog.component';
import { Category } from 'src/app/_models/category';
import { Note } from 'src/app/_models/note';
import { CategoryService } from 'src/app/_services/category.service';
import { NoteService } from 'src/app/_services/note.service';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'app-category-notes',
  templateUrl: './category-notes.component.html',
  styleUrls: ['./category-notes.component.css']
})
export class CategoryNotesComponent implements OnInit {

  notes: Note[] = [];
  categories: Category[] = [];
  noteCategory!: Category;
  allSelected = false;
  @ViewChildren(NoteComponent) noteBoxes!: QueryList<NoteComponent>;
  selectedBoxesCounter: number = 0;

  constructor(private noteService: NoteService, private route: ActivatedRoute
    , private dialog: MatDialog, private categoryService: CategoryService) { 
    
  }

  ngOnInit(): void {
    this.loadNotes();
    this.loadCategories();
    this.loadCategory();
  }

  openCreateNoteDialog(){
    
    const routeId = Number(this.route.snapshot.paramMap.get('id'));

    const newNote: Note = {
      noteId: this.noteService.getNextIndex(),
      title: '',
      noteBody: '',
      categoryId: routeId
      // categoryName: (this.noteCategory ? this.noteCategory.name : ''),
      // categoryColor: (this.noteCategory ? this.noteCategory?.color : '') 
    };

    const dialogRef = this.dialog.open(CreateNoteComponent, {
      data: newNote
    });

    dialogRef.afterClosed().subscribe(response => {
      if(response){
        this.noteService.addNote(response);
        this.loadNotes();
      }
    })
  }

  openDeleteNotesDialog(){
    const dialogRef =  this.dialog.open(DeleteDialogComponent, {
      data: {title: 'Delete notes', message: 'Are you sure you want to delete the note(s) selected?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteNotes();
      }
    })
  }


  loadNotes(){
    const categoryId = this.route.snapshot.paramMap.get('id');
    this.noteService.getNotes(Number(categoryId)).subscribe(response => {
      this.notes = response;
    });
  }

  loadCategory(){
    const routeId = Number(this.route.snapshot.paramMap.get('id'));
    const currentCategory = this.categories.find(c => c.categoryId == routeId);
    if(currentCategory){
      this.noteCategory = currentCategory;
    }
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
    })
  }

  switchAllSelected(){
    const lastStateAllSelected: boolean = this.allSelected;
    this.allSelected = !this.allSelected;

    if(lastStateAllSelected){
      this.deselectAllBoxes();
    }else{
      this.selectAllBoxes();
    }
  }

  selectAllBoxes(){
    this.noteBoxes.forEach(c => {
      if(!c.isSelected){
        c.toggleSelected();
      }
    });
  }

  deselectAllBoxes(){
    this.noteBoxes.forEach(c => {
      if(c.isSelected){
        c.toggleSelected();
      }
    });
  }

  verifySelectedBoxes(boxSelected: boolean){
    if(this.allSelected && !boxSelected){
      this.allSelected = false;
    }
    this.verifySelectedCounter(boxSelected);
  }

  verifySelectedCounter(boxSelected: boolean){
    boxSelected ? this.selectedBoxesCounter++ : this.selectedBoxesCounter--;
  }

  deleteNotes(){
    const notesToDelete = this.noteBoxes
          .filter(b => b.isSelected)
          .map(n => n.note);

    this.noteService.deleteNotes(notesToDelete);
    this.loadNotes();
  }

  deleteNote(note: Note){
    this.noteService.deleteNote(note.noteId);
    this.loadNotes();
  }


  moveNotes(newCategory: Category){
    if(newCategory !== this.noteCategory){
      const notesToMove =  this.noteBoxes
            .filter(b => b.isSelected).map(n => n.note);

      this.noteService.moveNotes(notesToMove, newCategory);
      this.loadNotes();
    }
  }

  moveNote(item: {noteItem: Note, categoryItem: Category}){
    if(item.categoryItem !== this.noteCategory){
      this.noteService.moveNote(item.noteItem, item.categoryItem);
      this.loadNotes();
    }
  }

}
