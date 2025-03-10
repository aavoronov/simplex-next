import ChatModal from "@/components/modals/chatModal";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import ActiveChat from "@/components/chat/ActiveChat";
import ChatList from "@/components/chat/ChatList";
import { useAppDispatch, useAppSelector } from "@/utilities/hooks";
import socket from "@/utilities/socket";
import { axiosQuery } from "@/utilities/utilities";
import { getCookie } from "cookies-next";
import "react-medium-image-zoom/dist/styles.css";
import { useWindowSize } from "@/hooks/useWindowSize";
import { actionLoginTrue } from "@/store/actions/modal";
import SimplexChat from "@/components/chat/SimplexChat";
import SupportChat from "@/components/chat/SupportChat";

export interface User {
  id: number;
  name: string | null;
  profilePic?: string;
}

export interface Access {
  id: number;
  user: User;
}

export interface IChat {
  id: number;
  accesses: Access[];
  type?: "simplex" | "support" | "user";
}

interface RootRoomAccess {
  id: number;
  chat: IChat;
}
export interface IncomingMessage {
  message: string;
  createdAt: string;
  name: string;
  userId: number;
  roomId: number;
  files?: string[];
  previews?: string[];
  delivered: boolean;
}

export interface OutgoingMessage {
  text: string;
  login: string;
  userId: number;
  roomId: number;
  files?: Array<{
    file: File;
    filename: string;
  }>;
  previews?: string[];
}

interface TimeRecord {
  userId: number;
  time: string;
  chat: number;
}

const simplexChat: RootRoomAccess = {
  id: -1,
  chat: {
    type: "simplex",
    id: -1,
    accesses: [
      {
        id: 0,
        user: {
          id: 0,
          name: "SimpleX",
        },
      },
    ],
  },
};

const supportChat: RootRoomAccess = {
  id: -2,
  chat: {
    type: "support",
    id: -2,
    accesses: [
      {
        id: 0,
        user: {
          id: 0,
          name: "Поддержка",
        },
      },
    ],
  },
};

interface SystemMessageParams {
  createdAt: string;
  name: string;
}

const simplexMessage: (params: SystemMessageParams) => IncomingMessage = (params) => ({
  message: `${params.name}, добро пожаловать на Playerok!\n\nТеперь вы можете:\n1. Купить товар\n2. Выставить свой товар на продажу\n\nЕсли будут вопросы, напишите нам в поддержку`,
  createdAt: params.createdAt,
  name: "SimpleX",
  userId: 0,
  roomId: -1,
  delivered: true,
});

const supportMessage: (params: Pick<SystemMessageParams, "createdAt">, userId: number) => IncomingMessage = (params, userId) => ({
  message: "Задать вопрос",
  createdAt: params.createdAt,
  name: "Поддержка",
  userId: userId,
  roomId: -2,
  delivered: true,
});

export default function Chat() {
  const { id, login, name, createdAt } = useAppSelector((state) => state.user);

  const token = getCookie("simple-token");
  const dispatch = useAppDispatch();

  if (!token) {
    dispatch(actionLoginTrue());
  }

  const [chats, setChats] = useState<RootRoomAccess[]>([simplexChat, supportChat]);
  const [activeChatId, setActiveChatId] = useState<number>(null);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [messages, setMessages] = useState<IncomingMessage[]>([]);
  const [scrollPage, setScrollPage] = useState(0);
  const [startReached, setStartReached] = useState(false);
  const [users, setUsers] = useState([]);
  const [userTimeRecords, setUserTimeRecords] = useState<TimeRecord[]>([]);

  const { width } = useWindowSize();

  const getChats = async () => {
    const res = await axiosQuery({ url: "/chat-rooms" });
    console.log(res.data);
    setChats((prev) => [...prev, ...res.data]);
  };

  const dummyRef: MutableRefObject<HTMLDivElement> = useRef();

  const scrollToBottom = () => {
    if (dummyRef.current) {
      dummyRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  const getMessages = async () => {
    if (!!login) {
      try {
        const res = await axiosQuery({ url: "/chat" });

        const fetchedMessages: IncomingMessage[] = res.data.data.map((item) => {
          const serverDate = item.createdAt;
          const localDate = new Date(serverDate);
          const name = item.name;
          // const profilePic = item.chatAd ? item.user.workerProfile.profilePic : item.user.profile.profilePic;
          return {
            message: item.message,
            createdAt: item.createdAt,
            name: name,
            userId: item.user.id,

            // profilePic: profilePic,
            files: item.files,
            roomId: item.roomId,
            delivered: item.delivered,
          };
        });
        // console.log(initialMessages);
        // if (!fetchedMessages.length) setStartReached((prev) => !prev);
        setMessages([simplexMessage({ createdAt, name: login }), supportMessage({ createdAt }, id), ...fetchedMessages]);
        // console.log(messages);
        setScrollPage((prev) => prev + 1);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (id) {
      getChats();
    }
  }, [id]);

  useEffect(() => {
    if (chats.length) {
      getMessages();
    }
    // sendPing();
  }, [chats]);

  useEffect(() => {
    if (!!chats.length && id) {
      socket.auth = { token: getCookie("simple-token") };
      socket.connect();
      console.log("connected");
      socket.on("connect", () => {
        setIsConnected(socket.connected);
        console.log("socket.connected", socket.connected);
      });

      socket.on("connect_error", (err) => {
        // if (err.message === "invalid username") {
        //   this.usernameAlreadySelected = false;
        // }
        console.log(err);
      });

      socket.on("disconnect", () => {
        setIsConnected(socket.connected);
        console.log("socket.connected", socket.connected);
      });

      socket.on("users", (users) => {
        console.log("users", users);
        setUsers(users);
      });

      socket.on("userConnected", (user) => {
        console.log("userConnected", user);
        setUsers((prev) => [...prev, user]);
      });

      socket.on("userDisconnected", (user) => {
        console.log("userDisconnected", user);
        setUsers((prev) => prev.filter((item) => item !== user));
      });

      socket.on("pong", (timeRecord) => {
        // setLastPong(new Date().toISOString());
        console.log(timeRecord);
        setUserTimeRecords((prev) => {
          const existingRecord = prev.find((item) => item.userId === timeRecord.userId && item.chat === timeRecord.chat);
          if (existingRecord) {
            console.log("existing", prev.splice(prev.indexOf(existingRecord), 1, timeRecord));
            return prev.splice(prev.indexOf(existingRecord), 1, timeRecord);
          } else {
            console.log("new");
            return [...prev, timeRecord];
          }
        });
        // console.log("pong!");
      });

      socket.on("message", (data) => {
        handleNewMessage(data);
        console.log(data);
        // console.log("new msg");
      });

      socket.emit(
        "joinRoom",
        chats.map((item) => item.chat.id),
        id
      );

      socket.on("joinRoom", (data) => {
        console.log("joinRoom", data);
        // console.log("new msg");
      });

      socket.on("leaveRoom", (data) => {
        console.log("leaveRoom", data);
        // console.log("new msg");
      });

      // socket.emit("message", { login: "login", name: null, roomId: 1, text: ",,,", userId: 1 });

      return () => {
        socket.emit(
          "leaveRoom",
          chats.map((item) => item.chat.id),
          id
        );
        socket.off("connect");
        socket.off("connect_error");
        socket.off("disconnect");
        socket.off("pong");
        socket.off("userConnected");
        socket.off("userDisconnected");
        socket.off("message");
        socket.off("joinRoom");
        socket.off("leaveRoom");
        socket.off("users");
        socket.disconnect();
      };
    }
  }, [chats, id]);

  const handleNewMessage = (data) => {
    setMessages((prev) => [...prev, data]);
    scrollToBottom();
  };

  // const MemoizedActiveChat = memo(ActiveChat);
  return (
    <>
      <MainLayout title={"Профиль"}>
        <div className='content-column chat-page'>
          <div className='container'>
            <div className='chat-block d-grid'>
              <div className='chat-sidebar h-100 overflow-hidden'>
                <div className='d-flex flex-column h-100'>
                  <div className='chat-persons-list overflow-auto'>
                    <></>
                    {chats.length && (
                      <ChatList
                        chats={chats.map((item) => item.chat)}
                        setActiveChatId={setActiveChatId}
                        users={users}
                        messages={messages}
                      />
                    )}
                  </div>
                </div>
              </div>

              {!!activeChatId ? (
                !chats.find((item) => item.chat.id === activeChatId).chat.type ? (
                  <ActiveChat
                    socket={socket}
                    isConnected={isConnected}
                    startReached={startReached}
                    setStartReached={setStartReached}
                    scrollPage={scrollPage}
                    setScrollPage={setScrollPage}
                    activeChatId={activeChatId}
                    messages={messages}
                    setMessages={setMessages}
                    setActiveChatId={setActiveChatId}
                    chats={chats.map((item) => item.chat)}
                    users={users}
                    scrollToBottom={scrollToBottom}
                    userTimeRecords={userTimeRecords}
                    ref={dummyRef}
                  />
                ) : chats.find((item) => item.chat.id === activeChatId).chat.type === "simplex" ? (
                  <SimplexChat
                    activeChatId={activeChatId}
                    messages={messages}
                    setActiveChatId={setActiveChatId}
                    chats={chats.map((item) => item.chat)}
                    users={users}
                    userTimeRecords={userTimeRecords}
                  />
                ) : (
                  <SupportChat
                    startReached={startReached}
                    setStartReached={setStartReached}
                    scrollPage={scrollPage}
                    setScrollPage={setScrollPage}
                    activeChatId={activeChatId}
                    messages={messages}
                    setMessages={setMessages}
                    setActiveChatId={setActiveChatId}
                    chats={chats.map((item) => item.chat)}
                    users={users}
                    scrollToBottom={scrollToBottom}
                    userTimeRecords={userTimeRecords}
                    ref={dummyRef}
                  />
                )
              ) : (
                width > 1024 && <div className='empty_chat'>Выберите диалог для переписки</div>
              )}
            </div>
          </div>
        </div>
        <ChatModal />
      </MainLayout>
    </>
  );
}
