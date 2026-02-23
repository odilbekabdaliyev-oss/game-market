exports.handler = async (event) => {
  try {
    const TOKEN = process.env.BOT_TOKEN;

    if (!TOKEN) {
      return {
        statusCode: 500,
        body: "BOT_TOKEN topilmadi",
      };
    }

    if (!event.body) {
      return { statusCode: 200, body: "No body" };
    }

    const data = JSON.parse(event.body);

    if (!data.message) {
      return { statusCode: 200, body: "No message" };
    }

    const chatId = data.message.chat.id;
    const text = data.message.text || "";

    let replyText = "";

    if (text === "/start") {
      replyText = "Assalomu alaykum 👋\nBot ishlayapti 🚀";
    } else {
      replyText = "Siz yozdingiz: " + text;
    }

    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: replyText,
      }),
    });

    return {
      statusCode: 200,
      body: "OK",
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: "Xatolik: " + error.message,
    };
  }
};
