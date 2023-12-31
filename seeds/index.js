const mongoose = require("mongoose");
const Campground = require("../models/campground.js");
const cities = require("./cities.js");
const { places, descriptors } = require("./seedHelpers.js");
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/yelp-camp"

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async function () {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '64797ec9d87bcbe27107755f',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dbzrrl9ak/image/upload/v1701139674/YelpCamp/qra7nf3fuff60j7ipagd.jpg",
          filename : "cld-sample-5",
        },
        {
          url: "https://res.cloudinary.com/dbzrrl9ak/image/upload/v1701141618/scott-goodwill-y8Ngwq34_Ak-unsplash_yvtwmy.jpg",
          filename: "cld-sample-2"
        }
      ],
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ],
      },
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi sequi doloremque error ut possimus voluptatem, numquam sit, doloribus alias laudantium distinctio ipsa architecto nobis, molestiae quia consequatur cumque labore perspiciatis.",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  db.close();
});
