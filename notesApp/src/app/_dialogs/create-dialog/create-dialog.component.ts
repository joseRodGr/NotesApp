import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/_models/category';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent implements OnInit {

  nameControl!: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {category: Category, title: string}) { 
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.nameControl = new FormControl('', Validators.required);
  }

  get name(){
    return this.nameControl;
  }

}
