import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/_dialogs/delete-dialog/delete-dialog.component';
import { Category } from 'src/app/_models/category';
import { Note } from 'src/app/_models/note';
import { UtilitiesService } from 'src/app/_services/utilities.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note!: Note;
  @Input() categories!: Category[];
  showOptions = false;
  isSelected = false;
  @Output() onSelectedBox = new EventEmitter<boolean>();
  @Output() onDeletedBox = new EventEmitter<Note>();
  @Output() onMovedBox = new EventEmitter<{noteItem: Note, categoryItem: Category}>();

  constructor(public utilities: UtilitiesService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDeleteNoteDialog(){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {title: 'Delete Note', message: 'Are you sure you want to delete this note?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteNote();
      }
    })
  }

  switchOptions(){
    this.showOptions = !this.showOptions;
  }

  toggleSelected(){
    this.isSelected = !this.isSelected;
    this.onSelectedBox.emit(this.isSelected);
  }

  deleteNote(){
    this.onDeletedBox.emit(this.note);
  }

  moveNote(newCategory: Category){
    this.onMovedBox.emit({noteItem: this.note, categoryItem: newCategory});
  }

}
