'use strict'
module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        customer_name: {
            type: DataTypes.STRING
        }
    }, {});
    return Burger;
}