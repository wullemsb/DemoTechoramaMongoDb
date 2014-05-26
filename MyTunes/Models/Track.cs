using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyTunes.Models
{
    public class Track
    {
        public int No { get; set; }
        public string Name { get; set; }
        public decimal UnitPrice { get; set; }
        public int Popularity { get; set; }
        public string Duration { get; set; }
    }
}