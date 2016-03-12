"use strict";

var Sequelize = require('sequelize');

module.exports = function (sequelize) {
	return sequelize.define('ibeacon', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		locationId: {
			type: Sequelize.INTEGER
		},
		alias: {
			type: Sequelize.STRING
		}, 
		major: {
			type: Sequelize.INTEGER
		}, 
		minor: {
			type: Sequelize.INTEGER
		}
	});
}
