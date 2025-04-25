import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import config from '../config.cjs';
import axios from 'axios';

// Get total memory and free memory in bytes
const totalMemoryBytes = os.totalmem();
const freeMemoryBytes = os.freemem();

// Define unit conversions
const byteToKB = 1 / 1024;
const byteToMB = byteToKB / 1024;
const byteToGB = byteToMB / 1024;

// Function to format bytes to a human-readable format
function formatBytes(bytes) {
  if (bytes >= Math.pow(1024, 3)) {
    return (bytes * byteToGB).toFixed(2) + ' GB';
  } else if (bytes >= Math.pow(1024, 2)) {
    return (bytes * byteToMB).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes * byteToKB).toFixed(2) + ' KB';
  } else {
    return bytes.toFixed(2) + ' bytes';
  }
}

// Bot Process Time
const uptime = process.uptime();
const day = Math.floor(uptime / (24 * 3600)); // Calculate days
const hours = Math.floor((uptime % (24 * 3600)) / 3600); // Calculate hours
const minutes = Math.floor((uptime % 3600) / 60); // Calculate minutes
const seconds = Math.floor(uptime % 60); // Calculate seconds

// Uptime
const uptimeMessage = `*I am alive now since ${day}d ${hours}h ${minutes}m ${seconds}s*`;
const runMessage = `*☀️ ${day} Day*\n*🕐 ${hours} Hour*\n*⏰ ${minutes} Minutes*\n*⏱️ ${seconds} Seconds*\n`;

const xtime = moment.tz("Asia/Colombo").format("HH:mm:ss");
const xdate = moment.tz("Asia/Colombo").format("DD/MM/YYYY");
const time2 = moment().tz("Asia/Colombo").format("HH:mm:ss");
let pushwish = "";

if (time2 < "05:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "11:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "15:00:00") {
  pushwish = `Good Afternoon 🌅`;
} else if (time2 < "18:00:00") {
  pushwish = `Good Evening 🌃`;
} else if (time2 < "19:00:00") {
  pushwish = `Good Evening 🌃`;
} else {
  pushwish = `Good Night 🌌`;
}

const menu = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const mode = config.MODE === 'public' ? 'public' : 'private';
  const pref = config.PREFIX;

  const validCommands = ['fullmenu', 'menu', 'listcmd'];

  if (validCommands.includes(cmd)) {
    const str = `
╭━━━✰*${config.BOT_NAME}*✰┈⊷
┃𓇽⌨➪⌨︎➪⌨︎➪⌨︎➪⌨︎➪⌨︎
┃⌨︎┃👥𝗢𝘄𝗻𝗲𝗿 : *${config.OWNER_NAME}*
┃⌨︎┃🤪𝗨𝘀𝗲𝗿 : *${m.pushName}*
┃⌨︎┃📳𝗠𝗼𝗱𝗲 : *${mode}*
┃⌨︎┃💻𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺 : *${os.platform()}*
┃⌨︎┃⏮️𝗣𝗿𝗲𝗳𝗶𝘅 : [${prefix}]
┃⌨︎┃🪆𝗩𝗲𝗿𝘀𝗶𝗼𝗻 : *1.0*
┃𓇽⌨➪⌨︎➪⌨︎➪⌨︎➪⌨︎➪⌨︎
╰━━━━━━━━━━━━━━━┈⊷

> ${pushwish} *${m.pushName}*!

╭━━〔 *Converter Menu* 〕━━┈⊷
┃◈𓇽⌨➪⌨︎➪⌨︎➪⌨︎➪⌨︎➪⌨︎
┃◈┃•💫 attp
┃◈┃•💫 attp2
┃◈┃•💫 attp3
┃◈┃•💫 ebinary
┃◈┃•💫 dbinary
┃◈┃•💫 emojimix
┃◈┃•💫 mp3
┃◈𓇽⌨➪⌨︎➪⌨︎➪⌨︎➪⌨︎➪⌨︎
╰──────────────┈⊷


╭━━〔 *Tools Menu* 〕━━┈⊷
┃◈𓇽⌨➪⌨︎➪⌨︎➪⌨︎➪⌨︎➪⌨︎
┃◈┃•🎭 calculator
┃◈┃•🎭 tempmail
┃◈┃•🎭 checkmail
┃◈┃•🎭 trt
┃◈┃•🎭 tts
┃◈𓇽⌨➪⌨︎➪⌨︎➪⌨︎➪⌨︎➪⌨︎
╰──────────────┈⊷

╭━━〔 *Group Menu* 〕━━┈⊷
┃◈𓇽⌨➪⌨︎➪⌨︎➪⌨︎➪⌨︎➪⌨︎
┃◈┃•✌️ linkgroup
┃◈┃•✌️ setppgc
┃◈┃•✌️ setname
┃◈┃•✌️ setdesc
┃◈┃•✌️ group
┃◈┃•✌️ gcsetting
┃◈┃•✌️ welcome
┃◈┃•✌️ add
┃◈┃•✌️ kick
┃◈┃•✌️ hidetag
┃◈┃•✌️ tagall
┃◈┃•✌️ antilink
┃◈┃•✌️ promote
┃◈┃•✌️ demote
┃◈𓇽⌨➪⌨︎➪⌨︎➪⌨︎➪⌨︎➪⌨︎
╰──────────────┈⊷

╭━━〔 *Search Menu* 〕━━┈⊷
┃◈𓇽⌨➪⌨︎➪⌨︎➪⌨︎➪⌨︎➪⌨︎
┃◈┃•🕊️ play
┃◈┃•🕊️ yts
┃◈┃•🕊️ imdb
┃◈┃•🕊️ google
┃◈┃•🕊️ gimage
┃◈┃•🕊️ pinterest
┃◈┃•🕊️ wallpaper
┃◈┃•🕊️ wikimedia
┃◈┃•🕊️ ytsearch
┃◈┃•🕊️ ringtone
┃◈┃•🕊️ lyrics
┃◈𓇽⌨➪⌨︎➪⌨︎➪⌨︎➪⌨︎➪⌨︎
╰──────────────┈⊷

╭━━〔 *Main Menu* 〕━━┈⊷
┃◈𓇽⌨➪⌨︎➪⌨︎➪⌨︎➪⌨︎➪⌨︎
┃◈┃•✨ ping
┃◈┃•✨ alive
┃◈┃•✨ owner
┃◈┃•✨ menu
┃◈┃•✨ infobot
┃◈𓇽⌨➪⌨︎➪⌨︎➪⌨︎➪⌨︎➪⌨︎
╰──────────────┈⊷

╭━━〔 *Owner Menu* 〕━━┈⊷
┃◈𓇽⌨➪⌨︎➪⌨︎➪⌨︎➪⌨︎➪⌨︎
┃◈┃•✅ join
┃◈┃•✅ leave
┃◈┃•✅ block
┃◈┃•✅ unblock
┃◈┃•✅ setppbot
┃◈┃•✅ anticall
┃◈┃•✅ setstatus
┃◈┃•✅ setnamebot
┃◈┃•✅ autotyping
┃◈┃•✅ alwaysonline
┃◈┃•✅ autoread
┃◈┃•✅ autosview
┃◈𓇽⌨➪⌨︎➪⌨︎➪⌨︎➪⌨︎➪⌨︎
╰──────────────┈⊷

> *${config.DESCRIPTION}*`;

    // Check if MENU_IMAGE exists in config and is not empty
    let menuImage;
    if (config.MENU_IMAGE && config.MENU_IMAGE.trim() !== '') {
      try {
        // Try to fetch the image from URL
        const response = await axios.get(config.MENU_IMAGE, { responseType: 'arraybuffer' });
        menuImage = Buffer.from(response.data, 'binary');
      } catch (error) {
        console.error('Error fetching menu image from URL, falling back to local image:', error);
        menuImage = fs.readFileSync('./media/popkid.jpg');
      }
    } else {
      // Use local image if MENU_IMAGE is not configured
      menuImage = fs.readFileSync('./media/popkid.jpg');
    }

    await Matrix.sendMessage(m.from, {
      image: menuImage,
      caption: str,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363395396503029@newsletter',
          newsletterName: "ⓃⒺCⓉOR🍯",
          serverMessageId: 143
        }
      }
    }, {
      quoted: m
    });

    // Send audio after sending the menu
    await Matrix.sendMessage(m.from, {
      audio: { url: 'https://files.catbox.moe/5df4ei.m4v' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: m });
  }
};

export default menu;
