import React from "react";
import axios from "axios";

const ChatPage = () => {
  const [chats, setChats] = React.useState([]);
  const fetchChats = async () => {
    const { data } = await axios.get("/api/chat");
    setChats(data);
  };
  React.useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
      chats
    </div>
  );
};

export default ChatPage;
