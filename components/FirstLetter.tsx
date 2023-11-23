const FirstLetter = ({
  nickname,
  width = 66,
  height = 66,
  fontSize = 56,
}: {
  nickname: string;
  width?: number;
  height?: number;
  fontSize?: number;
}) => {
  console.log(nickname);
  return (
    <div
      style={{
        borderRadius: 50,
        backgroundColor: "#BDBDBD",
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <span style={{ fontSize, color: "#fff", lineHeight: 1 }}>{nickname[0].toUpperCase()}</span>
    </div>
  );
};

export default FirstLetter;
