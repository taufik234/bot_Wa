const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { EditPhotoHandler } = require("./feature/edit_foto");
const { ChatAIHandler } = require("./feature/chat_ai");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  const text = msg.body.toLowerCase() || "";

  //check status
  if (text === "!ping") {
    msg.reply("pong");
  }

  if (text == "#help") {
    msg.reply(
      "Halo, ini adalah bot yang dibuat oleh Taufik\n\n" +
        "Command yang tersedia:\n" +
        "1. #hai\n" +
        "2. #stiker\n" +
        "3. #edit_bg/warna\n" +
        "4. #ask/pertanyaan\n" +
        "5. !ping\n" +
        "6. #help\n\n")
  }

  if (text == "#hai") {
    msg.reply("Hai juga");
  }

  //stiker
  if (msg.body.startsWith("#stiker") && msg.type == "image") {
    const media = await msg.downloadMedia();
    client.sendMessage(msg.from, media, {
      sendMediaAsSticker: true,
      stickerAuthor: "wow",
    });
  }

  // edit_bg/bg_color
  if (text.includes("#edit_bg/")) {
    await EditPhotoHandler(text, msg);
  }
  // #ask/question?
  if (text.includes("#ask/")) {
    await ChatAIHandler(text, msg);
  }
});

client.initialize();
