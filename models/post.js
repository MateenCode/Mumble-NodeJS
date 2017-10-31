'use strict';
module.exports = (sequelize, DataTypes) => {
  var post = sequelize.define('post', {
    postedby: DataTypes.STRING,
    body: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
    likedby: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return post;
};
