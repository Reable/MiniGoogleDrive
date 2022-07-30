const { Users } = require("../db");
const { sendErrorValidate } = require("../utils/error");
const validateData = require("../utils/validate");
const uuid = require("uuid")

async function registration (req, res) { }

async function authorization (req, res) { }

async function getOne (req ,res) { }

async function remove () { }

async function banned () { }

module.exports = {
  getAll, registration, authorization, remove, banned, getOne
}