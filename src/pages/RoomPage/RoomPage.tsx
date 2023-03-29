import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import { supabase } from "../../setup/supabase/client";
import { IRoom } from "../../types/rooom";

const RoomPage = () => {
  const { roomID } = useParams();
  const [roomDetails, setRoomDetails] = useState<IRoom | null>(null);
  const [messages, setMessages] = useState<any>([]);
  const [messageContent, setMessageContent] = useState<string>("");
  const { userDetails } = useContext(AppContext);

  const fetchRoom = async () => {
    const res = await supabase.from("rooms").select().eq("id", roomID);
    // console.log(res);
    if (res.status === 200 && res.error === null && res.data[0])
      setRoomDetails(res?.data[0] as IRoom);
  };

  const sendMessage = async () => {
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
          if(payload.errors === null) setMessages((prevMessages: any) => prevMessages.filter((message: any) => message.id !== payload.old.id) );
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
    <div className="w-full h-full  flex flex-col items-center justify-between">
      {/* <h1 className="text-4xl"> {roomDetails?.name} </h1> */}
      <button onClick={() => console.log(messages)}> LOG MESSAGES </button>

      <div className="w-full h-full overflow-x-hidden overflow-y-auto flex flex-col items-center justify-start bg-green-600 py-10">
        {messages &&
          messages?.map((message: any) => {
            return (
              <div key={message.id} className="p-2 m-2 space-x-3">
                <p className="text-2xl font-medium border-2 border-black">
                  {" "}
                  {message.content}{" "}
                </p>
                <button onClick={() => deleteMessage(message?.id)}>
                  {" "}
                  Delete{" "}
                </button>
              </div>
            );
          })}
      </div>

      <div className="w-full flex justify-between items-center p-5 bg-green-200">
        <input
          type="text"
          placeholder="Type your message here...."
          value={messageContent}
          onChange={(e: any) => setMessageContent(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>

        {/* <button onClick={fetchRoomMessages}>fetchRoomMessages</button> */}
        {/* <button onClick={() => console.log(userDetails)}> LOG USER FROM CONTENXT </button> */}
      </div>
    </div>
  );
};

export default RoomPage;
