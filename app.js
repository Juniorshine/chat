const chatList = document.getElementById("chatList");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const clearButton = document.getElementById("clearChat");
const template = document.getElementById("messageTemplate");

const defaultMessages = [
  {
    author: "客服机器人",
    role: "assistant",
    text: "你好！这是一个纯前端聊天演示，可直接嵌入 WebView。",
    time: "刚刚",
  },
  {
    author: "客服机器人",
    role: "assistant",
    text: "你可以在这里输入消息，我会给出示例回复。",
    time: "刚刚",
  },
];

const cannedReplies = [
  "收到～如果要接入真实聊天，可在这里调用你的消息接口。",
  "为了封装成 IPA/APK，只需把这个页面嵌入 WebView。",
  "需要我补充登录、会话列表或消息推送吗？",
];

const state = {
  messages: [...defaultMessages],
};

const formatTime = () =>
  new Date().toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  });

const renderMessages = () => {
  chatList.innerHTML = "";

  if (state.messages.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "暂无消息，输入内容开始对话。";
    chatList.appendChild(empty);
    return;
  }

  state.messages.forEach((message) => {
    const node = template.content.cloneNode(true);
    const container = node.querySelector(".message");
    const avatar = node.querySelector(".avatar");
    const name = node.querySelector(".name");
    const time = node.querySelector(".time");
    const text = node.querySelector(".text");

    if (message.role === "user") {
      container.classList.add("user");
      avatar.textContent = "你";
    } else {
      avatar.textContent = "助";
    }

    name.textContent = message.author;
    time.textContent = message.time;
    text.textContent = message.text;

    chatList.appendChild(node);
  });

  chatList.scrollTop = chatList.scrollHeight;
};

const addMessage = ({ author, role, text }) => {
  state.messages.push({
    author,
    role,
    text,
    time: formatTime(),
  });
  renderMessages();
};

const sendMessage = () => {
  const text = messageInput.value.trim();
  if (!text) {
    messageInput.focus();
    return;
  }

  addMessage({ author: "你", role: "user", text });
  messageInput.value = "";

  const reply =
    cannedReplies[Math.floor(Math.random() * cannedReplies.length)];
  setTimeout(() => {
    addMessage({ author: "客服机器人", role: "assistant", text: reply });
  }, 500);
};

sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

clearButton.addEventListener("click", () => {
  state.messages = [];
  renderMessages();
});

renderMessages();
