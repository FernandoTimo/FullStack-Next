import "styles/global/Fonts.css";
import "styles/global/Global.css";
import "styles/global/Timoideas.css";
import "styles/global/Animations.css";

import _Context_ from "context/app.context";
import Theme from "components/timoideas/Theme.component";
import { useRouter } from "next/router";
import { useEffect } from "react";
import postUsage from "libraries/fetch/usage.fetch";

const App = ({ Component, pageProps }) => {
  const { pathname, query } = useRouter();
  useEffect(() => {
    postUsage(pathname, query);
  }, []);
  return (
    <_Context_>
      <Theme />
      <Component {...pageProps} />
    </_Context_>
  );
};

export default App;
