using AutoMapper;
using NotesAPI.Dtos;
using NotesAPI.Helpers;
using NotesAPI.Interfaces;
using NotesAPI.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NotesAPI.Services
{
    public class NoteService : INoteService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public NoteService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ServerResponse<NoteDto>> GetNoteResponseAsync(int noteId)
        {
            var note = await _unitOfWork.NoteRepository
                .GetNoteByIdAsync(noteId);

            if (note == null)
            {
                return new ServerResponse<NoteDto>
                {
                    IsSuccessful = false,
                    Message = "Note could not be found",
                    Content = null
                };
            }

            return new ServerResponse<NoteDto>
            {
                IsSuccessful = true,
                Message = null,
                Content = _mapper.Map<NoteDto>(note)
            };
        }

        public async Task<ServerResponse<IEnumerable<NoteDto>>> GetNotesResponseAsync()
        {
            var notesDto = await _unitOfWork.NoteRepository
                .GetNotesAsync();

            return new ServerResponse<IEnumerable<NoteDto>>
            {
                IsSuccessful = true,
                Message = null,
                Content = notesDto
            };
        }

        public async Task<ServerResponse<NoteDto>> GetCreateNoteResponseAsync(CreateNoteDto createNoteDto)
        {
            var note = _mapper.Map<Note>(createNoteDto);
            note.LastModified = DateTime.Now;

            _unitOfWork.NoteRepository.CreateNote(note);

            if(await _unitOfWork.SaveAllAsync())
            {
                return new ServerResponse<NoteDto>
                {
                    IsSuccessful = true,
                    Message = null,
                    Content = _mapper.Map<NoteDto>(note)
                };
            }

            return new ServerResponse<NoteDto>
            {
                IsSuccessful = false,
                Message = "Failed to create a new note",
                Content = null
            };
               
        }

        public async Task<ServerResponse<NoteDto>> GetDeleteNoteResponseAsync(int noteId)
        {
            var note = await _unitOfWork.NoteRepository.GetNoteByIdAsync(noteId);

            if(note == null)
            {
                return new ServerResponse<NoteDto>
                {
                    IsSuccessful = false,
                    Message = "Note could note be found",
                    Content = null
                };
            }

            _unitOfWork.NoteRepository.DeleteNote(note);

            if(await _unitOfWork.SaveAllAsync())
            {
                return new ServerResponse<NoteDto>
                {
                    IsSuccessful = true,
                    Message = null,
                    Content = null
                };
            }

            return new ServerResponse<NoteDto>
            {
                IsSuccessful = false,
                Message = "Failed to delete the note",
                Content = null
            };
        }

        public async Task<ServerResponse<NoteDto>> GetEditNoteResponseAsync(int noteId, EditNoteDto editNoteDto)
        {
            if(noteId != editNoteDto.NoteId)
            {
                return new ServerResponse<NoteDto>
                {
                    IsSuccessful = false,
                    Message = "Note could not be found",
                    Content = null
                };
            }

            var note = await _unitOfWork.NoteRepository.GetNoteByIdAsync(noteId);

            if(note == null)
            {
                return new ServerResponse<NoteDto>
                {
                    IsSuccessful = false,
                    Message = "Note could not be found",
                    Content = null
                };
            }

            _mapper.Map(editNoteDto, note);
            note.LastModified = DateTime.Now;

            _unitOfWork.NoteRepository.EditNote(note);

            if(await _unitOfWork.SaveAllAsync())
            {
                return new ServerResponse<NoteDto>
                {
                    IsSuccessful = true,
                    Message = null,
                    Content = null
                };
            }

            return new ServerResponse<NoteDto>
            {
                IsSuccessful = false,
                Message = "Failed to update the note",
                Content = null
            };
        }


    }
}
