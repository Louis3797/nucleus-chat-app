import type { AppProps } from "next/app";
import { useState } from "react";
import { socket, SocketContext } from "../context/socket";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SocketContext.Provider value={socket}>
        <Component {...pageProps} />
      </SocketContext.Provider>
    </>
  );
}

export default MyApp;
