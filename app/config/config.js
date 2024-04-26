require('dotenv').config();
const { PORT, DB_URI, FRONTEND_URL, JWT_SECREATE, JWT_EXPIRESIN, SMPT_EMAIL_HOST, SMPT_EMAIL_PORT, SMPT_EMAIL_USER, SMPT_EMAIL_PASSWORD, SMPT_EMAIL_FROM, } = process?.env

module.exports = {
    PORT: PORT || 5522,
    DB_URI: DB_URI,
    FRONTEND_URL: FRONTEND_URL,
    JWT_SECREATE: JWT_SECREATE,
    JWT_EXPIRESIN: JWT_EXPIRESIN,

    SMPT_EMAIL_HOST: SMPT_EMAIL_HOST,
    SMPT_EMAIL_PORT: SMPT_EMAIL_PORT,
    SMPT_EMAIL_USER: SMPT_EMAIL_USER,
    SMPT_EMAIL_FROM: SMPT_EMAIL_FROM,
    SMPT_EMAIL_PASSWORD: SMPT_EMAIL_PASSWORD,

    TYPE: TYPE,
    PROJECT_ID: PROJECT_ID,
    PRIVATE_KEY_ID: PRIVATE_KEY_ID,
    PRIVATE_KEY: PRIVATE_KEY,
    CLIENT_EMAIL: CLIENT_EMAIL,
    CLIENT_ID: CLIENT_ID,
    AUTH_URL: AUTH_URL,
    TOKEN_URL: TOKEN_URL,
    AUTH_PROVIDER_X509_CERT_URL: AUTH_PROVIDER_X509_CERT_URL,
    CLIENT_X509_CERT_URL: CLIENT_X509_CERT_URL,
    UNIVERSE_DOMAIN: UNIVERSE_DOMAIN,
}