import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryNotesComponent } from './notes/category-notes/category-notes.component';
import { NoteCategoriesPanelComponent } from './notes/note-categories-panel/note-categories-panel.component';
import { NoteDetailsComponent } from './notes/note-details/note-details.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'note-categories', component: NoteCategoriesPanelComponent},
  {path: 'note-categories/:id', component: CategoryNotesComponent},
  {path: ':category/note/:id', component: NoteDetailsComponent, canDeactivate: [PreventUnsavedChangesGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
