using AutoMapper;
using NotesAPI.Dtos;
using NotesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotesAPI.Helpers
{
    public class AutomapperProfiles: Profile
    {
        public AutomapperProfiles()
        {
            CreateMap<Note, NoteDto>();
            CreateMap<CreateNoteDto, Note>();
            CreateMap<EditNoteDto, Note>();

            CreateMap<Category, CategoryDto>();
            CreateMap<CreateCategoryDto, Category>();
            CreateMap<EditCategoryDto, Category>();
        }
    }
}
