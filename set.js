




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUUzZjZxSXVRQVg4dFZMOG9QRENJR2UzSFRZc1pXd2xkcFBUZXAxb3RVST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRGRZQm9yNEFNaXVPUEVMWFZacjFnZ0dJOHFpU3AxZFNXL0ZGV1ZhZDhtVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTnoxWVhOTWlQRG9hckZWSEZpRWRQenh0ZmJNQno4U2c0NWNKUTgxcWxnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxZ3hlVnUxdVBZL2dSQmdjSGQ4azdCai82TVEyZlBNWlIxLzZ6dzlnWUZVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhQSXdtb1dUdDlITmtRcEFHdlI1NVhMLzluWHR0d0ZhS3VyYUcwazlwMU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxWS05vU084ZWZXSFk2ZU1kbmh2d2lvdkNZRTArZDBXWGJBb2ZSbzY2bDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUxjaVRvc1hxTURrZWNEVzB4aVA5bmpmRnA4NG1zNVBuWmV2MkxHOFFGMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaDJCanU2MTI5bjJNVlMvVisyM0trMHVkMkN1dEs4MDQzV1JNR053UXQzST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFBOGNLZTN4dnhIUmdWWE1KbGsvUU9NVWVBejA5YXBSM29aYy9YNkpkZG9Xd3gzZlo1ZURmc3BuQ1FUWlIwaFRCODVjNHR4RHNnV1A2MGNmS1ZiUmpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTYsImFkdlNlY3JldEtleSI6InQ1V2xQMklxRVNncHU0YnA1WURwYUFVMnNoUVU5NmV4dHU3WFJjWFA4S3M9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMTM0MTU4ODQwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkQ3QjRFQ0JDM0FGN0EyMzE0NzNFNDZCQ0JEQTI3ODAwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTExMTkxODV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkyMzEzNDE1ODg0MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCMjVERTkyNzg1NDYxMEUyNTdEMTNGRkFGQTQ5MTkyRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxMTE5MTk1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJBUjM2Vk1BOSIsIm1lIjp7ImlkIjoiOTIzMTM0MTU4ODQwOjYxQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdkajwnZKP8J2SkPCdko/wnZKa8J2SjvCdkpDwnZKW8J2SlCIsImxpZCI6IjE3NDM4NDg0OTQxNjIzNjo2MUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pQd3FmRUNFTHpxLzhJR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik5QZVJVaDUzZWtMY2svU29hRlVJeWszRUdLb3l1UUxHenRJbkFxN2VNQUE9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ind4emZKc1l3YXZkUGs5czRZVFBCekdid1dVSklTeVE5ZVM2QVUwTC9yYVhTZ3kvdkNFYk9mNXBGVythcGJPTXBacFR1S2o1QStMZGlPTHU2Z2NPVUNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJEckViMTg0K1BGalRUZ1NQY2w2dzFkaGsvSTRPcmJFOXlTZ29wQ2VCbkNYYVRkM3c3Nlk2REFRSGJicHRUdEQ1YXBqRGpLYmp3bkNDVlNyN0xPY1BqZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzEzNDE1ODg0MDo2MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUVDNrVkllZDNwQzNKUDBxR2hWQ01wTnhCaXFNcmtDeHM3U0p3S3UzakFBIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTExMTkxNzgsImxhc3RQcm9wSGFzaCI6IjFLNGhINCIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTjlUIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "ANONYMOUS",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 923134158840",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'ANONYMOUS',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/g86c1n.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
