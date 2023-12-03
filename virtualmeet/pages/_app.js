import "../styles/globals.css";

//INTERNAL IMPORT
import { ChatAppProvider } from "../Context/ChatAppContext";
import { NavBar } from "../chatComponents/index";

const MyApp = ({ Component, pageProps }) => (
  <div>
    <ChatAppProvider>
      <NavBar />
      <Component {...pageProps} />
    </ChatAppProvider>
  </div>
);

export default MyApp;
