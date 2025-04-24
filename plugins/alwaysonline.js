import config from '../config.cjs';

const alwaysonlineCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd !== 'alwaysonline') return;

  if (!isCreator) return m.reply("*📛 OWNER ACCESS ONLY.*");

  let responseMessage;

  switch (text.toLowerCase()) {
    case 'on':
      config.ALWAYS_ONLINE = true;
      responseMessage = "*✅ Always Online mode is now ENABLED.*";
      break;
    case 'off':
      config.ALWAYS_ONLINE = false;
      responseMessage = "*🛑 Always Online mode is now DISABLED.*";
      break;
    default:
      responseMessage = "*ℹ️ Usage:*\n• `*alwaysonline on` - Enable Always Online\n• `*alwaysonline off` - Disable Always Online";
  }

  try {
    await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
  } catch (error) {
    console.error("Error:", error);
    await Matrix.sendMessage(m.from, { text: '❌ Error while processing the command.' }, { quoted: m });
  }
};

export default alwaysonlineCommand;
    
