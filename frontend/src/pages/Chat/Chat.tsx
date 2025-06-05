import React from "react";
import Header from "../../components/Header/Header";
import ChatWindow from "./ChatScreen/ChatWindow";
import UsersList from "./ChatScreen/UsersList";

const Chat: React.FC = () => {
  return (
    <>
      <Header>
        <></>
      </Header>

      <div className="bg-stone-100 m-2.5 flex" style={{ height: "calc(100vh - 13vh)" }}>
        <div className="border-r border-gray-300 w-1/5">
          <UsersList />
        </div>
        <div className="flex-1">
          <ChatWindow />
        </div>
      </div>
    </>
  );
};

export default Chat;
