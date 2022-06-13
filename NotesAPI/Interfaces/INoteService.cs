using NotesAPI.Dtos;
using NotesAPI.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotesAPI.Interfaces
{
    public interface INoteService
    {
        Task<ServerResponse<IEnumerable<NoteDto>>> GetNotesResponseAsync();
        Task<ServerResponse<NoteDto>> GetNoteResponseAsync(int noteId);
        Task<ServerResponse<NoteDto>> GetCreateNoteResponseAsync(CreateNoteDto createNoteDto);
        Task<ServerResponse<NoteDto>> GetDeleteNoteResponseAsync(int noteId);
        Task<ServerResponse<NoteDto>> GetEditNoteResponseAsync(int noteId, EditNoteDto editNoteDto);
    }
}
