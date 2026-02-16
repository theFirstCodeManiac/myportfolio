import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";

// ✅ Typed responses to satisfy TS strict mode
interface Responses {
  skills: string;
  experience: string;
  projects: string;
  contact: string;
  resume: string;
  default: string;
}

const predefinedResponses: Responses = {
  skills:
    "I'm proficient in React.js, TypeScript, Node.js, Express.js, MongoDB, PHP, MySQL, and JavaScript. I have 5+ years of professional experience with these technologies.",
  experience:
    "I have over 5 years of experience. I've worked at Aledoy Solutions as a Backend Developer, Setime Technologies as a Frontend Developer, and Cizar Consult as a Frontend Developer.",
  projects:
    "I've built various projects including e-commerce platforms, task management apps, AI chat interfaces, healthcare dashboards, and more. Check out the Projects section for details!",
  contact:
    "You can reach me via email at idahdaniel@example.com or through the contact form on this website. I'm always open to discussing new opportunities!",
  resume:
    "You can download my resume from the hero section or click the 'Download Resume' button. It contains detailed information about my skills and experience.",
  default:
    "I'm Idah Daniel's AI assistant. I can help you learn about his skills, experience, projects, and how to contact him. What would you like to know?",
};

// ✅ Helper to pick response safely
const getResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("skill") || lowerMessage.includes("tech") || lowerMessage.includes("stack")) {
    return predefinedResponses.skills;
  }
  if (lowerMessage.includes("experience") || lowerMessage.includes("work") || lowerMessage.includes("job") || lowerMessage.includes("company")) {
    return predefinedResponses.experience;
  }
  if (lowerMessage.includes("project") || lowerMessage.includes("portfolio") || lowerMessage.includes("built")) {
    return predefinedResponses.projects;
  }
  if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("hire") || lowerMessage.includes("reach")) {
    return predefinedResponses.contact;
  }
  if (lowerMessage.includes("resume") || lowerMessage.includes("cv") || lowerMessage.includes("download")) {
    return predefinedResponses.resume;
  }
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "Hello! 👋 I'm here to help you learn more about Idah Daniel. Feel free to ask about his skills, experience, projects, or how to get in touch!";
  }

  return predefinedResponses.default;
};

// ✅ Message interface
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! 👋 I'm Idah's AI assistant. Ask me anything about his skills, experience, or projects!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = getResponse(input);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Chat button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center glow-cyan"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-87.5 h-125 glass-strong rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">
                    AI Assistant
                  </h3>
                  <p className="text-xs text-primary">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs">Typing...</span>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-foreground placeholder:text-muted-foreground"
                />
                <motion.button
                  type="submit"
                  className="p-2 bg-primary text-primary-foreground rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
