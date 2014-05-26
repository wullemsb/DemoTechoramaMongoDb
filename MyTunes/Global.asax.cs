using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MyTunes.Common;
using MyTunes.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace MyTunes
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            InitializeDatabaseMapping();
            //StoreImagesToDatabase();
        }

        //private void StoreImagesToDatabase()
        //{
        //    var database = DatabaseHelper.GetDatabase();

        //    var imagesPath = Server.MapPath("/images");
        //    foreach (var fileName in Directory.GetFiles(imagesPath))
        //    {
        //        //var newFileName = "D:\\new_Untitled.png";
        //        using (var fs = new FileStream(fileName, FileMode.Open))
        //        {
        //            //todo: use metadata instead of query on filename

        //            var query = Query.Matches("filename", new BsonRegularExpression(new Regex("\\\\" + Path.GetFileName(fileName) + "$", RegexOptions.IgnoreCase)));
        //            var file = database.GridFS.FindOne(query);

        //            if (file == null)
        //            {
        //                var gridFsInfo = database.GridFS.Upload(fs, fileName);
        //            }
        //        }
        //    }
        //}

        public static void InitializeDatabaseMapping()
        {
            BsonClassMap.RegisterClassMap<Album>(cm =>
            {
                cm.AutoMap();
                cm.IdMemberMap.SetRepresentation(BsonType.ObjectId);
                cm.IdMemberMap.SetIdGenerator(StringObjectIdGenerator.Instance);
                cm.MapProperty(c => c.ArtistId).SetElementName("artistId").SetRepresentation(BsonType.ObjectId);
                cm.MapProperty(c => c.ArtistIds).SetElementName("artistIds");
                cm.MapProperty(c => c.Artist).SetElementName("artist");
                cm.MapProperty(c => c.Title).SetElementName("title");
                cm.MapProperty(c => c.UnitPrice).SetElementName("unitPrice");
                cm.MapProperty(c => c.Tracks).SetElementName("tracks");
                cm.MapProperty(c => c.ImageName).SetElementName("imageName");
                cm.MapProperty(c => c.ImageId).SetElementName("imageId").SetRepresentation(BsonType.ObjectId);
            });

            BsonClassMap.RegisterClassMap<Artist>(cm =>
            {
                cm.AutoMap();
                cm.IdMemberMap.SetRepresentation(BsonType.ObjectId);
                cm.IdMemberMap.SetIdGenerator(StringObjectIdGenerator.Instance);
                cm.MapProperty(c => c.Name).SetElementName("name");
                cm.MapProperty(c => c.ImageName).SetElementName("imageName");
            });

            BsonClassMap.RegisterClassMap<Track>(cm =>
            {
                cm.AutoMap();
                cm.MapProperty(c => c.No).SetElementName("no");
                cm.MapProperty(c => c.Name).SetElementName("name");
                cm.MapProperty(c => c.UnitPrice).SetElementName("unitPrice");
                cm.MapProperty(c => c.Popularity).SetElementName("popularity");
                cm.MapProperty(c => c.Duration).SetElementName("duration");
            });
        }
    }
}
