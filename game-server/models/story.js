'use strict';
module.exports = (sequelize, DataTypes) => {
    const Story = sequelize.define('Story', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        title: DataTypes.STRING,
        abstract: DataTypes.STRING,
        compiled_text: DataTypes.STRING
    }, { underscored: true });
    Story.associate = function(models) {
        Story.belongsToMany(models.User, { through: models.Authors});
    };
    return Story;
};
