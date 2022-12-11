import useLocalStorage from "hooks/useLocalStorage.hook";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "./Analytics.module.css";
import AnalyticsIcon from "public/svg/timoideas/analytics.svg";
import { SVG } from "./Timoideas.components";
import CalendarChart from "./CalendarChart.component";

export default function Analytics({ button = true }) {
  const [IsVisible, setIsVisible] = useLocalStorage("analytics", true);
  useEffect(() => {
    const keyHandler = (e) => {
      if (e.altKey && e.keyCode === 65) {
        setIsVisible((prevState) => {
          return !prevState;
        });
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);
  const [traficData, setTraficData] = useState();
  // useEffect(() => {
  //   fetch("/api/usage")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("trafic data ->", data);
  //       setTraficData(data);
  //     });
  //   return () => {};
  // }, []);

  return (
    <div>
      <div
        className={`${style.Container} ${
          IsVisible ? style.ContainerActive : ""
        }`}
      >
        <h2>Analytics</h2>
        <CalendarChart />
      </div>
      {button && (
        <button
          className={style.Button}
          onClick={() => setIsVisible(!IsVisible)}
        >
          {/* <SVG height="30px" width="30px" icon={<AnalyticsIcon />} /> */}
          {/* <div className={style.BlurBg}></div> */}
        </button>
      )}
    </div>
  );
}
