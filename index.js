require('dotenv').config();
const { loadCatImage, loadDogImage } = require('./loadImage');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/help/, msg => {

  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Kirjottele /kissa tai /koira nii suat hienoja kuvia');
});

bot.onText(/\/kissa/, async msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Oottele ku kuva lattaileepi');
  try {
    const image = await loadCatImage();
    bot.sendPhoto(chatId, image.url);
  } catch (error) {
    bot.sendMessage(chatId, 'Joku meni ny rikki, kokeile vaikka uuestaa');
  }
});

bot.onText(/\/koira/, async msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Oottele ku kuva lattaileepi');
  try {
    const image = await loadDogImage();
    bot.sendPhoto(chatId, image.url);
  } catch (error) {
    bot.sendMessage(chatId, 'Joku meni ny rikki, kokeile vaikka uuestaa');
  }
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const msgText = msg.text;
    
  if (!msgText.match(/\/koira/) && !msgText.match(/\/kissa/) && !msgText.match(/\/help/)) {
    bot.sendMessage(chatId, 'Kirjottele /kissa tai /koira nii suat hienoja kuvia');
  }
});