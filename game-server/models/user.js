'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        nick_name: DataTypes.STRING,
        type: DataTypes.STRING,
        email: DataTypes.STRING,
        login: DataTypes.STRING,
        password: DataTypes.STRING
    }, {underscored: true,});
    User.associate = function(models) {
        // associations can be defined here
        User.belongsToMany(models.Story, { through: models.Authors});
    };
    return User;
};
