const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_BOT_API_TOKEN, { polling: true });
const { TELEGRAM_CHAT_IDS_CONTACT_FORM } = require('../config');

// for testing purpose - just to get the chatId
bot.onText(/\/start/, async (message, match) => {
    const chatId = message.chat.id;
    await bot.sendMessage(chatId, `your chat id is ${chatId}`);
});

async function sendMessage(reqBody) {
    const { name, email, text } = reqBody;

    const message = `
        There is a new message from ${name} in he portfolio:\n
        ${text}\n
        You can contact them in here: ${email}
    `;

    for (let i = 0; i < TELEGRAM_CHAT_IDS_CONTACT_FORM.length; i++) {
        const chatId = TELEGRAM_CHAT_IDS_CONTACT_FORM[i];
        await bot.sendMessage(chatId, message);
    }
}

module.exports = {
    sendMessage,
}
