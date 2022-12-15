import getWeekDays from "libraries/global/getWeekDays";
import style from "./CalendarChart.module.css";
import { Emergente } from "./Timoideas.components";

// This component return a calendar chart like github contributions
export default function CalendarChart({
  lastWeeks = 52,
  data = [{ value: 5, day: "10-12-2022" }],
  levels = ["#0e4429", "#006d32", "#26a641", "#39d353"],
}) {
  const getWeeks = () => {
    const weeks = [];
    for (let i = 0; i < lastWeeks; i++) {
      weeks.push(i);
    }
    return weeks;
  };

  const getDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(i);
    }
    return days;
  };

  const getDay = (day) => {
    const days = getWeekDays("short");
    return days[day];
  };
  const rootColors = levels.reduce(
    (acc, level, i) => ({
      ...acc,
      [`--c-GraphCalendar-L${i + 1}`]: level,
    }),
    {}
  );
  return (
    <div className={style.Container} style={rootColors}>
      <div className={style.Calendar}>
        <div className={style.CalendarHeader}>
          {getWeekDays("short").map((day, index) => (
            <div key={index} className={style.CalendarHeaderItem}>
              {day}
            </div>
          ))}
        </div>
        <div className={style.CalendarBody}>
          {/* aqui se creará el calendario con divs en una grilla de 7x(la cantidad de semanas deseadas) */}
          {getWeeks().map((week, index) => (
            <div key={index} className={style.CalendarWeek}>
              {getDays().map((day, index) => (
                <Emergente
                  child={
                    <div className={style.CalendarDay__Detail} role="close">
                      {getDay(day)}
                      <p>visitas el</p>
                      <b>{day}</b>
                    </div>
                  }
                  closeOnClickOutside={true}
                  openOnHover={true}
                  closeOnEsc={true}
                  position={["top", "left"]}
                  translate={["-10px", "center"]}
                  group={"_dayCharCalendar"}
                  id={"_dayCharCalendar"}
                  key={index}
                >
                  <span className={style.CalendarDay}></span>
                </Emergente>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
