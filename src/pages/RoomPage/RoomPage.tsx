import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import { supabase } from "../../setup/supabase/client";
import { IRoom } from "../../types/rooom";

const RoomPage = () => {
  const { roomID } = useParams();
  const [roomDetails, setRoomDetails] = useState<IRoom | null>(null);
  const { userDetails } = useContext(AppContext)

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
        content: "asdasd", 
        roomID: roomID,
        sentByUsername: "Anurag",
        sentByUserID: "test-user-uid"
      })
      .select();

      console.log(res)
  };

  const fetchRoomMessages = async () => {
    const res = await supabase.from("messages").select().eq("roomID", roomID)
    console.log(res)
  }

  

  useEffect(() => {
    fetchRoom();
  }, [roomID]);

  return (
    <div className="w-full  bg-green-200 flex flex-col items-center justify-start">
      {/* <h1 className="text-4xl"> {roomDetails?.name} </h1>
      <button onClick={() => console.log(roomDetails)} > LOG ROOM DETAILS </button> */}

      <div className="w-full flex justify-between items-center p-5">
        <input type="text" placeholder="Type your message here...." />
        <button onClick={sendMessage}>Send</button>
        <button onClick={fetchRoomMessages}>fetchRoomMessages</button>

        <button onClick={() => console.log(userDetails)}> LOG USER FROM CONTENXT </button>
      </div>
    </div>
  );
};

export default RoomPage;
