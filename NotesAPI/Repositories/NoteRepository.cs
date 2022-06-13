using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using NotesAPI.Data;
using NotesAPI.Dtos;
using NotesAPI.Interfaces;
using NotesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotesAPI.Repositories
{
    public class NoteRepository : INoteRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public NoteRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public void CreateNote(Note note)
        {
            _context.Add(note);
        }

        public void DeleteNote(Note note)
        {
            _context.Notes.Remove(note);
        }

        public void EditNote(Note note)
        {
            _context.Attach(note);
            _context.Entry(note).State = EntityState.Modified;
        }

        public async Task<Note> GetNoteByIdAsync(int noteId)
        {
            return await _context.Notes
                .FirstOrDefaultAsync(n => n.NoteId == noteId);
            
        }

        public async Task<IEnumerable<NoteDto>> GetNotesAsync()
        {
            return await _context.Notes
                .ProjectTo<NoteDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}
