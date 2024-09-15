// ChatBotButton.tsx
import React, { useState } from 'react';

const ChatBotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-custom-purple text-white p-4 rounded-full shadow-lg transform transition-transform hover:scale-110 focus:outline-none"
      >
        {/* Ícone do chat */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M21 16v-1a3 3 0 00-3-3H6a3 3 0 00-3 3v1a3 3 0 003 3h4l2 2 2-2h4a3 3 0 003-3z"
          />
        </svg>
      </button>

      {/* Modal de conversa */}
      {isOpen && (
        <div className="fixed inset-0 flex items-end justify-end p-6">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm">
            {/* Cabeçalho do modal */}
            <div className="flex justify-between items-center p-4 bg-primary text-white rounded-t-lg">
              <h2 className="text-lg font-semibold">Chatbot</h2>
              <button onClick={() => setIsOpen(false)} className="focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Corpo do modal */}
            <div className="p-4 text-secondary">
              <p>Como posso ajudar você hoje?</p>
              {/* Aqui você pode adicionar o componente do chatbot */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotButton;
