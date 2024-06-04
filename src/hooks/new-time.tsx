export function newTimeInList(time: number) {
  const new_element = {
    date: new Date().toDateString(),
    time: time,
  };

  if (localStorage.getItem("time_list") === null) {
    localStorage.setItem("time_list", JSON.stringify([new_element]));
  } else {
    const new_list = JSON.parse(localStorage.getItem("time_list") ?? "");
    localStorage.setItem(
      "time_list",
      JSON.stringify([...new_list, new_element])
    );
  }

  localStorage.setItem("last_time", "0");
}
