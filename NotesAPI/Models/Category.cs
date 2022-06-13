
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NotesAPI.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public ICollection<Note> Notes { get; set; }
    }
}
