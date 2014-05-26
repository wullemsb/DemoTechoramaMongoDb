using MongoDB.Driver;
using MyTunes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyTunes.Common
{
    public class DatabaseHelper
    {
        public static MongoCollection<Album> GetAlbumCollection()
        {
            var database = GetDatabase();
            var collection = database.GetCollection<Album>("album");
            return collection;
        }

        public static MongoCollection<Artist> GetArtistCollection()
        {
            var database = GetDatabase();
            var collection = database.GetCollection<Artist>("artist");
            return collection;
        }

        public static MongoDatabase GetDatabase()
        {
            var connectionString = "mongodb://localhost:27017/mydb";
            MongoClient client = new MongoClient(connectionString);
            MongoServer server = client.GetServer();
            MongoDatabase database = server.GetDatabase("mytunes");
            return database;
        }
    }
}