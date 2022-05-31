import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[] = [];
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { 
    this.addCategories();
  }

  private addCategories(){
    
    const seedCategories: Category[] = 
    [
      {categoryId: 1, name: 'category1', description: 'description1', color: '#F9FFA4'},
      {categoryId: 2, name: 'category2', description: 'description2', color: '#FFD59E'},
      {categoryId: 3, name: 'category3', description: 'description3', color: '#B4FF9F'} //,

    ];

    this.categories.push(...seedCategories);

  }

  getCategories(){
    if(this.categories.length > 0){
      return of(this.categories);
    }
    return this.http.get<Category[]>(this.baseUrl + 'category');
  }

  getCategory(categoryId: number){
    const category = this.categories.find(c => c.categoryId === categoryId);
    if(category) return of(category);
    return this.http.get<Category>(this.baseUrl + 'category/' + categoryId);
  }

  addCategory(newCategory: Category){
    this.categories.push(newCategory);
  }

  getNextIndex(){
    return this.categories.length + 1;
  }

  deleteCategory(categoryId: number){
    this.categories = this.categories.filter(c => c.categoryId !== categoryId);
    // this.http.delete(this.baseUrl + 'category/' + categoryId);
  }

  editCategory(categoryEdited: Category){
    const categoryToEdit = this.categories.find(c => c.categoryId == categoryEdited.categoryId);

    if(categoryToEdit){
      categoryToEdit.name = categoryEdited.name;
      categoryToEdit.description = categoryEdited.description;
      categoryToEdit.color = categoryEdited.color;
    }
    
    //this.http.put(this.baseUrl + 'category', {categoryEdited});
  }

}
