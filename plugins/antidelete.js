// plugins/antidelete.js

const config = require("../config");

module.exports = {
  name: "antidelete",
  type: "event",

  async handle({ sock, msg, store }) {
    if (!msg || !msg.key || !msg.key.remoteJid || !msg.messageStubType) return;

    // 0x65 = message deleted
    if (msg.messageStubType === 0x65) {
      const jid = msg.key.remoteJid;
      const messageID = msg.key.id;
      const sender = msg.key.participant || msg.key.remoteJid;

      try {
        const deletedMsg = await store.loadMessage(jid, messageID);

        if (!deletedMsg) return;

        const isGroup = jid.endsWith("@g.us");
        const senderName = sender.split("@")[0];
        const chatType = isGroup ? "👥 Group" : "👤 Private";
        const location = isGroup ? `Group: ${jid}` : `Chat: ${jid}`;

        // Notify owner
        const alert = `📛 *Anti-Delete Alert*\n\n👤 *Sender:* ${senderName}\n🔍 *Where:* ${chatType}\n🗑 *Message was deleted.*\n\n🔁 *Forwarded message below ↓*`;

        // Send alert
        await sock.sendMessage(config.OWNER_NUMBER + "@s.whatsapp.net", { text: alert });

        // Forward the actual deleted message to owner
        await sock.forwardMessage(config.OWNER_NUMBER + "@s.whatsapp.net", deletedMsg, { force: true });

      } catch (err) {
        console.error("AntiDelete error:", err);
      }
    }
  },
};
                                        
