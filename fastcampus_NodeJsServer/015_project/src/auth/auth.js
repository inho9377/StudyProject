// @ts-check
const { v4: uuidv4 } = require('uuid')
const { signJWT } = require('./jwt')
const { getUsersCollection } = require('../mongo')
const bcrypt = require('bcrypt')

/**
 * @param {string} userId
 */
async function getAccessTokenForUserId(userId) {
  return signJWT(userId)
}

/**
 * @typedef Input
 * @property {string} platformUserId
 * @property {string} platform
 * @property {string} [nickname]
 * @property {string} [profileImageURL]
 */

/**
 * @typedef Output
 * @property {string} userId
 * @property {string} accessToken
 */

/**
 * @param {Input} param0
 * @returns {Promise<Output>}
 */
async function createUserOrLogin({
  platformUserId,
  platform,
  nickname,
  profileImageURL,
}) {
  const users = await getUsersCollection()

  const existingUser = await users.findOne({
    platform,
    platformUserId,
  })

  if (existingUser) {
    return {
      userId: existingUser.id,
      accessToken: await signJWT(existingUser.id),
    }
  }

  const userId = uuidv4()
  await userId.insertOne({
    id: userId,
    platformUserId,// 해당 플랫폼에서의 Id
    platform, //Kakao, facebook, naver
    nickname,
    profileImageURL,
    verified: true, // 인증은 OAuth 를 통하면 따로 필요가 없음

  })

  return {
    userId,
    accessToken: await signJWT(userId),
  }
}

/**
 * @param {import('express').Response} res
 * @param {string} token
 */
function setAccessTokenCookie(res, token) {
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: true,
  })
}

/**
 * @param {string} password
 * @returns {Promise<string>}
 */
async function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, res) => {
      if(err) {
        reject(err)
      }
       else {
        resolve(res)
       }
    })
  })
}

/**
 * @param {string} plainText
 * @param {string} password
 * @returns {Promise<boolean>}
 */
async function comparePassword(plainText, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainText, password, (err, res) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(res)
      }
    })
  })
}

module.exports = {
  getAccessTokenForUserId,
  createUserOrLogin,
  setAccessTokenCookie,
  encryptPassword,
  comparePassword,
}
