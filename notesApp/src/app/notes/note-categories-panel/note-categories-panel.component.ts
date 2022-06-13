import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from 'src/app/_dialogs/create-dialog/create-dialog.component';
import { Category } from 'src/app/_models/category';
import { CategoryService } from 'src/app/_services/category.service';
import { NoteService } from 'src/app/_services/note.service';

@Component({
  selector: 'app-note-categories-panel',
  templateUrl: './note-categories-panel.component.html',
  styleUrls: ['./note-categories-panel.component.css']
})
export class NoteCategoriesPanelComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService, public dialog: MatDialog,
    private noteService: NoteService ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  openDialogCreateCategory(){

    const newCategory: Category = 
    {
      categoryId:this.categoryService.getNextIndex(),
      name: '',
      description: '',
      color: '#eee'
    };

    const dialogRef = this.dialog.open(CreateDialogComponent, {
        data: {category: newCategory, title: 'New Category'}
    });

    dialogRef.afterClosed().subscribe(response => {
        if(response){
          this.createCategory(response);
        }  
    });
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe( response => {
      if(response){
        this.categories = response;
      }  
    });
  }

  deleteCategory(categoryId: number){
    this.categoryService.deleteCategory(categoryId);
    this.loadCategories();
  }

  createCategory(newCategory: Category){
    this.categoryService.addCategory(newCategory);
    this.loadCategories();
  }

  editCategory(editedCategory: Category){
    this.categoryService.editCategory(editedCategory);
    this.loadCategories();
  }

}
