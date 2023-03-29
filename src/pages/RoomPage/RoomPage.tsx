import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import { supabase } from "../../setup/supabase/client";
import { IRoom } from "../../types/rooom";
import { BiSend } from "react-icons/bi";
import Avatar from "../../components/Avatar/Avatar";

const RoomPage = () => {
  const { roomID } = useParams();
  const [roomDetails, setRoomDetails] = useState<IRoom | null>(null);
  const [messages, setMessages] = useState<any>([]);
  const [messageContent, setMessageContent] = useState<string>("");
  const { userDetails, isAuthModalOpen, setIsAuthModalOpen } =
    useContext(AppContext);

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
            sentByUsername: "Anurag",
            sentByUserID: "test-user-uid",
          })
          .select();

        console.log(res);
        setMessageContent("");
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
  }, []);

  //  filter: `roomID=eq.${roomID}`

  useEffect(() => {
    fetchRoom();
    fetchRoomMessages();
  }, [roomID]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <div className="w-full h-14 bg-light flex justify-between items-center p-1">
        {/* <button onClick={() => console.log(messages)}> LOG MESSAGES </button> */}
        <span
          className="font-medium text-base"
          onClick={() => console.log(userDetails)}
        >
          {" "}
          {roomDetails?.name}{" "}
        </span>
      </div>

      <div className="w-full h-full overflow-x-hidden overflow-y-auto flex flex-col items-center justify-start bg-white py-10">
        {messages &&
          messages?.map((message: any) => {
            return (
              <div key={message.id} className="p-2 m-2 space-x-3">
                <Avatar
                  letter={userDetails?.user?.user_metadata?.username[0]}
                  bgColor={
                    message.id === userDetails?.user?.id
                      ? "bg-[#6E40CE]"
                      : "bg-[#FF2D2D]"
                  }
                />
                <p className="text-2xl font-medium border-2 border-black">
                  {message.content}
                </p>
                <button onClick={() => deleteMessage(message?.id)}>
                  Delete
                </button>
              </div>
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
