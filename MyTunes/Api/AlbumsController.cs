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
    public class AlbumsController : ApiController
    {
        [Route("api/albums")]
        public IEnumerable<Album> GetAlbums()
        {
            var albumCollection = DatabaseHelper.GetAlbumCollection();
            var albums = albumCollection.FindAll();

            return albums.ToArray();
        }

        [Route("api/album/{albumId}")]
        public Album GetAlbum(string albumId)
        {
            var albumCollection = DatabaseHelper.GetAlbumCollection();
            return albumCollection.FindOneById(ObjectId.Parse(albumId));
            //alternative: return albumCollection.AsQueryable().FirstOrDefault(album => album.Id == albumId);
        }

        [Route("api/album/{albumId}")]
        public void DeleteAlbum(string albumId)
        {
            var albumCollection = DatabaseHelper.GetAlbumCollection();
            var query = Query<Artist>.EQ(e => e.Id, albumId);
            var result = albumCollection.Remove(query);
            if (!result.Ok)
                throw new Exception(result.ErrorMessage);
        }

        [Route("api/album/")]
        public void PostAlbum(Album album)
        {
            var albumCollection = DatabaseHelper.GetAlbumCollection();
            var result = albumCollection.Save(album);
            if (!result.Ok)
                throw new Exception(result.ErrorMessage);
        }
    }
}
