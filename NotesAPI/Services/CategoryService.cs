using AutoMapper;
using NotesAPI.Dtos;
using NotesAPI.Helpers;
using NotesAPI.Interfaces;
using NotesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotesAPI.Services
{
    public class CategoryService: ICategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CategoryService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ServerResponse<IEnumerable<CategoryDto>>> GetCategoriesResponseAsync()
        {
            var categoriesDto = await _unitOfWork.CategoryRepository.GetCategoriesAsync();
            return new ServerResponse<IEnumerable<CategoryDto>>
            {
                IsSuccessful = true,
                Message = null,
                Content = categoriesDto
            };
        }

        public async Task<ServerResponse<CategoryDto>> GetCategoryResponseAsync(int categoryId)
        {
            var category = await _unitOfWork.CategoryRepository.GetCategoryByIdAsync(categoryId);

            if(category == null)
            {
                return new ServerResponse<CategoryDto>
                {
                    IsSuccessful = false,
                    Message = "Category could not be found",
                    Content = null
                };
            }

            return new ServerResponse<CategoryDto>
            {
                IsSuccessful = true,
                Message = null,
                Content = _mapper.Map<CategoryDto>(category)
            };
        }

        public async Task<ServerResponse<CategoryDto>> GetCreateCategoryResponseAsync(CreateCategoryDto createCategoryDto)
        {
            var category = _mapper.Map<Category>(createCategoryDto);
            _unitOfWork.CategoryRepository.CreateCategory(category);

            if (await _unitOfWork.SaveAllAsync())
            {
                return new ServerResponse<CategoryDto>
                {
                    IsSuccessful = true,
                    Message = null,
                    Content = _mapper.Map<CategoryDto>(category)
                };
            }

            return new ServerResponse<CategoryDto>
            {
                IsSuccessful = false,
                Message = "Failed to create a new category",
                Content = null
            };
        }

        public async Task<ServerResponse<CategoryDto>> GetDeleteCategoryResponseAsync(int categoryId)
        {
            var category = await _unitOfWork.CategoryRepository.GetCategoryByIdAsync(categoryId);

            if(category == null)
            {
                return new ServerResponse<CategoryDto>
                {
                    IsSuccessful = false,
                    Message = "Category could not be found",
                    Content = null
                };
            }

            _unitOfWork.CategoryRepository.DeleteCategory(category);

            if(await _unitOfWork.SaveAllAsync())
            {
                return new ServerResponse<CategoryDto>
                {
                    IsSuccessful = true,
                    Message = null,
                    Content = null
                };
            }

            return new ServerResponse<CategoryDto>
            {
                IsSuccessful = false,
                Message = "Failed to delete the category",
                Content = null
            };
        }

        public async Task<ServerResponse<CategoryDto>> GetEditCategoryResponseAsync(int categoryId, EditCategoryDto editCategoryDto)
        {
            if(categoryId != editCategoryDto.CategoryId)
            {
                return new ServerResponse<CategoryDto>
                {
                    IsSuccessful = false,
                    Message = "Category could not be found",
                    Content = null

                };
            }

            var category = await _unitOfWork.CategoryRepository.GetCategoryByIdAsync(categoryId);
            if(category == null)
            {
                return new ServerResponse<CategoryDto>
                {
                    IsSuccessful = false,
                    Message = "Category could not be found",
                    Content = null
                };
            }

            _mapper.Map(editCategoryDto, category);

            _unitOfWork.CategoryRepository.EditCategory(category);

            if(await _unitOfWork.SaveAllAsync())
            {
                return new ServerResponse<CategoryDto>
                {
                    IsSuccessful = true,
                    Message = null,
                    Content = null
                };
            }

            return new ServerResponse<CategoryDto>
            {
                IsSuccessful = false,
                Message = "Failed to edit the category",
                Content = null
            };


        }
    }
}
