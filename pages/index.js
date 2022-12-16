import style from "styles/pages/index.module.css";
import Head from "heads/main.head";
import { Body, Section, SVG } from "components/timoideas/Timoideas.components";
import Sockets from "components/timoideas/Sockets.component";
import Timoideas from "public/svg/timoideas/timoideas.svg";
import GitHub from "public/svg/global/github.svg";
import { useState } from "react";
import Analytics from "components/timoideas/Analytics.component";
import AuthCard from "components/AuthCard.component";

export default function Index() {
  const [serverSockets, setserverSockets] = useState();

  return (
    <>
      <Head />
      <Body>
        <Analytics />
        <Section>
          <AuthCard />
          <div
            className={`${style.Container} ${serverSockets && style.Sockets}`}
          >
            <SVG
              heigth="5"
              width="5"
              icon={<Timoideas />}
              className={style.Timoideas}
            />
            <h1>Timoideas</h1>
            <a
              className={style.Repo}
              href="https://github.com/FernandoTimo/Backend-Express"
              target="_blank"
              type="clean"
            >
              <SVG
                heigth="3"
                width="3"
                icon={<GitHub />}
                className={style.GitHub}
              />
              <h2>Fullstack-Next</h2>
            </a>
          </div>
          <Sockets state={[serverSockets, setserverSockets]} />
        </Section>
      </Body>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      data: JSON.parse(JSON.stringify("data")),
    },
  };
}
