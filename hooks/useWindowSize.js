import { useEffect, useState } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return { width: windowSize.width, height: windowSize.height };
}

// type WindowDimentions = {
//     width: number | undefined;
//     height: number | undefined;
// };

// let width, height;

// const useWindowDimensions = () => {
//   const [windowDimensions, setWindowDimensions] = useState({
//     width,
//     height,
//   });
//   useEffect(() => {
//     function handleResize() {
//       setWindowDimensions({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     }
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []); // Empty array ensures that effect is only run on mount

//   return windowDimensions;
// };

// export default useWindowDimensions;
