import React, { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { IMessage } from "../../types/message";
import Avatar from "../Avatar/Avatar";
import MenuDropdown from "../MenuDropdown/MenuDropdown";

interface IMessageCard {
  message: IMessage;
  deleteMessage: (id: number) => Promise<void>;
}

const MessageCard = ({ message, deleteMessage }: IMessageCard) => {
  const { userDetails } = useContext(AppContext);
  return (
    <div
      className={`w-full flex ${
        message.sentByUserID === userDetails?.user?.id
          ? "justify-end"
          : "justify-start"
      }  `}

      onClick={() => {console.log(message)}}
    >
      <div className="flex justify-center items-start space-x-2 p-2 m-2">
        {message.sentByUserID !== userDetails?.user?.id && (
          <Avatar
            letter={message?.sentByUsername[0]}
            bgColor={
              message.id === userDetails?.user?.id
                ? "bg-[#6E40CE]"
                : "bg-[#FF2D2D]"
            }
          />
        )}
        
        <div
          className={`p-4 flex flex-col justify-start items-start rounded-md ${
            message.sentByUserID === userDetails?.user?.id
              ? "bg-brand"
              : "bg-light"
          } `}
        >
          <div className="w-full flex justify-between items-center">
            <p
              className={`text-base font-medium ${
                message.sentByUserID === userDetails?.user?.id
                  ? "text-white"
                  : "text-black"
              } `}
            >
              {message.sentByUsername}
            </p>

            {message.sentByUserID === userDetails?.user?.id && (
              <MenuDropdown>
                <div className="py-1 border border-red-200 rounded-md">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                    onClick={() => {
                      deleteMessage(message?.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </MenuDropdown>
            )}
          </div>

          <p
            className={`text-base font-normal ${
              message.sentByUserID === userDetails?.user?.id
                ? "text-white"
                : "text-black"
            } `}
          >
            {message.content}
          </p>
        </div>

        {message.sentByUserID === userDetails?.user?.id && (
          <Avatar
            letter={message?.sentByUsername[0]}
            bgColor={
              message.id === userDetails?.user?.id
                ? "bg-[#6E40CE]"
                : "bg-[#FF2D2D]"
            }
          />
        )}
      </div>
    </div>
  );
};

export default MessageCard;
