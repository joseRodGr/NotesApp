import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from 'src/app/_dialogs/create-dialog/create-dialog.component';
import { DeleteDialogComponent } from 'src/app/_dialogs/delete-dialog/delete-dialog.component';
import { Category } from 'src/app/_models/category';


@Component({
  selector: 'app-note-category',
  templateUrl: './note-category.component.html',
  styleUrls: ['./note-category.component.css']
})
export class NoteCategoryComponent implements OnInit {

  @Input() category!: Category;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<Category>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDeleteCategoryDialog(){
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      data: {title: 'Delete Category', message: "Are you sure you want to delete " + this.category.name + "? By deleting this category, the related notes will also be deleted."},
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteCategory();
      }
    })
  }

  openEditCategoryDialog(){

    const categoryItem: Category = {
      categoryId: this.category.categoryId,
      name: this.category.name,
      description: this.category.description,
      color: this.category.color
    };

    const dialogRef =  this.dialog.open(CreateDialogComponent,{
      data: {category: categoryItem, title: 'Edit Category'}
    });

    dialogRef.afterClosed().subscribe(response => {
      if(response){
        this.editCategory(response);
      }
    });
  }

  deleteCategory(){
    this.onDelete.emit(this.category.categoryId);
  }

  editCategory(categoryEdited: Category){
    this.onEdit.emit(categoryEdited);
  }

}
