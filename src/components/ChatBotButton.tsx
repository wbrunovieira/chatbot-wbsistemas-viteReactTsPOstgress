// ChatBotButton.tsx
import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FiMessageCircle } from "react-icons/fi"; // Usando ícone de chat

const ChatBotButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // useGSAP to manage animations
    useGSAP(
        () => {
            if (isOpen) {
                gsap.fromTo(
                    modalRef.current,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
                );
            } else {
                gsap.to(modalRef.current, {
                    opacity: 0,
                    y: 50,
                    duration: 0.5,
                    ease: "power3.in",
                });
            }
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef}>
            {/* Botão flutuante com ícone de chatbot */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-custom-purple text-white p-5 rounded-full shadow-xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-custom-purple focus:ring-opacity-50"
                aria-label="Abrir Chatbot"
            >
                <FiMessageCircle className="h-7 w-7" /> {/* Ícone de Chat */}
            </button>

            {/* Modal de conversa com animação GSAP */}
            {isOpen && (
                <div className="fixed inset-0 flex items-end justify-end p-6">
                    <div
                        ref={modalRef}
                        className="bg-white rounded-lg shadow-2xl w-full max-w-md transform transition-transform"
                    >
                        {/* Cabeçalho do modal com fundo tech preenchido */}
                        <div className="relative flex justify-between items-center p-4 bg-gradient-to-r from-custom-purple to-primary text-white rounded-t-lg overflow-hidden">
                            {/* Título */}
                            <h2 className="text-xl font-semibold z-10">
                                Chatbot
                            </h2>

                            {/* Botão de Fechar */}
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

                            {/* SVG de fundo - dots mais espalhados */}
                            <svg
                                className="absolute inset-0 h-full w-full opacity-20"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 400 100" // Tamanho ajustado para preencher o header
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

                        {/* Corpo do modal */}
                        <div className="p-5 text-gray-700">
                            <p className="mb-4">Como posso ajudar você hoje?</p>
                            <input
                                type="text"
                                placeholder="Digite sua mensagem..."
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-custom-purple focus:ring-2 focus:ring-custom-purple transition-all duration-200"
                            />
                            <button
                                className="mt-4 w-full bg-custom-purple text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50 transition-all duration-300"
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
