import { IncomingMessage } from "@/pages/chat";
import { useAppSelector } from "@/utilities/hooks";
import { currentDatetime } from "@/utilities/utilities";
import Zoom from "react-medium-image-zoom";

const ChatMessage = ({
  message,
  userTimeRecords,
  otherUserId,
}: {
  message: IncomingMessage;
  userTimeRecords: { userId: number; time: string; chat: number }[];
  otherUserId: number;
}) => {
  const { id } = useAppSelector((state) => state.user);
  // console.log(message);
  const userId = message.userId;
  const isMine = userId === id;
  // console.log(isMine, userId, id);
  const hasImages = !!message.files?.length;
  let container = "msg-item d-flex position-relative";
  container += isMine ? " msg-out justify-content-end" : " msg-in";
  container += hasImages ? " msg-image" : "";

  const otherUserRecord: { userId: number; time: string; chat: number } | undefined = userTimeRecords.find(
    (item) => item.userId === otherUserId && item.chat === message.roomId
  );

  console.log(otherUserRecord);

  const otherUserTime = !!otherUserRecord && otherUserRecord.time;
  const delivered = message.delivered || otherUserTime > message.createdAt;

  console.log(otherUserTime > message.createdAt);

  // console.log(message.createdAt);

  return (
    <div className={container}>
      <div className='msg-body'>
        {hasImages &&
          message.files.map((item: string, index: number) => (
            <Zoom key={index}>
              <img className='w-100' src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/chat/${item}`} alt='' />
            </Zoom>
          ))}
        <div className='msg-text'>{message.message}</div>
        <div className='msg-info d-flex align-items-center justify-content-end'>
          <span className='msg-check'>
            {isMine && (
              <svg width='31' height='20' viewBox='0 0 31 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M20 4L9 15L4 10'
                  stroke={delivered ? "#1653FF" : "#BDBDBD"}
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M27 4L16 15L12.5 11.5'
                  stroke={delivered ? "#1653FF" : "#BDBDBD"}
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            )}
          </span>
          <span className='msg-time'>{currentDatetime(message.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
// export default useCallback(ChatMessage, [messages]);
export default ChatMessage;
