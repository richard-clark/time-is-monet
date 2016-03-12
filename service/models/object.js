"use strict";

var Sequelize = require('sequelize');

module.exports = function (sequelize) {
	return sequelize.define('object', {
		objectid: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: false
		},
		objectnumber: {
			type: Sequelize.STRING
		},
		locationId: {
			type: Sequelize.INTEGER
		},
		imageFilename: {
			type: Sequelize.STRING
		},
		artistName1: {
			type: Sequelize.STRING
		},
		titleOfWork1: {
			type: Sequelize.STRING
		},
		date: {
			type: Sequelize.STRING
		},
		dateSearchBegin: {
			type: Sequelize.INTEGER
		},
		dateSearchEnd: {
			type: Sequelize.INTEGER
		},
		medium: {
			type: Sequelize.STRING
		},
		materials: {
			type: Sequelize.STRING
		},
		support: {
			type: Sequelize.STRING
		},
		dimensions: {
			type: Sequelize.STRING(2048)
		},
		galleryLocation: {
			type: Sequelize.STRING
		},
		geography: {
			type: Sequelize.STRING
		},
		latitude: {
			type: Sequelize.FLOAT
		},
		longitude: {
			type: Sequelize.FLOAT
		},
		creditLine: {
			type: Sequelize.STRING(2048)
		},
		pmaUrl: {
			type: Sequelize.STRING
		}
	});
}
