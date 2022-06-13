using NotesAPI.Dtos;
using NotesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotesAPI.Interfaces
{
    public interface INoteRepository
    {
        Task<IEnumerable<NoteDto>> GetNotesAsync();
        Task<Note> GetNoteByIdAsync(int noteId);
        void CreateNote(Note note);
        void EditNote(Note note);
        void DeleteNote(Note note);
          
    }
}
