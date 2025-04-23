import config from '../config.cjs';

const messageStore = new Map(); // temporary memory store

const antidelete = async (m, Matrix) => {
  const ownerJid = Matrix.user?.id || 'owner@s.whatsapp.net'; // fallback just in case

  // Only store real messages, not system or bot's own
  if (!m.isBaileys && !m.key.fromMe && m.message) {
    messageStore.set(m.key.id, {
      message: m,
      chatId: m.key.remoteJid,
    });

    setTimeout(() => {
      messageStore.delete(m.key.id);
    }, 5 * 60 * 1000); // auto-delete after 5 mins
  }

  // Detect deleted message
  if (m.messageStubType === 0x08) {
    const deletedMsg = messageStore.get(m.key.id);

    if (deletedMsg) {
      const { message, chatId } = deletedMsg;

      await Matrix.sendMessage(ownerJid, {
        text: `🚫 *Anti-Delete Alert*\n\nA message was deleted in chat: ${chatId}\n\nForwarding deleted message...`
      });

      await Matrix.sendMessage(ownerJid, message.message, {
        quoted: message,
      });

      messageStore.delete(m.key.id);
    }
  }
};

export default antidelete;
