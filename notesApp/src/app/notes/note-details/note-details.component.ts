import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteDialogComponent } from 'src/app/_dialogs/delete-dialog/delete-dialog.component';
import { CanComponentleave } from 'src/app/_helpers/canComponentLeave';
import { validateAllFormControls } from 'src/app/_helpers/formHelpers';
import { Category } from 'src/app/_models/category';
import { Note } from 'src/app/_models/note';
import { CategoryService } from 'src/app/_services/category.service';
import { NoteService } from 'src/app/_services/note.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit, CanComponentleave {

  noteForm!: FormGroup;
  note!: Note;
  showOptions = false;
  categories!: Category[];
  noteCategory!: Category;

  constructor(private noteService: NoteService, private fb: FormBuilder,
    private route: ActivatedRoute, private categoryService: CategoryService,
    private router: Router, private dialog: MatDialog) { }


  canLeave(): boolean {
    if(this.noteForm.dirty){
      return confirm('You have some unsaved changes that will be lost if you decide to continue.' 
            + 'Are you sure you want to leave this page?');
    }
    return true;
  }

  ngOnInit(): void {
    this.loadNote();
    this.loadCategories();
    this.loadCurrentCategory();
    this.initializeForm();
  }

  initializeForm(){
    this.noteForm = this.fb.group({
      title: [this.note.title, Validators.required],
      body: [this.note.noteBody, Validators.required]
    });
  }

  openDeleteNoteDialog(){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {title: 'Delete Note', message: 'Are you sure you want to delete this note?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteNote();
        this.router.navigateByUrl(`/note-categories/${this.note.categoryId}`);
      }
    })
  }

  get title(){
    return this.noteForm.get('title');
  }

  get body(){
    return this.noteForm.get('body');
  }

  loadNote(){
    const routeId = this.route.snapshot.paramMap.get('id');
    if(routeId){
      this.noteService.getNote(Number(routeId)).subscribe(response => {
          this.note = response;
      })
    }
  }

  loadCurrentCategory(){
    const currentCategory = this.categories.find(c => c.categoryId == this.note.categoryId);
    if(currentCategory){
      this.noteCategory = currentCategory;
    }
  }

  switchOptions(){
    this.showOptions = !this.showOptions;
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
    })
  }

  deleteNote(){
    this.noteService.deleteNote(this.note.noteId);
  }

  moveNote(newCategory: Category){
    if(newCategory !== this.noteCategory){
      this.noteService.moveNote(this.note, newCategory);
      this.router.navigateByUrl(`/note-categories/${this.noteCategory.categoryId}`);
    }
  }

  editNote(){
    const noteDto = {title: this.title?.value, body: this.body?.value}
    this.noteService.editNote(this.note.noteId, noteDto);
  }

  submitForm(){
    if(this.noteForm.invalid){
      validateAllFormControls(this.noteForm);
    }else{
      this.editNote();
      this.noteForm.reset();
      this.router.navigateByUrl(`/note-categories/${this.noteCategory.categoryId}`);
    }
  }

}
