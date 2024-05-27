function saveSessionTime(time: number) {
  localStorage.setItem("LastSessiontime", JSON.stringify(time));
  console.log("Session time saved");
}

export default saveSessionTime;
