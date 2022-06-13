using NotesAPI.Dtos;
using NotesAPI.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotesAPI.Interfaces
{
    public interface ICategoryService
    {
        Task<ServerResponse<IEnumerable<CategoryDto>>> GetCategoriesResponseAsync();
        Task<ServerResponse<CategoryDto>> GetCategoryResponseAsync(int categoryId);
        Task<ServerResponse<CategoryDto>> GetCreateCategoryResponseAsync(CreateCategoryDto createCategoryDto);
        Task<ServerResponse<CategoryDto>> GetEditCategoryResponseAsync(int categoryId, EditCategoryDto editCategoryDto);
        Task<ServerResponse<CategoryDto>> GetDeleteCategoryResponseAsync(int categoryId);

    }
}
