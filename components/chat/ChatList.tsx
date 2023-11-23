import { IChat, IncomingMessage } from "@/pages/chat";
import { useAppSelector } from "@/utilities/hooks";
import { SetState, currentDatetime } from "@/utilities/utilities";
import FirstLetter from "../FirstLetter";

const Chat = ({
  chat,
  setActiveChatId,
  isOnline,
  messages,
  currentUserId,
}: {
  chat: IChat;
  setActiveChatId: SetState<number>;
  isOnline: boolean;
  messages: IncomingMessage[];
  currentUserId: number;
}) => {
  const currentChatMessages = messages.filter((item) => item.roomId === chat.id);

  let lastMessage = null;
  let lastMessageIsMine = false;

  if (currentChatMessages.length) {
    lastMessage = currentChatMessages[currentChatMessages.length - 1];
    lastMessageIsMine = lastMessage.userId === currentUserId;
  }

  return (
    <div tabIndex={0} role='button' className={`chat-person-item d-flex`} onClick={() => setActiveChatId(chat.id)}>
      <div className='seller-ava chat-person-ava position-relative'>
        <div className='seller-ava-image w-100 h-100'>
          {chat.accesses[0].user.profilePic ? (
            <img
              className='w-100 h-100'
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/users/${chat.accesses[0].user.profilePic}`}
              alt=''
            />
          ) : (
            <FirstLetter nickname={chat.accesses[0].user.name} />
          )}
        </div>
        {(isOnline || !!chat.type) && <div className='online-check position-absolute'></div>}
      </div>
      <div className='chat-person-info'>
        <div className='chat-person-info_head d-flex align-items-center justify-content-between'>
          <div className='chat-person-name d-flex align-items-center'>
            {chat.accesses[0].user.name}
            <div className='verify-icon'>
              <img src='../images/verify.svg' alt='' />
            </div>
          </div>
          {!!currentChatMessages.length && <div className='dialog-time'>{currentDatetime(lastMessage.createdAt)}</div>}
        </div>
        {/* <div className='chat-person-text two-lines'>{!!messages.length && messages[messages.length - 1].message}</div> */}
        {!!currentChatMessages.length && (
          <div className='chat-person-text two-lines'>
            {(lastMessageIsMine ? "Вы: " : chat.accesses[0].user.name + ": ") + lastMessage?.message}
          </div>
        )}
      </div>
    </div>
  );
};

const ChatList = ({
  chats,
  setActiveChatId,
  users,
  messages,
}: {
  chats: IChat[];
  setActiveChatId: SetState<number>;
  users: number[];
  messages: IncomingMessage[];
}) => {
  const { id } = useAppSelector((state) => state.user);

  return chats.map((item) => (
    <Chat
      currentUserId={id}
      key={item.id}
      chat={item}
      setActiveChatId={setActiveChatId}
      isOnline={users.includes(item.accesses[0].user.id)}
      messages={messages}
    />
  ));
};

export default ChatList;
