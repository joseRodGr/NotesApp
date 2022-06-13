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
    public class NoteController : ControllerBase
    {
        private readonly INoteService _noteService;

        public NoteController(INoteService noteService)
        {
            _noteService = noteService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<NoteDto>>> GetNotes()
        {
            var response = await _noteService.GetNotesResponseAsync();
            return Ok(response.Content);
        }

        [HttpGet("{id}", Name = "GetNote")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<NoteDto>> GetNote(int id)
        {
            var response = await _noteService.GetNoteResponseAsync(id);

            if (response.IsSuccessful) return Ok(response.Content);

            return NotFound(response.Message);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<NoteDto>> CreateNote(CreateNoteDto createNoteDto)
        {
            var response = await _noteService.GetCreateNoteResponseAsync(createNoteDto);

            if (response.IsSuccessful) return CreatedAtRoute(nameof(GetNote), new { id = response.Content.NoteId }, response.Content);

            return BadRequest(response.Message);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> EditNote([FromRoute]int id, EditNoteDto editNoteDto)
        {
            var response = await _noteService.GetEditNoteResponseAsync(id, editNoteDto);

            if (response.IsSuccessful) return NoContent();

            return NotFound(response.Message);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteNote(int id)
        {
            var response = await _noteService.GetDeleteNoteResponseAsync(id);

            if (response.IsSuccessful) return NoContent();

            return BadRequest(response.Message);
        }

    }
}
