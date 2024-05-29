/* eslint-disable no-restricted-globals */

const workercode = () => {
  let timerInterval;
  let time = 0;

  self.onmessage = function ({ data: { turn, last_time } }) {
    if (turn === "off") {
      clearInterval(timerInterval);
      time = 0;
    } else if (turn === "on") {
      if (last_time) {
        time = Number(last_time);
        console.log("resumed:", time);
      }

      timerInterval = setInterval(() => {
        time += 1;
        self.postMessage({ time });
      }, 1000);
    } else if (turn === "pause") {
      clearInterval(timerInterval);
      console.log("paused:", time);
      self.postMessage({ time });
    }
  };
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

export default worker_script;
