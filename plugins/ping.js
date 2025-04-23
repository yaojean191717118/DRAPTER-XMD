import config from '../config.cjs';

const ping = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd === "ping") {
    const start = new Date().getTime();

    const reactionEmojis = ['🚀', '✨', '🌟', '🔥', '🎉'];
    const textEmojis = ['⚡', '🧠', '💎', '🔋', '📶'];

    const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
    let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

    while (textEmoji === reactionEmoji) {
      textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
    }

    await m.React(textEmoji);

    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    const text = `
┏━━━✦『 ⚡ SPEED TEST 』✦━━━┓
┃ 
┃  Response Time: *${responseTime.toFixed(2)}ms*
┃  Status: *Active* ✅
┃  
┗━━━✦『 BEE-NECTOR 🍯 』✦━━━┛ ${reactionEmoji}
`;

    await Matrix.sendMessage(m.from, {
      text,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '0029Vb3zzYJ9xVJk0Y65c81W@newsletter',
          newsletterName: "ⓃⒺCⓉOR🍯",
          serverMessageId: 143
        }
      }
    }, { quoted: m });
  }
};

export default ping;
    
