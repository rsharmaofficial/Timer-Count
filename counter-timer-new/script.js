document.getElementById("start-timer").addEventListener("click", () => {
  const dayInput = document.getElementById("day-input").value;
  const monthInput = document.getElementById("month-input").value;
  const heading = document.getElementById("timer-heading");

  if (!dayInput || !monthInput) {
    alert("Please enter both day and month.");
    return;
  }

  const second = 1000,
    minute = 60 * second,
    hour = 60 * minute,
    day = 24 * hour;

  const yyyy = new Date().getFullYear();
  const targetDateStr = `${monthInput.padStart(2, "0")}/${dayInput.padStart(
    2,
    "0"
  )}/${yyyy}`;
  let targetDate = new Date(targetDateStr).getTime();

  // If the target date is in the past, set it to the next year
  if (new Date().getTime() > targetDate) {
    targetDate = new Date(
      `${monthInput.padStart(2, "0")}/${dayInput.padStart(2, "0")}/${yyyy + 1}`
    ).getTime();
  }

  const intervalId = setInterval(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      // Timer has ended
      document.querySelector(".days").innerText = "00";
      document.querySelector(".hours").innerText = "00";
      document.querySelector(".minutes").innerText = "00";
      document.querySelector(".seconds").innerText = "00";
      heading.innerText = "Time's Up!";
      heading.classList.add("time-up");
      clearInterval(intervalId);
      return;
    }

    const leftDay = Math.floor(difference / day);
    const leftHour = Math.floor((difference % day) / hour);
    const leftMinute = Math.floor((difference % hour) / minute);
    const leftSecond = Math.floor((difference % minute) / second);

    document.querySelector(".days").innerText = leftDay
      .toString()
      .padStart(2, "0");
    document.querySelector(".hours").innerText = leftHour
      .toString()
      .padStart(2, "0");
    document.querySelector(".minutes").innerText = leftMinute
      .toString()
      .padStart(2, "0");
    document.querySelector(".seconds").innerText = leftSecond
      .toString()
      .padStart(2, "0");
  }, 1000);
});
