import { Manager, io } from "socket.io-client";

const manager = new Manager(`${process.env.NEXT_PUBLIC_WS_ADDRESS}`, {
  autoConnect: false,

  closeOnBeforeunload: true,
});

const socket = manager.socket("/chat"); // main namespace

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
