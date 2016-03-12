"use strict";

var Sequelize = require('sequelize');

module.exports = function (sequelize) {
	return sequelize.define('poi', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		objectId: {
			type: Sequelize.INTEGER
		},
		type: {
			type: Sequelize.STRING
		},
		userId: {
			type: Sequelize.INTEGER
		},
		locationX: {
			type: Sequelize.FLOAT
		},
		locationY: {
			type: Sequelize.FLOAT
		},
		text: {
			type: Sequelize.TEXT
		}
	});
}
