import React, { useContext } from "react";
import "./ContactCenter.css";
import ChatList from "./ChatList/ChatList";
import ChatInfo from "./ChatInfo/ChatInfo";
import ChatMain from "./ChatMain/ChatMain";
import { AdminContext } from "../../Context/AdminContext";
import BackDrop from "../BackDrop/BackDrop";

const ContactCenter = () => {
  const { chats, selectedChat, handleChatClick } = useContext(AdminContext);
  return (
    <div className="contact-container">
      <ChatList
        chats={chats}
        selectedChat={selectedChat}
        handleChatClick={handleChatClick}
      />
      <ChatMain selectedChat={selectedChat} />
      <ChatInfo selectedChat={selectedChat} />
      <BackDrop />
    </div>
  );
};

export default ContactCenter;
