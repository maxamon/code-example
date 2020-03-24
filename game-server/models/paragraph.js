'use strict';
module.exports = (sequelize, DataTypes) => {
    const Paragraph = sequelize.define('Paragraph', {
        text: DataTypes.TEXT,
        freeze: DataTypes.BOOLEAN
    }, {underscored: true});
    Paragraph.associate = function(models) {
        // associations can be defined here
        Paragraph.belongsTo(models.Story);
        Paragraph.belongsTo(models.Authors);
        Paragraph.hasMany(models.Comment);
    };
    return Paragraph;
};
