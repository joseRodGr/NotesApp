using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotesAPI.Dtos
{
    public class NoteDto
    {
        public int NoteId { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime LastModified { get; set; }
        public int CategoryId { get; set; }
    }
}
