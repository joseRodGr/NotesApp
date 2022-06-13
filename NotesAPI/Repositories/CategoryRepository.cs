using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using NotesAPI.Data;
using NotesAPI.Dtos;
using NotesAPI.Helpers;
using NotesAPI.Interfaces;
using NotesAPI.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NotesAPI.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CategoryRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public void CreateCategory(Category category)
        {
            _context.Add(category);
        }

        public void DeleteCategory(Category category)
        {
            _context.Categories.Remove(category);
        }

        public void EditCategory(Category category)
        {
            _context.Attach(category);
            _context.Entry(category).State = EntityState.Modified;
        }

        public async Task<IEnumerable<CategoryDto>> GetCategoriesAsync()
        {
            return await _context.Categories
                .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<Category> GetCategoryByIdAsync(int categoryId)
        {
            return await _context.Categories
                .FirstOrDefaultAsync(c => c.CategoryId == categoryId);

        }

    }
}
