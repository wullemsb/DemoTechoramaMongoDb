using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MyTunes.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web.Http;

namespace MyTunes.Api
{
    public class ImagesController : ApiController
    {
        [Route("api/image/{id}")]
        public object Get(string id)
        {
            var database = DatabaseHelper.GetDatabase();
            var file = database.GridFS.FindOneById(new BsonObjectId(new ObjectId(id)));

            var stream = file.OpenRead();
            var result = Request.CreateResponse();
            result.Content = new StreamContent(stream);
            if (!string.IsNullOrWhiteSpace(file.ContentType))
            {
                result.Content.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
            }
            return result;
        }

        [Route("api/image")]
        public async Task<object> Post()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            var streamProvider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(streamProvider);

            var files = new List<byte[]>();
            var database = DatabaseHelper.GetDatabase();

            var item = streamProvider.Contents.Single();
            var result = database.GridFS.Upload(await item.ReadAsStreamAsync(), Guid.NewGuid().ToString());
            return new { id = result.Id.ToString() };
        }
    }
}
