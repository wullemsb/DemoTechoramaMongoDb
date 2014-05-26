conn = new Mongo();
db = conn.getDB('mytunes');

db.dropDatabase();

db.createCollection('artist');

var beatlesArtistId = new ObjectId();
var beachBoysArtistId = new ObjectId();
var bobDylanArtistId = new ObjectId();

db.artist.insert([{ _id: beatlesArtistId, name: 'The Beatles', imageName: "Revolver.jpg" },
				{ _id: beachBoysArtistId, name: 'The Beach Boys', imageName: "PetSoundsCover.jpg" },
                { _id: bobDylanArtistId, name: 'Bob Dylan', imageName: "330px-Bob_Dylan_-_Highway_61_Revisited.jpg" }]);

var sgtPeppersAlbum = {
    title: "Sgt. Pepper's Lonely Hearts Club Band",
    artist: 'The Beatles',
    artistId: beatlesArtistId,
    unitPrice: 9.99,
    imageName: "Sgt._Pepper's_Lonely_Hearts_Club_Band.jpg",
    tracks: [{ no: 1, name: "Sgt. Pepper's Lonely Hearts Club Band", unitPrice: 1.29, popularity: 4 },
				{ no: 2, name: "With a Little Help from My Friends", unitPrice: 1.29, popularity: 4 },
				{ no: 3, name: "Lucy in the Sky with Diamonds", unitPrice: 1.29, popularity: 4 },
				{ no: 4, name: "Getting Better", unitPrice: 1.29, popularity: 1 },
				{ no: 5, name: "Fixing a Hole", unitPrice: 1.29, popularity: 1 },
				{ no: 6, name: "She's Leaving Home", unitPrice: 1.29, popularity: 3 },
				{ no: 7, name: "Being for the Benefit of Mr. Kite!", unitPrice: 1.29, popularity: 1 },
				{ no: 8, name: "Within You Without You", unitPrice: 1.29, popularity: 1 },
				{ no: 9, name: "When I'm Sixty-Four", unitPrice: 1.29, popularity: 5 },
				{ no: 10, name: "Lovely Rita", unitPrice: 1.29, popularity: 3 },
				{ no: 11, name: "Good Morning Good Morning", unitPrice: 1.29, popularity: 1 },
				{ no: 12, name: "Sgt. Pepper's Lonely Hearts Club Band (Reprise)", unitPrice: 1.29, popularity: 1 },
				{ no: 13, name: "A Day in the Life", unitPrice: 1.29, popularity: 5 },
    ]
};

var petSoundsAlbum = {
    title: "Pet Sounds",
    artist: 'The Beach Boys',
    artistId: beachBoysArtistId,
    unitPrice: 9.99,
    imageName: "PetSoundsCover.jpg",
    tracks: [{ no: 1, name: "Wouldn't It Be Nice", unitPrice: 0.99, popularity: 5 },
				{ no: 2, name: "You Still Believe in Me", unitPrice: 0.99, popularity: 0 },
				{ no: 3, name: "That's Not Me", unitPrice: 0.99, popularity: 0 },
				{ no: 4, name: "Don't Talk (Put Your Head on My Shoulder)", unitPrice: 0.99, popularity: 0 },
				{ no: 5, name: "I'm Waiting for the Day", unitPrice: 0.99, popularity: 0 },
				{ no: 6, name: "Let's Go Away for Awhile", unitPrice: 0.99, popularity: 0 },
				{ no: 7, name: "Sloop John B", unitPrice: 0.99, popularity: 3 },
				{ no: 8, name: "God Only Knows", unitPrice: 0.99, popularity: 5 },
				{ no: 9, name: "I Know There's an Answer", unitPrice: 0.99, popularity: 0 },
				{ no: 10, name: "Here Today", unitPrice: 0.99, popularity: 0 },
				{ no: 11, name: "I Just Wasn't Made for These Times", unitPrice: 0.99, popularity: 0 },
				{ no: 12, name: "Pet Sounds", unitPrice: 0.99, popularity: 0 },
				{ no: 13, name: "aroline, No", unitPrice: 0.99, popularity: 0 },
    ]
};

var revolverAlbum = {
    title: "Revolver",
    artist: 'The Beatles',
    artistId: beatlesArtistId,
    unitPrice: 9.99,
    imageName: "Revolver.jpg",
    tracks: [{ no: 1, name: "Taxman", unitPrice: 1.29, popularity: 2 },
				{ no: 2, name: "Eleanor Rigby", unitPrice: 1.29, popularity: 5 },
				{ no: 3, name: "Love You To", unitPrice: 1.29, popularity: 2 },
				{ no: 4, name: "Here, There and Everywhere", unitPrice: 1.29, popularity: 4 },
				{ no: 5, name: "Yellow Submarine", unitPrice: 1.29, popularity: 4 },
				{ no: 6, name: "She Said She Said", unitPrice: 1.29, popularity: 3 },
				{ no: 7, name: "Good Day Sunshine", unitPrice: 1.29, popularity: 2 },
				{ no: 8, name: "For No One", unitPrice: 1.29, popularity: 3 },
				{ no: 9, name: "I Want to Tell You", unitPrice: 1.29, popularity: 1 },
                { no: 10, name: "Got to Get You into My Life", unitPrice: 1.29, popularity: 4 },
				{ no: 11, name: "Tomorrow Never Knows", unitPrice: 1.29, popularity: 3 },
    ]
};

var highway61RevisitedAlbum = {
    title: "Highway 61 Revisited",
    artist: 'Bob Dylan',
    artistId: bobDylanArtistId,
    unitPrice: 9.99,
    imageName: "330px-Bob_Dylan_-_Highway_61_Revisited.jpg",
    tracks: [{ no: 1, name: "Like a Rolling Stone", unitPrice: 1.29, popularity: 5 },
				{ no: 2, name: "Tombstone Blues", unitPrice: 0.99, popularity: 3 },
				{ no: 3, name: "It Takes a Lot to Laugh, It Takes a Train to Cry", unitPrice: 0.99, popularity: 3 },
				{ no: 4, name: "From a Buick 6", unitPrice: 0.99, popularity: 2 },
				{ no: 5, name: "Ballad of a Thin Man", unitPrice: 0.99, popularity: 3 },
				{ no: 6, name: "Queen Jane Approximately", unitPrice: 1.29, popularity: 2 },
				{ no: 7, name: "Highway 61 Revisited", unitPrice: 0.99, popularity: 5 },
				{ no: 8, name: "Just Like Tom Thumb's Blues", unitPrice: 0.99, popularity: 4 },
				{ no: 9, name: "Desolation Row", unitPrice: 0.99, popularity: 1 },
    ]
};

var albums = [sgtPeppersAlbum, petSoundsAlbum, revolverAlbum, highway61RevisitedAlbum];

db.createCollection('album');

db.album.insert(albums);


