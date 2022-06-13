
using System;
using System.ComponentModel.DataAnnotations;

namespace NotesAPI.Models
{
    public class Note
    {
        public int NoteId { get; set; }
        public string Title { get; set; }
        [Required]
        public string Body { get; set; }
        [Required]
        public DateTime LastModified { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
