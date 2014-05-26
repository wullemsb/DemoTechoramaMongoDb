using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyTunes.Models
{
    public class Album
    {
        public string Id { get; set; }
        public string ImageName { get; set; }
        public string Title { get; set; }
        public string ArtistId { get; set; }
        public string[] ArtistIds { get; set; }
        public string ImageId { get; set; }
        public string Artist { get; set; }
        public decimal UnitPrice { get; set; }
        public List<Track> Tracks { get; set; }
    }
}