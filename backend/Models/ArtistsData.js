const { DataTypes } = require("sequelize");
const sequelize = require("../Database/Connection");

const ArtistsData = sequelize.define("ArtistsData", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
  streams: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  status:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false
  }
});

module.exports = ArtistsData;
