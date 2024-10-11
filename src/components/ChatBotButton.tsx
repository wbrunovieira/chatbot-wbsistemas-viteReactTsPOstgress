import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FiMessageCircle } from "react-icons/fi";
import { io, Socket } from "socket.io-client";

interface Message {
    text: string;
    isUser: boolean;
}

const ChatBotButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [newMessageBadge, setNewMessageBadge] = useState(false);

    const socketRef = useRef<Socket | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useGSAP(
        () => {
            if (isOpen) {
                gsap.fromTo(
                    modalRef.current,
                    { opacity: 0, scaleY: 0.5, scaleX: 0.7, y: 200 },
                    {
                        opacity: 1,
                        scaleY: 1,
                        scaleX: 1,
                        y: 0,
                        duration: 2,
                        ease: "elastic.out(1, 0.5)",
                    }
                );
                setNewMessageBadge(false);
            } else {
                gsap.to(modalRef.current, {
                    opacity: 0,
                    scaleY: 0.5,
                    scaleX: 0.7,
                    y: 200,
                    duration: 0.8,
                    ease: "elastic.in(1, 0.5)",
                });
            }
        },

        { scope: containerRef }
    );

    useEffect(() => {
        
        try {
            socketRef.current = io("http://localhost:3000");

           
            socketRef.current.on("messageToClient", (message) => {
                console.log("Received message from server:", message);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: message.text, isUser: false },
                ]);
                setIsTyping(false);
            });
        } catch (error) {
            console.error("Error initializing WebSocket connection:", error);
        }

        return () => {
           
            socketRef.current?.disconnect();
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            openAnimation();
            setNewMessageBadge(false);
        } else if (!isAnimating && modalRef.current) {
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleEscKey);
        return () => {
            window.removeEventListener("keydown", handleEscKey);
        };
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const openAnimation = () => {
        gsap.fromTo(
            modalRef.current,
            { opacity: 0, scaleY: 0.5, scaleX: 0.7, y: 200 },
            {
                opacity: 1,
                scaleY: 1,
                scaleX: 1,
                y: 0,
                duration: 1,
                ease: "elastic.out(1, 0.5)",
                onStart: () => setIsAnimating(true),
                onComplete: () => setIsAnimating(false),
            }
        );
    };

    const sendMessage = (text?: string) => {
        const messageToSend = text ? text : inputValue;
        if (messageToSend.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: messageToSend, isUser: true },
            ]);
            setInputValue("");

            setIsTyping(true);

            try {
                socketRef.current?.emit("messageToServer", {
                    text: messageToSend,
                    user: "User",
                });
            } catch (error) {
                console.error("Error sending message to server:", error);
            }
        }
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            sendMessage();
        } else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            setInputValue((prevValue) => prevValue + "\n");
        }
    };

    return (
        <div ref={containerRef}>
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 bg-custom-purple text-white p-5 rounded-full shadow-xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-custom-purple focus:ring-opacity-50"
                style={{
                    position: "fixed",
                    bottom: "1.5rem",
                    right: "1.5rem",
                    zIndex: 50,
                }}
                aria-label="Abrir Chatbot"
            >
                <FiMessageCircle className="h-7 w-7" />
                {newMessageBadge && (
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
                )}
            </button>

            {isOpen && (
                <div className="fixed top-0 right-4 flex items-end justify-end p-2 z-40">
                    <div
                        ref={modalRef}
                        className="bg-white rounded-lg shadow-2xl w-full max-w-md transform transition-transform"
                        role="dialog"
                        aria-live="polite"
                    >
                        <div className="relative flex justify-between items-center p-4 bg-gradient-to-r from-custom-purple to-primary text-white rounded-t-lg overflow-hidden">
                            <h2 className="text-xl font-semibold z-10">
                                Chatbot
                            </h2>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="focus:outline-none hover:text-gray-300 transition-colors z-10"
                                aria-label="Fechar Chatbot"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            <svg
                                className="absolute inset-0 h-full w-full opacity-20"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 400 100"
                            >
                                <defs>
                                    <pattern
                                        id="dots"
                                        x="0"
                                        y="0"
                                        width="40"
                                        height="40"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <circle
                                            cx="5"
                                            cy="5"
                                            r="2"
                                            fill="white"
                                        />
                                    </pattern>
                                </defs>
                                <rect
                                    width="600"
                                    height="100"
                                    fill="url(#dots)"
                                />
                                <line
                                    x1="0"
                                    y1="0"
                                    x2="400"
                                    y2="100"
                                    stroke="white"
                                    strokeWidth="0.5"
                                />
                                <line
                                    x1="400"
                                    y1="0"
                                    x2="0"
                                    y2="100"
                                    stroke="white"
                                    strokeWidth="0.5"
                                />
                            </svg>
                        </div>

                        <div className="p-5 text-gray-700">
                            <div className="mb-4 max-h-60 overflow-y-auto">
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`mb-2 p-3 max-w-[80%] rounded-lg transition-transform transform ${
                                            msg.isUser
                                                ? "bg-custom-purple text-white self-end ml-auto"
                                                : "bg-gray-200 text-black self-start mr-auto"
                                        }`}
                                        style={{
                                            textAlign: msg.isUser
                                                ? "right"
                                                : "left",
                                            boxShadow: msg.isUser
                                                ? "0 2px 10px rgba(0, 0, 0, 0.2)"
                                                : "0 2px 10px rgba(0, 0, 0, 0.05)",
                                        }}
                                    >
                                        {msg.isUser ? (
                                            <span className="font-bold">
                                                Você:
                                            </span>
                                        ) : (
                                            <span className="font-bold">
                                                Bot:
                                            </span>
                                        )}{" "}
                                        {msg.text}
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="mb-2 p-2 max-w-[80%] bg-gray-200 text-black self-start mr-auto rounded-lg">
                                        Bot está digitando...
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            <div className="flex space-x-2 mb-2">
                                <button
                                    onClick={() =>
                                        sendMessage("Fale com um humano")
                                    }
                                    className="bg-secondary text-black py-1 px-2 text-[0.7rem] rounded-lg shadow-sm hover:bg-gray-300"
                                >
                                    Fale com um humano
                                </button>
                                <button
                                    onClick={() => sendMessage("Ajuda")}
                                    className="bg-secondary text-black py-1 px-4 rounded-lg text-[0.7rem] shadow-sm hover:bg-gray-300"
                                >
                                    Ajuda
                                </button>
                                <button
                                    onClick={() =>
                                        sendMessage("Iniciar de novo")
                                    }
                                    className="bg-secondary text-black py-1 px-4 rounded-lg text-[0.7rem] shadow-sm hover:bg-gray-300"
                                >
                                    Iniciar de novo
                                </button>
                            </div>

                            <textarea
                                placeholder="Digite sua mensagem..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-custom-purple focus:ring-2 focus:ring-custom-purple transition-all duration-200 resize-none"
                                rows={3}
                            />

                            <button
                                onClick={() => sendMessage()}
                                disabled={!inputValue.trim()}
                                className={`mt-4 w-full py-2 px-4 rounded-lg shadow-md transition-all duration-300 ${
                                    inputValue.trim()
                                        ? "bg-custom-purple text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50"
                                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                }`}
                                aria-label="Enviar mensagem"
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBotButton;
