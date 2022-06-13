using NotesAPI.Dtos;
using NotesAPI.Helpers;
using NotesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotesAPI.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<CategoryDto>> GetCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(int categoryId);
        void CreateCategory(Category category);
        void EditCategory(Category category);
        void DeleteCategory(Category category);
    }
}
