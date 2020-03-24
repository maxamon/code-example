'use strict';
module.exports = (sequelize) => {
    const Authors = sequelize.define('Authors', {}, {underscored: true});
    Authors.associate = function(models) {
        // associations can be defined here
        Authors.belongsTo(models.Story);
        Authors.belongsTo(models.User);
    };
    return Authors;
};
