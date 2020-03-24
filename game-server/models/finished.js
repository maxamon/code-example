'use strict';
module.exports = (sequelize, DataTypes) => {
    const Finished = sequelize.define('Finished', {
        finished: DataTypes.BOOLEAN
    }, {underscored: true});
    Finished.associate = function(models) {
        // associations can be defined here
        Finished.belongsTo(models.Story);
        Finished.belongsTo(models.User);
    };
    return Finished;
};
