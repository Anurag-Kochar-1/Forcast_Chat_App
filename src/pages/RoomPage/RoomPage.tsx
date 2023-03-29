import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../setup/supabase/client";

const RoomPage = () => {
  const { roomID } = useParams();

  const fetchRoom = async () => {
    const res = await supabase.from("rooms").select().eq("id", roomID);
    console.log(res)
  };

  useEffect(() => {
    fetchRoom()
  },[roomID])

  return (
    <div>
      <h1 className="text-9xl"> {roomID} </h1>
    </div>
  );
};

export default RoomPage;
