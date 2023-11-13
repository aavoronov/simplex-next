import { IncomingMessage, OutgoingMessage } from "@/pages/chat";
import { useAppSelector } from "@/utilities/hooks";
import { SetState } from "@/utilities/utilities";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import ScrollContainer from "react-indiana-drag-scroll";
import { Socket } from "socket.io-client";

interface DropzoneFile extends File {
  preview?: string;
}

interface Props {
  socket: Socket | null;
  activeChatId: number;
  isConnected: boolean;
  setMessages?: SetState<any[]>;
}

const ChatInputField = ({ socket, activeChatId, isConnected, setMessages }: Props) => {
  const isSupport = !socket;
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [chatTextValue, setChatTextValue] = useState("");
  // const [scrollPosition, setScrollPosition] = useState(0);
  const [files, setFiles] = useState<DropzoneFile[]>([]);
  // const [filename, setFilename] = useState("");

  const { id, login, name } = useAppSelector((state) => state.user);

  const sendMessage = async (payload: OutgoingMessage) => {
    try {
      if (!!files.length) {
        const outgoingMessageFiles = files.map((item) => ({ file: item, filename: item.name }));
        payload = { ...payload, files: outgoingMessageFiles };
      }

      socket.emit("message", payload);
      setChatTextValue("");
      setFiles([]);
      // setFilename("");
    } catch (e) {
      console.log("e", e);
      // dispatch(toggle({ text: e.message, type: "error" }));
    }
  };

  const sendSupportMessage = (payload: OutgoingMessage) => {
    if (!!files.length) {
      const outgoingMessageFiles = files.map((file: File) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      const previews = outgoingMessageFiles.map((item) => item.preview);

      payload = { ...payload, previews: previews };
    }

    console.log(payload);
    console.log(new Date().toISOString());
    const incomingMsg: IncomingMessage = {
      message: payload.text,
      createdAt: new Date().toISOString(),
      name: "you",
      userId: id,
      roomId: -2,
      delivered: true,
      previews: payload.previews,
      // files: payload.files
    };
    setMessages((prev) => [...prev, incomingMsg]);
    setChatTextValue("");
    setFiles([]);
  };

  const handleSend = isSupport ? sendSupportMessage : sendMessage;

  const handleKeyPress = (event) => {
    if (event.key !== "Enter") {
      return;
    }
    if (event.shiftKey) {
      setChatTextValue((prev) => prev + "\n");
    } else {
      event.preventDefault();
      (chatTextValue || files.length) &&
        handleSend({
          login: login,
          text: chatTextValue,
          userId: id,
          roomId: activeChatId,
        });
    }
  };

  const hiddenFileInput: MutableRefObject<HTMLInputElement> = useRef(null);

  // const pseudonym = useAppSelector((state) => state.user.pseudonym);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles: DropzoneFile[]) => {
      // !files.length &&
      setFiles(
        files
          .concat(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          )
          .slice(0, 10)
      );
      console.log(acceptedFiles);
      // setFilename(acceptedFiles[0].name);

      setIsDraggedOver(false);
    },
    onDragOver: () => {
      setIsDraggedOver(true);
    },
    onDragLeave: () => {
      setIsDraggedOver(false);
    },
    maxFiles: 10,
    maxSize: 2000000,
    multiple: true,
  });
  // const { getRootProps, getInputProps } = useDropzone({ maxFiles: 10, maxSize: 3000000, multiple: true, onDrop });

  const removeFile = (file: DropzoneFile) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const removeAll = () => {
    setFiles([]);
    // setFilename("");
  };
  const thumbs = files.map((i, index) => (
    <li className={"img-download"} key={index}>
      <img
        className='prewiew'
        src={i.preview}
        alt=''
        onLoad={() => {
          URL.revokeObjectURL(i.preview);
        }}
      />
      <img className={"img-download-delete"} src='/images/delete-stop.svg' onClick={() => removeFile(i)} />
    </li>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((i) => URL.revokeObjectURL(i.preview));
  }, []);

  const bot = [
    "Как купить?",
    "Гарантии",
    "Проблема с покупкой",
    "Возврат",
    "Как продать?",
    "Вывод",
    "Идеи и предложения",
    "Технические проблемы",
    "Летние скидки",
    "Пригласи друга",
  ];

  return (
    <>
      <ScrollContainer className='scroll-container d-flex flex-nowrap align-items-center list-none' horizontal vertical={false}>
        {thumbs}
      </ScrollContainer>
      <div className='bot-menu d-flex align-items-center'>
        {bot.map((value, i) => (
          <button
            key={i}
            className='btn btn_bot-item'
            onClick={() => {
              // console.log(value);
              setChatTextValue(value);
              // modifyChatInput(value)
              // set
            }}>
            {value}
          </button>
        ))}
      </div>
      <div className='chat-footer-content d-flex align-items-end justify-content-between pt-3'>
        <div
          {...getRootProps({
            className: isDraggedOver ? "chat-msg-write dragged-over position-relative" : "chat-msg-write position-relative",
          })}
          onClick={null}>
          <input
            role='textbox'
            value={chatTextValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setChatTextValue((e.target as HTMLInputElement).value);
            }}
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(e)}
            placeholder={isConnected ? "Сообщение" : "Соединение прервано. Перезагрузите страницу"}
            style={{ backgroundColor: isConnected ? "initial" : "#FE654670" }}
            disabled={!isConnected}
            className='form-control w-100'
          />
          <button
            className='btn btn_send-message position-absolute end-0 top-0 bottom-0'
            onClick={() => {
              if (!chatTextValue && !files.length) return;

              handleSend({
                login: login,
                text: chatTextValue,
                userId: id,
                // profilePic: profilePic,
                // filename,
                roomId: activeChatId,
              });
            }}>
            <svg xmlns='http://www.w3.org/2000/svg' width='21' height='21' viewBox='0 0 21 21' fill='none'>
              <path d='M1 10L20 1L11 20L9 12L1 10Z' stroke='#18130C' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </button>
        </div>
        <div className='attach'>
          <input {...getInputProps()} ref={hiddenFileInput} type={"file"} multiple={true} className='d-none' />
          <button className='btn btn_attach' onClick={() => hiddenFileInput.current.click()}>
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
              <path
                d='M11.3447 -0.0047396C12.2688 -0.00692156 13.1728 0.265353 13.9421 0.777566C14.7113 1.28978 15.3112 2.01886 15.6656 2.87239C16.02 3.72592 16.113 4.66546 15.9328 5.5719C15.7525 6.47834 15.3072 7.31086 14.6533 7.96393L7.58665 15.0206C6.96118 15.6475 6.1123 16.0002 5.22676 16.0012C4.34121 16.0022 3.49154 15.6514 2.86465 15.0259C2.23777 14.4005 1.88503 13.5516 1.88403 12.666C1.88303 11.7805 2.23385 10.9308 2.85932 10.3039L9.92665 3.24793C10.3089 2.88364 10.8166 2.68043 11.3447 2.68043C11.8727 2.68043 12.3804 2.88364 12.7627 3.24793C12.9486 3.43367 13.0961 3.65425 13.1968 3.89705C13.2974 4.13984 13.3492 4.4001 13.3492 4.66293C13.3492 4.92576 13.2974 5.18601 13.1968 5.42881C13.0961 5.6716 12.9486 5.89218 12.7627 6.07793L6.16665 12.6619L5.22132 11.7186L11.8173 5.13326C11.9423 5.00824 12.0125 4.8387 12.0125 4.66193C12.0125 4.48515 11.9423 4.31561 11.8173 4.19059C11.69 4.06906 11.5207 4.00126 11.3447 4.00126C11.1686 4.00126 10.9993 4.06906 10.872 4.19059L3.79999 11.2473C3.4247 11.6234 3.21422 12.1333 3.21485 12.6646C3.21547 13.196 3.42715 13.7053 3.80332 14.0806C4.17948 14.4559 4.68932 14.6664 5.22068 14.6657C5.75203 14.6651 6.26137 14.4534 6.63665 14.0773L13.708 7.02126C14.3335 6.39446 14.6845 5.54484 14.6836 4.65929C14.6827 3.77375 14.3301 2.92482 13.7033 2.29926C13.0765 1.6737 12.2269 1.32276 11.3414 1.32364C10.4558 1.32451 9.60688 1.67713 8.98132 2.30393L0.967319 10.3039L0.0219862 9.36059L8.03599 1.36059C8.4705 0.926472 8.98644 0.582397 9.55421 0.348102C10.122 0.113807 10.7304 -0.00609869 11.3447 -0.0047396V-0.0047396Z'
                fill='#BDBDBD'
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInputField;
