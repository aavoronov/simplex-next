import socket from "@/utilities/socket";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { IncomingMessage } from "./chat";
import { setIn } from "formik";

const Test = () => {
  const [chats, setChats] = useState([1]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [messages, setMessages] = useState([]);
  const [scrollPage, setScrollPage] = useState(0);
  const [startReached, setStartReached] = useState(false);
  const [users, setUsers] = useState([]);
  const [userTimeRecords, setUserTimeRecords] = useState([]);

  const [input, setInput] = useState("");

  useEffect(() => {
    if (!!chats.length) {
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
        console.log(data);
        // console.log("new msg");
      });

      socket.emit("joinRoom", chats, 1);

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
        socket.emit("leaveRoom", chats, 1);
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
  }, [chats]);
  return (
    <div>
      <span>test</span> <span>{isConnected ? "connected" : "disconnected"}</span>
      <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => socket.emit("message", { text: input, login: "O6su8bxH74LUfdNZ8TAjt", name: "name", roomId: 1 })}>send</button>
    </div>
  );
};

export default Test;
