const sequelize = require("../Database/Connection");
const ArtistsData = require("../Models/ArtistsData");

/**calculation of month
 *  diffrence since spotify
 * launch april 2006 and today */
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

/**getting data from database
 * and
 *  sending to the client. */
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
/**
 * updating payment status
 *
 * @param {*} _
 * @param {*} args
 * @returns Nothing;
 */
exports.updatePaymentStatus = (_, args) => {
  const id = args.paymentData.id;
  const status = args.paymentData.status;

  ArtistsData.update({ status: status }, { where: { id: id } })
    .then()
    .catch((err) => {
      console.log(err.message);
    });
};
/**
 *
 * @param {*} _
 * @param {*} args
 * @returns  Artist object
 */
exports.addArtist = async (_, args) => {
  const artist = args.artistInfo.artist;
  const rate = args.artistInfo.rate;

  let ARTIST;

  await ArtistsData.create({ artist: artist, rate: rate })
    .then((result) => {
      ARTIST = { ...result.dataValues, avgpayout: 0 };
    })
    .catch((err) => {
      console.log(err.message);

      ARTIST = { errorStatus: true, errorMessage: "Artist Already Exists" };
    });

  return ARTIST;
};

/**
 * deleting artist from database
 *
 * @param {*} _
 * @param {*} id
 */
exports.deleteArtist = (_, args) => {
  ArtistsData.destroy({ where: { id: args.artistId.id } })
    .then()
    .catch((err) => {
      console.log(err.message);
    });
};

exports.editArtist = async (_, args) => {
  let status;
  await ArtistsData.update(
    { artist: args.artistData.artist, rate: args.artistData.rate },
    { where: { id: args.artistData.id } }
  )
    .then(() => {
      status = { errorValue: false };
    })
    .catch((err) => {
      console.log(err.message);
      status = { errorValue: true };
    });

  return status;
};

exports.getPaymentStatus = async (_, args) => {
  let status;

  await ArtistsData.findOne({
    attributes: ["status"],
    where: { id: args.paymentId.id },
  })
    .then((data) => {
      status = { value: data.dataValues.status };
    })
    .catch((err) => {
      console.log(err.message);
    });

  return status;
};
