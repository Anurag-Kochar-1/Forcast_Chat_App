import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import { supabase } from "../../setup/supabase/client";
import { IRoom } from "../../types/rooom";
import { BiSend } from "react-icons/bi";
import Avatar from "../../components/Avatar/Avatar";
import MenuDropdown from "../../components/MenuDropdown/MenuDropdown";
import Button from "../../components/Button/Button";
import MessageCard from "../../components/MessageCard/MessageCard";

const RoomPage = () => {
  const { roomID } = useParams();
  const [roomDetails, setRoomDetails] = useState<IRoom | null>(null);
  const [messages, setMessages] = useState<any>([]);
  const [messageContent, setMessageContent] = useState<string>("");
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const { userDetails, isAuthModalOpen, setIsAuthModalOpen } =
    useContext(AppContext);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };
  const fetchRoom = async () => {
    const res = await supabase.from("rooms").select().eq("id", roomID);
    // console.log(res);
    if (res.status === 200 && res.error === null && res.data[0])
      setRoomDetails(res?.data[0] as IRoom);
  };

  const sendMessage = async () => {
    if (userDetails !== null) {
      if (messageContent.length !== 0) {
        const res = await supabase
          .from("messages")
          .insert({
            content: messageContent,
            roomID: roomID,
            sentByUsername: userDetails?.user?.user_metadata?.username,
            sentByUserID: userDetails?.user?.id,
          })
          .select();

        console.log(res);
        setMessageContent("");
        scrollToBottom();
      } else {
        alert("Type message");
      }
    } else {
      setIsAuthModalOpen(!isAuthModalOpen);
    }
  };

  const deleteMessage = async (id: number) => {
    const data = await supabase.from("messages").delete().eq("id", id);

    console.log(data);
  };

  const fetchRoomMessages = async () => {
    const res = await supabase.from("messages").select().eq("roomID", roomID);
    console.log(`fetchRoomMessages`);
    console.log(res);
    if (res.error === null) setMessages(res?.data);
  };

  useEffect(() => {
    console.log(`------ Second useEffect is running -------`);
    supabase
      .channel("any")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `roomID=eq.${roomID}`,
        },
        (payload) => {
          console.log("INSERT Change received!", payload);
          if (payload.errors === null) {
            setMessages((prevMessages: any) => [...prevMessages, payload?.new]);
            console.log(messages);
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "messages",
          filter: `roomID=eq.${roomID}`,
        },
        (payload) => {
          console.log("DELETE Change received!", payload);
          if (payload.errors === null)
            setMessages((prevMessages: any) =>
              prevMessages.filter(
                (message: any) => message.id !== payload.old.id
              )
            );
        }
      )
      .subscribe();
  }, [roomID]);

  //  filter: `roomID=eq.${roomID}`

  useEffect(() => {
    scrollToBottom();
    fetchRoom();
    fetchRoomMessages();
  }, [roomID]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <div className="w-full h-16 bg-light flex justify-between items-center py-1 px-2">
        <span className="font-medium text-xl">{roomDetails?.name}</span>
      </div>

      <div
        ref={messagesContainerRef}
        className="w-full h-full overflow-x-hidden overflow-y-auto flex flex-col items-center justify-start bg-white py-10 space-y-2"
      >
        {messages &&
          messages?.map((message: any) => {
            return (
              <MessageCard
                key={message.id}
                message={message}
                deleteMessage={deleteMessage}
              />
            );
          })}
      </div>

      {/* MESSAGE INPUT BAR */}
      <div className="w-full flex justify-center items-center bg-white p-2">
        <div className="w-full h-12 md:h-14 flex justify-center items-center bg-white border-2 rounded-md px-2">
          <input
            className="w-full h-full placeholder:text-gray-500 text-black p-2 font-medium outline-none"
            type="text"
            placeholder="Type your message here...."
            value={messageContent}
            onChange={(e: any) => setMessageContent(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <BiSend
            onClick={sendMessage}
            className="text-gray-500 h-12 md:h-14 text-2xl hover:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
