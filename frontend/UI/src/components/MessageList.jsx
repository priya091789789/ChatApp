// src/components/MessageList.jsx

const MessageList = ({ messages }) => {
    return (
      <div className="flex flex-col space-y-3 p-4 bg-gray-800 rounded-lg max-h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="font-bold text-white">{message.sender}</span>
            <span className="text-gray-300">{message.message}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default MessageList;
  