const i18n = {
  my: {
    appSubtitle: "မင်းရဲ့ AI Tutor နဲ့ စာလေ့လာမှုကို ပိုစိတ်ဝင်စားဖို့ ကူညီမယ်",
    quickToolsTitle: "Quick Tools",
    quickToolsHint: "စာရွက်စာတမ်း upload တင်ပြီးအောက်က tools တွေနဲ့ စတင်လိုက်ပါ။",
    uploadTitle: "စာရွက်စာတမ်း ထည့်ရန်",
    uploadDesc: "PDF / TXT ဖိုင်ကို drag & drop လုပ်ပါ၊ သို့မဟုတ် website link ထည့်ပါ။",
    dropText: "ဖိုင်များကို ဒီနေရာမှာ ချပါ သို့မဟုတ် နှိပ်ပြီးရွေးချယ်ပါ",
    pickFileBtn: "ဖိုင်ရွေးမယ်",
    addLinkBtn: "Link ထည့်မယ်",
    noContext: "Context မရှိသေးပါ",
    contextReady: "စာရွက်စာတမ်း တင်ပြီး Context အဖြစ်ပြင်ဆင်ပြီးပါပြီ ✅",
    chatTitle: "AI Tutor Chat",
    chatPlaceholder: "မေးချင်တာ ရိုက်ထည့်ပါ...",
    sendBtn: "ပို့မယ်",
    flashcardTitle: "မှတ်ဉာဏ်ကတ်များ",
    flashcardHint: "ကတ်ကို နှိပ်ပြီးအဖြေကိုလှန်ကြည့်ပါ။",
    quizTitle: "စာမေးပွဲစစ်မယ်",
    submitQuizBtn: "အမှတ်တွက်မယ်",
    quizScore: "အမှတ်",
    aiWelcome: "ဟယ်လို 👋 ငါက မင်းရဲ့ AI Tutor ပါ။ စာအကြောင်း မေးနိုင်တယ်နော်!",
    uploadSuccessFile: (name) => `ဖိုင် '${name}' ကို တင်ပြီး text extraction အောင်မြင်ပါတယ်။`,
    uploadSuccessLink: (url) => `Website link '${url}' ကို context ထဲထည့်ပြီးပါပြီ။`,
    needContext: "Quick tool မသုံးခင် စာရွက်စာတမ်းတစ်ခုတင်ပါ။",
    toolMessages: {
      classmate: "My smart classmate mode: ခက်တဲ့အကြောင်းအရာကို လွယ်ကူတဲ့နေ့စဉ်ဥပမာတွေနဲ့ ရှင်းပြပေးမယ်။",
      summary: "Summary & Key Points mode: အဓိကအချက်တွေကို တိကျတဲ့ bullet points နဲ့ ထုတ်ပေးမယ်။",
      vocab: "Vocabulary Builder mode: ခက်ဆစ်တွေကိုရွေးပြီး အဓိပ္ပာယ်ရှင်းပြမယ်။",
      debate: "Debate Mode: အမြင်မတူတဲ့ဘက်နှစ်ဘက် dialog ပုံစံနဲ့ ဆွေးနွေးပြမယ်။",
      flashcards: "Flashcards အသစ်တွေ ပြင်ဆင်ပြီးပါပြီ။ ကတ်ကိုနှိပ်ပြီးလေ့ကျင့်ပါ။",
      quiz: "Quiz အသစ် generate လုပ်ပြီးပါပြီ။ မေးခွန်းတွေကိုဖြေပြီး အမှတ်တွက်ပါ။"
    }
  },
  en: {
    appSubtitle: "Study smarter with your AI tutor companion.",
    quickToolsTitle: "Quick Tools",
    quickToolsHint: "Upload study material first, then choose a tool.",
    uploadTitle: "Add Study Material",
    uploadDesc: "Drag & drop PDF / TXT files, or add a website link.",
    dropText: "Drop files here or click to browse",
    pickFileBtn: "Choose files",
    addLinkBtn: "Add Link",
    noContext: "No context loaded yet",
    contextReady: "Document loaded and prepared as context ✅",
    chatTitle: "AI Tutor Chat",
    chatPlaceholder: "Type your question...",
    sendBtn: "Send",
    flashcardTitle: "Flashcards",
    flashcardHint: "Click a card to flip and reveal the answer.",
    quizTitle: "Quiz for me",
    submitQuizBtn: "Calculate Score",
    quizScore: "Score",
    aiWelcome: "Hey 👋 I'm your AI Tutor. Ask me anything about your lesson!",
    uploadSuccessFile: (name) => `File '${name}' uploaded. Text extraction complete.`,
    uploadSuccessLink: (url) => `Website link '${url}' added as context.`,
    needContext: "Please upload at least one document before using tools.",
    toolMessages: {
      classmate: "My smart classmate mode: I will explain with everyday analogies like a smart best friend.",
      summary: "Summary & Key Points mode: Here are concise bullet points from your material.",
      vocab: "Vocabulary Builder mode: I'll extract difficult terms and explain them simply.",
      debate: "Debate Mode: I'll simulate two viewpoints discussing the topic.",
      flashcards: "Fresh flashcards are ready. Click each card to practice.",
      quiz: "A new quiz is generated. Answer and calculate your score."
    }
  }
};

const tools = [
  { id: "classmate", title: "My smart classmate", subtitle: "Explain like smart best friend" },
  { id: "flashcards", title: "Flashcards Maker", subtitle: "မှတ်ဉာဏ်ကတ်များ" },
  { id: "summary", title: "Summary & Key Points", subtitle: "summary" },
  { id: "vocab", title: "Vocabulary Builder", subtitle: "ခက်ဆစ်များ" },
  { id: "debate", title: "Debate Mode", subtitle: "အမြင်မတူ ဆွေးနွေးခြင်း" },
  { id: "quiz", title: "Quiz for me", subtitle: "စာမေးပွဲစစ်မယ်" }
];

const state = {
  lang: "my",
  contextReady: false,
  loadedItems: [],
  quizAnswers: {}
};

const flashcardData = [
  { q: "Photosynthesis ဆိုတာဘာလဲ?", a: "အပင်က အလင်းရောင်ကို အာဟာရဖြစ်စေတဲ့ လုပ်ငန်းစဉ်။" },
  { q: "Acceleration unit ကဘာလဲ?", a: "m/s² (meter per second squared)" },
  { q: "Democracy အဓိပ္ပာယ်?", a: "ပြည်သူက ကိုယ်စားလှယ်ရွေးကာ အုပ်ချုပ်ရေးပါဝင်သည့် စနစ်။" }
];

let quizData = [
  { id: 1, type: "mcq", question: "Water boils at ____ (standard pressure)", options: ["100°C", "80°C", "120°C"], answer: "100°C" },
  { id: 2, type: "tf", question: "The Earth is flat.", options: ["True", "False"], answer: "False" },
  { id: 3, type: "mcq", question: "Which is a prime number?", options: ["9", "15", "11"], answer: "11" }
];

const el = (id) => document.getElementById(id);

function renderTools() {
  const toolGrid = el("toolGrid");
  toolGrid.innerHTML = "";
  tools.forEach((tool) => {
    const button = document.createElement("button");
    button.className = "tool-btn";
    button.innerHTML = `${tool.title}<span>${tool.subtitle}</span>`;
    button.addEventListener("click", () => handleToolClick(tool.id));
    toolGrid.appendChild(button);
  });
}

function appendMessage(text, sender = "bot") {
  const template = el("messageTemplate");
  const node = template.content.firstElementChild.cloneNode(true);
  node.classList.add(sender);
  node.querySelector(".bubble").textContent = text;
  el("chatWindow").appendChild(node);
  el("chatWindow").scrollTop = el("chatWindow").scrollHeight;
}

function updateDocStatus() {
  const list = el("docStatusList");
  list.innerHTML = "";
  state.loadedItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = "doc-status-item";
    li.textContent = item;
    list.appendChild(li);
  });
  const contextState = el("contextState");
  if (state.contextReady) {
    contextState.textContent = i18n[state.lang].contextReady;
    contextState.classList.add("ready");
  } else {
    contextState.textContent = i18n[state.lang].noContext;
    contextState.classList.remove("ready");
  }
}

function applyLanguage() {
  const t = i18n[state.lang];
  el("appSubtitle").textContent = t.appSubtitle;
  el("quickToolsTitle").textContent = t.quickToolsTitle;
  el("quickToolsHint").textContent = t.quickToolsHint;
  el("uploadTitle").textContent = t.uploadTitle;
  el("uploadDesc").textContent = t.uploadDesc;
  el("dropText").textContent = t.dropText;
  el("pickFileBtn").textContent = t.pickFileBtn;
  el("addLinkBtn").textContent = t.addLinkBtn;
  el("chatTitle").textContent = t.chatTitle;
  el("chatInput").placeholder = t.chatPlaceholder;
  el("sendBtn").textContent = t.sendBtn;
  el("flashcardTitle").textContent = t.flashcardTitle;
  el("flashcardHint").textContent = t.flashcardHint;
  el("quizTitle").textContent = t.quizTitle;
  el("submitQuizBtn").textContent = t.submitQuizBtn;
  el("quizScore").textContent = `${t.quizScore}: -`;
  updateDocStatus();
}

function handleFiles(files) {
  const t = i18n[state.lang];
  [...files].forEach((file) => {
    state.loadedItems.push(t.uploadSuccessFile(file.name));
  });
  if (files.length) {
    state.contextReady = true;
    appendMessage(t.contextReady, "bot");
  }
  updateDocStatus();
}

function handleToolClick(toolId) {
  const t = i18n[state.lang];
  if (!state.contextReady) {
    appendMessage(t.needContext, "bot");
    return;
  }
  if (toolId === "flashcards") {
    renderFlashcards();
  }
  if (toolId === "quiz") {
    renderQuiz();
  }
  appendMessage(t.toolMessages[toolId] || "", "bot");
}

function renderFlashcards() {
  const container = el("flashcards");
  container.innerHTML = "";
  flashcardData.forEach((card) => {
    const wrap = document.createElement("article");
    wrap.className = "flashcard";
    wrap.innerHTML = `
      <div class="flashcard-inner">
        <div class="flashcard-face flashcard-front">${card.q}</div>
        <div class="flashcard-face flashcard-back">${card.a}</div>
      </div>`;
    wrap.addEventListener("click", () => wrap.classList.toggle("flipped"));
    container.appendChild(wrap);
  });
}

function renderQuiz() {
  state.quizAnswers = {};
  el("quizScore").textContent = `${i18n[state.lang].quizScore}: -`;
  const container = el("quizContainer");
  container.innerHTML = "";

  quizData.forEach((q) => {
    const card = document.createElement("article");
    card.className = "quiz-question";
    card.innerHTML = `<strong>${q.id}. ${q.question}</strong>`;

    const options = document.createElement("div");
    options.className = "option-list";

    q.options.forEach((opt) => {
      const optEl = document.createElement("button");
      optEl.type = "button";
      optEl.className = "option-item";
      optEl.textContent = opt;
      optEl.addEventListener("click", () => {
        state.quizAnswers[q.id] = opt;
        [...options.children].forEach((child) => child.classList.remove("selected"));
        optEl.classList.add("selected");
      });
      options.appendChild(optEl);
    });

    card.appendChild(options);
    container.appendChild(card);
  });
}

function scoreQuiz() {
  let score = 0;
  quizData.forEach((q) => {
    if (state.quizAnswers[q.id] === q.answer) score += 1;
  });
  el("quizScore").textContent = `${i18n[state.lang].quizScore}: ${score}/${quizData.length}`;
  appendMessage(`${i18n[state.lang].quizScore}: ${score}/${quizData.length}`, "bot");
}

function init() {
  renderTools();
  renderFlashcards();
  renderQuiz();
  applyLanguage();
  appendMessage(i18n[state.lang].aiWelcome, "bot");

  const dropZone = el("dropZone");
  const fileInput = el("fileInput");

  el("pickFileBtn").addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => handleFiles(e.target.files));

  ["dragenter", "dragover"].forEach((eventName) => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.remove("dragover");
    });
  });

  dropZone.addEventListener("drop", (e) => handleFiles(e.dataTransfer.files));
  dropZone.addEventListener("click", () => fileInput.click());
  dropZone.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInput.click();
    }
  });

  el("addLinkBtn").addEventListener("click", () => {
    const input = el("linkInput");
    const url = input.value.trim();
    if (!url) return;
    state.loadedItems.push(i18n[state.lang].uploadSuccessLink(url));
    state.contextReady = true;
    updateDocStatus();
    appendMessage(i18n[state.lang].contextReady, "bot");
    input.value = "";
  });

  el("chatForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = el("chatInput");
    const val = input.value.trim();
    if (!val) return;
    appendMessage(val, "user");
    appendMessage(state.contextReady
      ? "ဒီအကြောင်းကို context နဲ့ချိတ်ပြီး ရှင်းပြပေးမယ် ✅"
      : i18n[state.lang].needContext, "bot");
    input.value = "";
  });

  el("submitQuizBtn").addEventListener("click", scoreQuiz);

  el("languageToggle").addEventListener("change", (e) => {
    state.lang = e.target.checked ? "en" : "my";
    applyLanguage();
  });
}

init();
