import { useWindowSize } from "@/hooks/useWindowSize";
import { SetState, axiosQuery, getHumanReadableDate, getHumanReadableDateCompare } from "@/utilities/utilities";
import { MutableRefObject, Ref, forwardRef, useEffect, useRef, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { Socket } from "socket.io-client";
import ChatMessage from "./ChatMessage";
import { IChat, IncomingMessage, OutgoingMessage } from "@/pages/chat";
import { useAppSelector } from "@/utilities/hooks";
import ChatInputField from "./ChatInputField";
import FirstLetter from "../FirstLetter";

interface Props {
  startReached: boolean;
  setStartReached: SetState<boolean>;
  scrollPage: number;
  setScrollPage: SetState<number>;
  activeChatId: number;
  messages: IncomingMessage[];
  setMessages: SetState<IncomingMessage[]>;
  setActiveChatId: SetState<number>;
  chats: IChat[];
  users: number[];
  scrollToBottom: () => void;
  userTimeRecords: { userId: number; time: string; chat: number }[];
}

const SupportChat = forwardRef(
  (
    {
      startReached,
      setStartReached,
      scrollPage,
      setScrollPage,
      activeChatId,
      messages,
      setMessages,
      setActiveChatId,
      chats,
      users,
      scrollToBottom,
      userTimeRecords,
    }: Props,
    ref: MutableRefObject<HTMLDivElement>
  ) => {
    const user = chats.find((item) => item.id === activeChatId).accesses[0].user;
    const isOnline = users.includes(user.id);

    const chatRef = useRef(null);

    const { width } = useWindowSize();
    const { login, profilePic } = useAppSelector((state) => state.user);

    useEffect(() => {
      scrollToBottom();
    }, []);

    const modifyChatInput = (text: string, setState: SetState<string>) => {
      setState(text);
    };

    //

    async function getMoreMessages() {
      if (!startReached) {
        try {
          const res = await axiosQuery({ url: `/chat/more?page=${scrollPage}&chat=${activeChatId}` });

          const fetchedMessages = res.data.data.map((item) => {
            return {
              message: item.message,
              createdAt: item.createdAt,
              name: item.name,
              user: {
                id: item.user.id,
              },
              // profilePic: profilePic,
              // file: item.file,

              roomId: item.roomId,
            };
          });

          console.log(fetchedMessages.length);
          if (fetchedMessages.length === 0) {
            setStartReached(true);
          }
          setMessages([...fetchedMessages, ...messages]);
          setScrollPage((prev) => prev + 1);
        } catch (e) {
          console.log(e);
        }
      }
    }

    const handleScrollUp = (e) => {
      let element = e.target;
      if (element.scrollTop === 0 && !startReached) {
        console.log({ startReached });
        getMoreMessages();
      }
    };

    const supportMessageHasBeenAdded = messages.filter((item) => item.roomId === -2).length > 1;

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
                    <FirstLetter nickname='Поддержка' width={38} height={38} fontSize={25} />
                  )}
                </div>
                {isOnline && <div className='online-check position-absolute'></div>}
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

          <div className='chat-messages overflow-auto w-100' ref={chatRef} onScroll={handleScrollUp}>
            {startReached && <div className='date-bar text-center'>Начало истории чата</div>}

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
            {supportMessageHasBeenAdded && (
              <div className='date-bar text-center'>Ожидайте, ваш вопрос на рассмотрении. Мы ответим в ближайшее время</div>
            )}

            <div className='scroll-dummy' ref={ref}></div>
          </div>
          <div className='chat-footer w-100'>
            <ChatInputField socket={null} activeChatId={activeChatId} isConnected={true} setMessages={setMessages} />
          </div>
        </div>
      </div>
    );
  }
);

export default SupportChat;
