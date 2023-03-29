import React, { useState, useEffect, useContext } from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import TextField from "../TextField/TextField";
import { HiPlus } from "react-icons/hi";
import { supabase } from "../../setup/supabase/client";
import { Link, useParams, useLocation } from "react-router-dom";
import { IRoom } from "../../types/rooom";
import HamBurgerMenu from "../HamBurgerMenu/HamBurgerMenu";
import { AppContext } from "../../context/AppContextProvider";

const Sidebar = () => {
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] =
    useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>("");
  const [rooms, setRooms] = useState<IRoom[] | any>([]);
  const { roomID }: any = useParams();
  const a = useLocation();

  const { isHamBurgerMenuVisible, setIsHamBurgerMenuVisible } =
    useContext(AppContext);

  const createRoom = async () => {
    const res = await supabase
      .from("rooms")
      .insert({
        name: roomName,
      })
      .select();

    setRoomName("");
    setIsCreateRoomModalOpen(false);

    if (res.error === null) setRooms([...rooms, res?.data[0]]);
  };

  const fetchAllRooms = async () => {
    const res = await supabase.from("rooms").select();

    if (res.status === 200 && res.error === null) {
      setRooms(res?.data);
    }
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    createRoom();
  };

  useEffect(() => {
    fetchAllRooms();
  }, []);

  return (
    <>
      <HamBurgerMenu>
        <aside className="flex flex-col items-center justify-start w-full h-full bg-white px-2">
          {/* Search bar and Create button */}
          <div className="w-full flex justify-center items-center md:px-1 lg:px-5 py-3 space-x-2 hover:cursor-pointer">
            <input
              type="search"
              placeholder="Search..."
              name="searchBar"
              className="w-full h-12 bg-white border-2 rounded-md placeholder:text-black text-black p-2 outline-brand font-medium"
            />
            <div
              className="h-12 aspect-square bg-brand flex justify-center items-center p-2 rounded-md"
              onClick={() => setIsCreateRoomModalOpen(!isCreateRoomModalOpen)}
            >
              <HiPlus color="white" size={"1.3rem"} />
            </div>
          </div>

          <div className="w-full h-full flex flex-col justify-start items-center space-y-3 overflow-x-hidden overflow-y-auto pb-10">
            {rooms &&
              rooms?.map((room: any) => {
                return (
                  <Link
                    to={`/room/${room.id}`}
                    key={room.id}
                    className={`w-full md:w-[90%] p-3 m-1 bg-light rounded-md active:bg-mid`}
                    onClick={() => setIsHamBurgerMenuVisible(!isHamBurgerMenuVisible)}
                  >
                    <span className="text-black">{room.name}</span>
                  </Link>
                );
              })}
          </div>

          <Modal
            isModalOpen={isCreateRoomModalOpen}
            setIsModalOpen={setIsCreateRoomModalOpen}
          >
            <div className="w-72 h-52 flex flex-col items-center justify-start">
              <form onSubmit={onFormSubmit}>
                <TextField
                  type="text"
                  placeholder=""
                  isSchema={false}
                  value={roomName}
                  onChange={(e: any) => setRoomName(e.target.value)}
                  name={"roomName"}
                  label={"Room name"}
                />

                <Button type={"submit"}> Create room </Button>
              </form>
            </div>
          </Modal>
        </aside>
      </HamBurgerMenu>

      {!isHamBurgerMenuVisible && (
        <aside className="hidden md:inline-flex flex-col items-center justify-start w-1/4 lg:w-[20%] xl:w-[15%] h-full bg-white border-r-2 border-r-brand">
          {/* Search bar and Create button */}
          <div className="w-full flex justify-center items-center md:px-1 lg:px-5 py-3 space-x-2 hover:cursor-pointer">
            <input
              type="search"
              placeholder="Search..."
              name="searchBar"
              className="w-full h-12 bg-white border-2 rounded-md placeholder:text-black text-black p-2 outline-brand font-medium"
            />
            <div
              className="h-12 aspect-square bg-brand flex justify-center items-center p-2 rounded-md"
              onClick={() => setIsCreateRoomModalOpen(!isCreateRoomModalOpen)}
            >
              <HiPlus color="white" size={"1.3rem"} />
            </div>
          </div>

          <div className="w-full h-full flex flex-col justify-start items-center space-y-3 overflow-x-hidden overflow-y-auto pb-10">
            {rooms &&
              rooms?.map((room: any) => {
                return (
                  <Link
                    to={`/room/${room.id}`}
                    key={room.id}
                    className={`w-full md:w-[90%] p-3 m-1 bg-light rounded-md active:bg-mid`}
                  >
                    <span className="text-black">{room.name}</span>
                  </Link>
                );
              })}
          </div>

          <Modal
            isModalOpen={isCreateRoomModalOpen}
            setIsModalOpen={setIsCreateRoomModalOpen}
          >
            <div className="w-72 h-52 flex flex-col items-center justify-start">
              <form onSubmit={onFormSubmit}>
                <TextField
                  type="text"
                  placeholder=""
                  isSchema={false}
                  value={roomName}
                  onChange={(e: any) => setRoomName(e.target.value)}
                  name={"roomName"}
                  label={"Room name"}
                />

                <Button type={"submit"}> Create room </Button>
              </form>
            </div>
          </Modal>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
