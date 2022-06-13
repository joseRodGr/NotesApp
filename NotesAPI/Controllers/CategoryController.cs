using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NotesAPI.Dtos;
using NotesAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var response = await _categoryService.GetCategoriesResponseAsync();
            return Ok(response.Content);
        }

        [HttpGet("{id}", Name = "GetCategory")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CategoryDto>> GetCategory(int id)
        {
            var response = await _categoryService.GetCategoryResponseAsync(id);

            if (response.IsSuccessful) return Ok(response.Content);

            return NotFound(response.Message);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CategoryDto>> CreateCategory(CreateCategoryDto createCategoryDto)
        {
            var response = await _categoryService.GetCreateCategoryResponseAsync(createCategoryDto);

            if (response.IsSuccessful) return CreatedAtRoute(nameof(GetCategory), new { id = response.Content.CategoryId }, response.Content);

            return BadRequest(response.Message);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> EditCategory([FromRoute]int id, EditCategoryDto editCategoryDto)
        {
            var response = await _categoryService.GetEditCategoryResponseAsync(id, editCategoryDto);

            if (response.IsSuccessful) return NoContent();

            return NotFound(response.Message);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var response = await _categoryService.GetDeleteCategoryResponseAsync(id);

            if (response.IsSuccessful) return NoContent();

            return BadRequest(response.Message);
        }


    }
}
