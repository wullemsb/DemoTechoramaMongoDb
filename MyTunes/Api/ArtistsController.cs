using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MyTunes.Common;
using MyTunes.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace MyTunes.Api
{
    public class ArtistsController : ApiController
    {
        [Route("api/artists")]
        public IEnumerable<Artist> GetArtists()
        {
            var artistCollection = DatabaseHelper.GetArtistCollection();

            var artists = artistCollection.FindAll().ToArray();

            return artists;
        }

        [Route("api/artist/{id}")]
        public Artist GetArtist(string id)
        {
            var artistCollection = DatabaseHelper.GetArtistCollection();
            var artist = artistCollection.FindOneById(ObjectId.Parse(id));
            return artist;
        }

        [Route("api/artist/{id}")]
        public void Delete(string id)
        {
            var artistCollection = DatabaseHelper.GetArtistCollection();
            var query = Query<Artist>.EQ(e => e.Id, id);
            var result = artistCollection.Remove(query);
            if (!result.Ok)
                throw new Exception(result.ErrorMessage);
        }

        [Route("api/artist/")]
        public void Post(Artist artist)
        {
            var artistCollection = DatabaseHelper.GetArtistCollection();
            var result = artistCollection.Save(artist);
            if (!result.Ok)
                throw new Exception(result.ErrorMessage);
        }

        [Route("api/nofalbumsbyartist")]
        [HttpPost]
        public IEnumerable<BsonDocument> GetNofAlbumsByArtist(IEnumerable<string> artistIds)
        {
            var match = new BsonDocument("$match",
                               new BsonDocument("artistId",
                                   new BsonDocument("$in",
                                       new BsonArray(artistIds.Select(artistId => ObjectId.Parse(artistId)))))
                            );

            var project = new BsonDocument("$project",
                new BsonDocument("artistId", 1)
                );

            var group = new BsonDocument("$group",
                new BsonDocument { 
                        { "_id", "$artistId" }, 
                        { "count", new BsonDocument ( "$sum", 1 ) 
                    } 
                }
            );

            var pipeline = new[] { match, project, group };

            var albumCollection = DatabaseHelper.GetAlbumCollection();
            var result = albumCollection.Aggregate(pipeline);
            return result.ResultDocuments;
        }
    }
}
