using AutoMapper;
using NotesAPI.Data;
using NotesAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotesAPI.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private ICategoryRepository _categoryRepository;
        private INoteRepository _noteRepository;

        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public ICategoryRepository CategoryRepository
        {
            get
            {
                if(_categoryRepository == null)
                {
                    _categoryRepository = new CategoryRepository(_context, _mapper);
                }
                return _categoryRepository;
            }
        }

        public INoteRepository NoteRepository
        {
            get
            {
                if(_noteRepository == null)
                {
                    _noteRepository = new NoteRepository(_context, _mapper);
                }
                return _noteRepository;
            }
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
