"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import {Send, Bot, Menu, Plus, MessageSquare, X, MoreVertical, Trash2, 
  Copy, RotateCw, Volume2, VolumeX, Mic, MicOff, Square, User, Settings, LogOut, ChevronDown, Search, ArrowLeft
} from "lucide-react";
import { useAuth } from "../../providers/AuthProvider";
import api from "../../lib/api";

// ────────────────────────── Markdown & Components ──────────────────────────
function MarkdownMessage({ text }) {
  const processed = text.replace(/<\|NEWLINE\|>/g, "\n")
    .replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold text-teal-700'>$1</strong>")
    .replace(/`(.*?)`/g, "<code class='bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono mx-1 break-all'>$1</code>")
    .replace(/^### (.*$)/gm, "<h3 class='text-base font-bold mt-5 mb-2 text-teal-700'>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2 class='text-lg font-bold mt-6 mb-3 text-teal-700'>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1 class='text-xl font-bold mt-7 mb-4 text-teal-700'>$1</h1>")
    .replace(/^\d+\.\s+(.*$)/gm, "<li class='ml-5 list-decimal text-sm leading-relaxed my-1'>$1</li>")
    .replace(/^- (.*$)/gm, "<li class='ml-5 list-disc text-sm leading-relaxed my-1'>• $1</li>")
    .replace(/\n/g, "<br/>");

  return (
    <div
      className="text-sm leading-relaxed text-gray-800 break-words overflow-hidden"
      style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex space-x-1">
        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>
      <span className="text-gray-500">Mentoroid is thinking...</span>
    </div>
  );
}

function MessageActions({ message, onCopy, onRegenerate, isSpeaking, onSpeak }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mt-3">
      <button onClick={onCopy} className="flex items-center gap-1 hover:text-teal-600 transition">
        <Copy size={13} /> <span className="hidden sm:inline">Copy</span>
      </button>
      {message.role === "assistant" && (
        <button onClick={onRegenerate} className="flex items-center gap-1 hover:text-teal-600 transition">
          <RotateCw size={13} /> <span className="hidden sm:inline">Regenerate</span>
        </button>
      )}
      <button onClick={onSpeak} className={`flex items-center gap-1 transition ${isSpeaking ? "text-red-600" : "hover:text-teal-600"}`}>
        {isSpeaking ? <VolumeX size={13} /> : <Volume2 size={13} />}
        <span className="hidden sm:inline">{isSpeaking ? "Stop" : "Read"}</span>
      </button>
    </div>
  );
}

function DeleteConfirmModal({ isOpen, onClose, onConfirm, title }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <h3 className="text-lg font-semibold mb-3">Delete Chat?</h3>
        <p className="text-sm text-gray-600 mb-6">
          Delete "<span className="font-medium">{title || "this chat"}</span>" permanently?
        </p>
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 text-sm">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileDropdown({ user }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-xl transition">
        <div className="w-9 h-9 bg-[#006188] text-white rounded-full flex items-center justify-center font-bold text-sm">
          {user?.name?.[0] || "U"}
        </div>
        <ChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
          <button className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3 text-sm"><User size={16} /> My Profile</button>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3 text-sm"><Settings size={16} /> Settings</button>
          <hr className="my-2" />
          <button className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 flex items-center gap-3 text-sm"><LogOut size={16} /> Logout</button>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// MAIN CHAT COMPONENT
// ──────────────────────────────────────────────────────────────
function ChatComponent() {
  const { user } = useAuth();
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streamText, setStreamText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, chatId: null, title: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const abortControllerRef = useRef(null);
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  const loadChatList = async () => {
    if (!userId) return;
    try {
      const res = await api.get(`/user/chat-history/list?user_id=${userId}`);
      const chats = res.data.chats || [];
      const enriched = await Promise.all(chats.map(async (chat) => {
        if (chat.title && chat.title !== "New Chat") return { ...chat, displayTitle: chat.title };
        try {
          const detail = await api.get(`/user/chat-history/chat?user_id=${userId}&chat_id=${chat.chat_id}`);
          const firstMsg = detail.data.messages?.find(m => m.role === "user");
          const title = firstMsg ? firstMsg.text.trim().slice(0, 35) + (firstMsg.text.length > 35 ? "..." : "") : "New Chat";
          return { ...chat, displayTitle: title };
        } catch { return { ...chat, displayTitle: "New Chat" }; }
      }));
      setChatHistory(enriched);
    } catch (err) { console.error(err); }
  };

  const loadChat = async (chatId) => {
    try {
      const res = await api.get(`/user/chat-history/chat?user_id=${userId}&chat_id=${chatId}`);
      const formatted = (res.data.messages || []).map(m => ({
        role: m.role,
        text: m.text,
        timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }));
      setMessages(formatted);
      setCurrentChatId(chatId);
      setSidebarOpen(false);
    } catch (err) { console.error(err); }
  };

  const createNewChat = async () => {
    try {
      const res = await api.post("/user/chat-history/create", { user_id: userId });
      setCurrentChatId(res.data.chat_id);
      setMessages([]);
      loadChatList();
      setSidebarOpen(false);
    } catch (err) { console.error(err); }
  };

  const deleteChat = async (chatId) => {
    try {
      await api.delete("/user/chat-history/delete", { data: { chat_id: chatId } });
      if (currentChatId === chatId) {
        setCurrentChatId(null);
        setMessages([]);
      }
      loadChatList();
      setDeleteModal({ open: false });
    } catch (err) { console.error(err); }
  };

  useEffect(() => { loadChatList(); }, [userId]);

  useEffect(() => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (e) => {
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript + " ";
      }
      if (final) setInput(prev => prev + final);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
  }, []);

  const toggleVoice = () => {
    if (isListening) recognitionRef.current?.stop();
    else recognitionRef.current?.start();
    setIsListening(!isListening);
  };

  const speak = (text, idx) => {
    if (speakingId === idx) {
      speechSynthesis.cancel();
      setSpeakingId(null);
    } else {
      speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text.replace(/<\|NEWLINE\|>/g, " "));
      utter.lang = "en-US";
      utter.rate = 0.9;
      utter.onend = () => setSpeakingId(null);
      speechSynthesis.speak(utter);
      setSpeakingId(idx);
    }
  };

  const sendMessage = async (text, isRegeneration = false) => {
    if (!text.trim() || isStreaming) return;

    let chatId = currentChatId;

    if (!chatId) {
      try {
        const title = text.trim().slice(0, 40) + (text.length > 40 ? "..." : "");
        const createRes = await api.post("/user/chat-history/create", { user_id: userId, title });
        chatId = createRes.data.chat_id;
        setCurrentChatId(chatId);
        loadChatList();
      } catch (err) {
        console.error("Failed to create chat:", err);
        setMessages(prev => [...prev, { role: "assistant", text: "Failed to start chat.", timestamp: "Error" }]);
        return;
      }
    }

    const userMsg = { role: "user", text, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    if (!isRegeneration) setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsStreaming(true);
    setStreamText("");

    try {
      await api.post("/user/chat-history/add", {
        user_id: userId,
        chat_id: chatId,
        role: "user",
        text
      });
    } catch (err) {
      console.error("Failed to save user message:", err);
    }

    abortControllerRef.current = new AbortController();

    try {
      const res = await fetch("/api/stream", {
        method: "POST",
        body: JSON.stringify({ message: text, user_id: userId, chat_id: chatId }),
        signal: abortControllerRef.current.signal,
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let aiText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(l => l.startsWith("data: "));
        for (const line of lines) {
          const data = line.replace("data: ", "").trim();
          if (data && data !== "[DONE]") {
            aiText += data;
            setStreamText(aiText);
          }
        }
      }

      const assistantMsg = {
        role: "assistant",
        text: aiText || "No response.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages(prev => [...prev, assistantMsg]);

      await api.post("/user/chat-history/add", {
        user_id: userId,
        chat_id: chatId,
        role: "assistant",
        text: aiText
      });

      loadChatList();
    } catch (err) {
      if (err.name !== "AbortError") {
        setMessages(prev => [...prev, { role: "assistant", text: "Error: Could not get response.", timestamp: "Error" }]);
      }
    } finally {
      setIsStreaming(false);
      setStreamText("");
    }
  };

  const filteredChats = chatHistory.filter(chat =>
    (chat.displayTitle || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen  bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 overflow-hidden lg:-mt-5">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-end p-3 border-b">
            <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-200 rounded-lg lg:hidden">
              <X size={22} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                {searchQuery ? "No chats found" : "No chats yet"}
              </div>
            ) : (
              filteredChats.map(chat => (
                <div key={chat.chat_id} className="flex items-center justify-between p-3 hover:bg-gray-100 transition group">
                  <button
                    onClick={() => loadChat(chat.chat_id)}
                    className={`flex-1 text-left flex items-center gap-3 text-sm ${currentChatId === chat.chat_id ? "bg-teal-50 border-l-4 border-teal-600" : ""}`}
                  >
                    <MessageSquare size={16} className="text-gray-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-xs">{chat.displayTitle || chat.title || "New Chat"}</p>
                      <p className="text-xs text-gray-500">{new Date(chat.createdAt).toLocaleDateString()}</p>
                    </div>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteModal({ open: true, chatId: chat.chat_id, title: chat.displayTitle || chat.title || "this chat" });
                    }}
                    className="p-2 hover:bg-gray-200 rounded-lg text-gray-500 hover:text-red-600 transition opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Back Button - ONLY on lg and larger screens */}
              <button
                onClick={() => window.history.back()}
                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition"
              >
                <ArrowLeft size={18} />
                Back
              </button> 
              {/* Mobile Menu */}
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu size={24} />
              </button>

              <h1 className="text-lg font-bold text-[#006188]">Mentoroid AI</h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={createNewChat}
                className="hidden sm:flex items-center gap-2 bg-[#006188] text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition text-sm font-medium"
              >
                <Plus size={18} /> New Chat
              </button>
              <button  
                onClick={createNewChat}
                className="sm:hidden p-2 bg-[#006188] text-white rounded-xl hover:bg-teal-700 transition"
                aria-label="New Chat"
              >
                <Plus size={20} />
              </button>
              <ProfileDropdown user={user} />
            </div>
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto px-4 py-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.length === 0 && !streamText && (
              <div className="text-center py-20">
                <Bot size={70} className="mx-auto text-gray-300 mb-4" />
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Welcome to Mentoroid AI</h2>
                <p className="text-sm text-gray-500">Start a conversation!</p>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="w-full max-w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm">
                  {m.role === "assistant" ? <MarkdownMessage text={m.text} /> : <div className="text-sm whitespace-pre-wrap break-words">{m.text}</div>}
                  <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                    <MessageActions
                      message={m}
                      onCopy={() => navigator.clipboard.writeText(m.text)}
                      onRegenerate={() => {
                        const idx = messages.findIndex(msg => msg === m);
                        if (idx > 0 && messages[idx - 1].role === "user") {
                          setMessages(messages.slice(0, idx));
                          sendMessage(messages[idx - 1].text, true);
                        }
                      }}
                      isSpeaking={speakingId === i}
                      onSpeak={() => speak(m.text, i)}
                    />
                    <span>{m.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}

            {streamText && (
              <div className="flex justify-start">
                <div className="w-full max-w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm">
                  <MarkdownMessage text={streamText} />
                  <div className="mt-4"><TypingIndicator /></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </main>

        {/* Input Footer */}
        <footer className="bg-white/90 backdrop-blur-md border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex gap-2 items-end bg-gray-100 rounded-2xl p-3 shadow-inner">
              <button onClick={toggleVoice} className={`p-3 rounded-xl transition ${isListening ? "bg-red-500 animate-pulse" : "bg-gray-300 hover:bg-gray-400"}`}>
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage(input))}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent outline-none resize-none text-sm max-h-32 min-h-10 placeholder-gray-500"
                rows={1}
              />
              {isStreaming ? (
                <button onClick={() => abortControllerRef.current?.abort()} className="bg-red-500 hover:bg-red-600 p-3 rounded-xl transition">
                  <Square size={20} />
                </button>
              ) : (
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="bg-[#006188] disabled:opacity-50 text-white p-3 rounded-xl hover:scale-110 transition disabled:hover:scale-100"
                >
                  <Send size={20} />
                </button>
              )}
            </div>
          </div>
        </footer>
      </div>

      <DeleteConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false })}
        onConfirm={() => deleteChat(deleteModal.chatId)}
        title={deleteModal.title}
      />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <Bot size={60} className="text-[#006188] animate-pulse" />
      </div>
    }>
      <ChatComponent />
    </Suspense>
  );
}
