'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        text: DataTypes.STRING
    }, { underscored: true });
    Comment.associate = function(models) {
        Comment.belongsTo(models.Paragraph);
        Comment.belongsTo(models.User);
    };
    return Comment;
};
