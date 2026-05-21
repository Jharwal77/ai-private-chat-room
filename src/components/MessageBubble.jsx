export default function MessageBubble({ message }) {

  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>

      <div
        className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow
        ${isUser
          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          : "bg-gray-200 text-gray-800"
        }`}
      >
        {message.text}

        {message.image && (
          <img
            src={message.image}
            className="mt-2 rounded-xl"
          />
        )}
      </div>

    </div>
  );
}