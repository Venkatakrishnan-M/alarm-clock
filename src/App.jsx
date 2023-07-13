import { useState, useEffect } from "react";
import Result from "./Components/Result";
import "./App.css";

let updatedComponentSet = [];
let updatedTimeSet = [];
let propsDesc = null;
let propsTime = null;
let i = 0;
let indexposition = null;

const App = () => {
  let [systemTime, setSystemTime] = useState(new Date());
  let [formatTime, setformatTime] = useState("");
  let [components, setComponents] = useState([]);
  let [timeArray, setTimeArray] = useState([]);

  useEffect(() => {
    setInterval(() => {
      setSystemTime(() => new Date());
    }, 1000);
  }, []);

  useEffect(() => {
    console.log(timeArray);
    if (timeArray.includes(systemTime.toLocaleTimeString())) {
      alert("Alarm");
      updatedComponentSet = components.filter((obj) => {
        if (obj.time === systemTime) return false;
        updatedTimeSet = timeArray.filter((timeValue) => {
          if (timeValue == systemTime) return false;
        });
        setTimeArray(() => updatedTimeSet);
      });
      setComponents(() => updatedComponentSet);
    }
  }, [systemTime, timeArray]);

  let handleDescChange = (e) => {
    propsDesc = e.target.value;
  };

  let handleTimeChange = (e) => {
    propsTime = e.target.value;
    const [hours, minutes, seconds] = propsTime.split(":");
    const dateObject = new Date();

    dateObject.setHours(hours);
    dateObject.setMinutes(minutes);
    dateObject.setSeconds(seconds);

    const time12Hour = dateObject.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    setformatTime(() => time12Hour);
  };

  let displayAlarmDetail = () => {
    updatedComponentSet = [...components];
    updatedComponentSet.push({
      key: ++i,
      desc: propsDesc,
      time: formatTime,
      id: i,
    });
    updatedTimeSet = [...timeArray];
    updatedTimeSet.push(formatTime);
    setComponents(() => updatedComponentSet);
    setTimeArray(() => updatedTimeSet);
  };

  let handleRemoveEventInChild = (identify) => {
    indexposition = null;

    components.forEach((obj, index) => {
      if (obj.id === identify) {
        indexposition = index;
      }
      updatedTimeSet = timeArray.filter((value) => {
        if (value == obj.time) return false;
      });
      setTimeArray(() => updatedTimeSet);
    });
    updatedComponentSet = [...components];
    updatedComponentSet.splice(indexposition, 1);
    setComponents(() => updatedComponentSet);
  };

  return (
    <div className="outerContainer">
      <h3>{systemTime.toLocaleTimeString()}</h3>
      <input
        type="text"
        className="desc-input"
        placeholder="Enter Alarm Name"
        onChange={handleDescChange}
      />
      <input
        type="time"
        step="1"
        inputMode="numeric"
        className="time-put"
        onChange={handleTimeChange}
      />
      <button onClick={displayAlarmDetail}>Add Alarm</button>
      <br />
      <br />
      {components.map((obj) => (
        <Result
          key={obj.key}
          desc={obj.desc}
          time={obj.time}
          id={obj.id}
          onRemove={handleRemoveEventInChild}
        />
      ))}
    </div>
  );
};

export default App;
