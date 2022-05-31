import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './_modules/material/material.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoteCategoriesPanelComponent } from './notes/note-categories-panel/note-categories-panel.component';
import { NoteCategoryComponent } from './notes/note-category/note-category.component';
import { CategoryNotesComponent } from './notes/category-notes/category-notes.component';
import { NoteComponent } from './notes/note/note.component';
import { CreateDialogComponent } from './_dialogs/create-dialog/create-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateNoteComponent } from './_dialogs/create-note/create-note.component';
import { NoteDetailsComponent } from './notes/note-details/note-details.component';
import { DeleteDialogComponent } from './_dialogs/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NoteCategoriesPanelComponent,
    NoteCategoryComponent,
    CategoryNotesComponent,
    NoteComponent,
    CreateDialogComponent,
    CreateNoteComponent,
    NoteDetailsComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ColorPickerModule,
    FormsModule
  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
