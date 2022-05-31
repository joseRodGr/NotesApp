import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/_models/note';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  titleControl!: FormControl;
  bodyControl!: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Note, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.titleControl = new FormControl('', Validators.required);
    this.bodyControl = new FormControl('', Validators.required);
  }

  get title(){
    return this.titleControl;
  }

  get body(){
    return this.bodyControl;
  }

  controlsValid(){
    return this.titleControl.valid && this.bodyControl.valid;
  }

}
