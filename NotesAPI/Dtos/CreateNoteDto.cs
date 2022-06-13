using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NotesAPI.Dtos
{
    public class CreateNoteDto
    {

        public string Title { get; set; }
        [Required]
        public string Body { get; set; }
        public int CategoryId { get; set; }
    }
}
