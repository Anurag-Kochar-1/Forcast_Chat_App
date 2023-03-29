import React from "react";
import { Link } from "react-router-dom";
import { IRoom } from "../../types/rooom";

interface IProps {
  room: IRoom;
  roomCardSelected: IRoom | [];
  setRoomCardSelected: React.Dispatch<React.SetStateAction<IRoom | []>>;
  onClick: any
}

const RoomCard = ({ room, roomCardSelected, setRoomCardSelected, onClick }: IProps) => {
  return (
    <Link
      to={`/room/${room.id}`}
      key={room.id}
      className={`w-full md:w-[90%] p-3 m-1 bg-light rounded-md active:bg-mid ${
        roomCardSelected === room && `border-2 border-brand`
      }`}
      onClick={onClick}
    >
      <span className="text-black">{room.name}</span>
    </Link>
  );
};

export default RoomCard;
