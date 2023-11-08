import { useWindowSize } from "@/hooks/useWindowSize";
import { SetState, axiosQuery, getHumanReadableDate, getHumanReadableDateCompare } from "@/utilities/utilities";
import { MutableRefObject, Ref, forwardRef, useEffect, useRef, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { Socket } from "socket.io-client";
import ChatMessage from "./ChatMessage";
import { IChat, IncomingMessage, OutgoingMessage } from "@/pages/chat";
import { useAppSelector } from "@/utilities/hooks";
import ChatInputField from "./ChatInputField";

interface Props {
  activeChatId: number;
  messages: IncomingMessage[];
  setActiveChatId: SetState<number>;
  chats: IChat[];
  users: number[];
  userTimeRecords: { userId: number; time: string; chat: number }[];
}

const SimplexChat = ({ activeChatId, messages, setActiveChatId, chats, users, userTimeRecords }: Props) => {
  const user = chats.find((item) => item.id === activeChatId).accesses[0].user;

  const { width } = useWindowSize();

  return (
    <div className='chat-content h-100 overflow-hidden'>
      <div className='d-flex flex-column justify-content-center align-items-center h-100'>
        <div className='chat-header d-flex align-items-center w-100'>
          {width <= 1024 && (
            <button className='btn btn_chat-back' onClick={() => setActiveChatId(null)}>
              <img src='../images/back_arrow.svg' alt='' />
            </button>
          )}
          <div tabIndex={0} className={`chat-person-item d-flex`}>
            <div className='seller-ava chat-person-ava position-relative'>
              <div className='seller-ava-image w-100 h-100'>
                {user.profilePic ? (
                  <img className='w-100 h-100' src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/users/${user.profilePic}`} alt='' />
                ) : (
                  <img className='w-100 h-100' src='../images/anonymous.png' alt='' />
                )}
              </div>
              <div className='online-check position-absolute'></div>
            </div>
            <div className='chat-person-info'>
              <div className='chat-person-info_head d-flex align-items-center justify-content-between'>
                <div className='chat-person-name d-flex align-items-center'>
                  {user.name}
                  <div className='verify-icon'>
                    <img src='../images/verify.svg' alt='' />
                  </div>
                </div>
              </div>
              <div className='chat-person-text two-lines'>Работаем 24/7</div>
            </div>
          </div>
        </div>

        <div className='chat-messages overflow-auto w-100'>
          <div className='date-bar text-center'>Начало истории чата</div>

          {(() => {
            const msgs = messages;
            return msgs
              .filter((item) => item.roomId === activeChatId)
              .map((item, index) => {
                let date = "";

                if (!!item.createdAt) {
                  if (index === 0) {
                    date = getHumanReadableDate(item.createdAt);
                  } else {
                    date = getHumanReadableDateCompare(
                      msgs.filter((item) => item.roomId === activeChatId)[index - 1].createdAt,
                      item.createdAt
                    );
                  }
                }
                // console.log(messages.filter((item) => item.roomId === currentChatId));
                return (
                  <>
                    {date && <div className='date-bar text-center'>{date}</div>}

                    <ChatMessage key={index} message={item} userTimeRecords={userTimeRecords} otherUserId={user.id} />
                  </>
                );
              });
          })()}
        </div>
      </div>
    </div>
  );
};

export default SimplexChat;
