const sequelize = require("../Database/Connection");
const ArtistsData = require("../Models/ArtistsData");

const monthDiff = () => {
  const spotifyLaunchDate = new Date();
  spotifyLaunchDate.setMonth(3);
  spotifyLaunchDate.setFullYear(2006);

  const todayDate = new Date();

  var months;
  months = (todayDate.getFullYear() - spotifyLaunchDate.getFullYear()) * 12;
  months -= spotifyLaunchDate.getMonth();
  months += todayDate.getMonth();
  return months <= 0 ? 0 : months;
};

exports.getData = async () => {
  let filteredData;

  await ArtistsData.findAll({
    attributes: [
      "id",
      "artist",
      "rate",
      "status",
      "streams",
      [sequelize.literal("(rate*streams)"), "totalpayment"],
    ],
    order: [["totalpayment", "DESC"]],
  })
    .then((data) => {
      filteredData = data.map((i) => {
        const data = i.dataValues;

        const averageMonthlyPayout = Math.floor(
          data.totalpayment / monthDiff()
        );

        return {
          id: data.id,
          artist: data.artist,
          rate: data.rate,
          streams: data.streams,
          status: data.status,
          avgpayout: averageMonthlyPayout,
        };
      });
    })
    .catch((err) => {
      console.log(err.message);
    });

  return filteredData;
};

exports.updatePaymentStatus = (_, args) => {
  const id = args.paymentData.id;
  const status = args.paymentData.status;

  ArtistsData.update({ status: status }, { where: { id: id } })
    .then(() => {
      return { value: true };
    })
    .catch((err) => {
      console.log(err.message);
      return { value: false };
    });
};


exports.addArtist = ()=>{


  
}