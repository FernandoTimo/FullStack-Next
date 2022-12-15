import { getSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "./AuthCard.module.css";
import { Glass } from "./timoideas/Timoideas.components";
export default function AuthCard() {
  const [UserData, setUserData] = useState(false);
  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session) {
        setUserData(session.user);
      }
    })();
    return () => {};
  }, []);
  return (
    <Glass className={style.Container}>
      {UserData ? (
        <div className={style.UserData}>
          <div className={style.UserProfile}>
            <img src={UserData.image} width="50" height="50" />
          </div>
          <div className={style.UserInfo}>
            <label font="title">{UserData.name}</label>
            <label font="subtitle">{UserData.email}</label>
          </div>
        </div>
      ) : (
        <div className={style.Login}>
          <h1>Log in</h1>
        </div>
      )}
    </Glass>
  );
}
