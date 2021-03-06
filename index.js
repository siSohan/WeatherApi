"use strict";
const mainIcon = document.querySelector(".weatherIcon");
const street = document.querySelector(".state");
const time = document.querySelector(".date");
const tempurature = document.querySelector(".tempareture");
const minMax = document.querySelector(".min_max");
const cloud = document.querySelector(".cloud");
const moonCloud = document.querySelector(".moonCloud");
const cloudRain = document.querySelector(".cloudRain");
const moonRain = document.querySelector(".moonRain");
const haze = document.querySelector(".haze");
const main = document.querySelector(".box");
const moon = document.querySelector(".moon");

let data;
let info = {};

const dates = new Date();
const form = dates
  .toLocaleString("en-BD", {
    weekday: "short", // long, short, narrow
    day: "numeric", // numeric, 2-digit
    // year: "numeric", // numeric, 2-digit
    month: "long", // numeric, 2-digit, long, short, narrow
    hour: "numeric", // numeric, 2-digit
    minute: "numeric", // numeric, 2-digit
    // second: "numeric", // numeric, 2-digit
  })
  .split(",")
  .join(" |");
// Output: Tue, July 21, 2020, 10:01:14 AM
info.date = form;
let timeTrack = form.split(" ");
info.zone = timeTrack.pop();
info.time = timeTrack.pop();

/////////////////////////////
const locat = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) reject(`Cannot read your location`);
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude, longitude } = position.coords;
      resolve({ latitude, longitude });
    });
  });
};
////////////////////////////////////////////
function setup() {
  tempurature.innerHTML = `${info.temp}°C`;
  minMax.innerHTML = `Min ${info.min}°C | Max ${info.max}°C`;
  street.innerHTML = info.area;
  time.innerHTML = info.date;
  if (info.zone == "PM") {
    if (Number(info.time.split(":")[0]) < 7) {
      console.log(info.zone);
      console.log(Number(info.time.split(":")[0]));
      main.classList.remove("night");
      info.icon == "Clouds" && cloud.classList.remove("hide");
      info.icon == "Haze" && haze.classList.remove("hide");
      info.icon == "Rain" && cloudRain.classList.remove("hide");
    } else {
      console.log(Number(info.time.split(":")[0]));
      main.classList.add("night");
      info.icon == "Clouds" && moonCloud.classList.remove("hide");
      info.icon == "Haze" && moon.classList.remove("hide");
      info.icon == "Rain" && moonRain.classList.remove("hide");
    }
  }
  if (info.zone == "AM") {
    if (0 < Number(info.time.split(":")[0]) < 5) {
      console.log(info.time.split(":")[0]);
      main.classList.add("night");
      info.icon == "Clouds" && moonCloud.classList.remove("hide");
      info.icon == "Haze" && moon.classList.remove("hide");
      info.icon == "Rain" && moonRain.classList.remove("hide");
    } else {
      console.log(info.time.split(":")[0]);
      main.classList.remove("night");
      info.icon == "Clouds" && cloud.classList.remove("hide");
      info.icon == "Haze" && haze.classList.remove("hide");
      info.icon == "Rain" && cloudRain.classList.remove("hide");
    }
  }
}
//////////////////////////////////

/////////////////////////////////////////////////
async function wether() {
  const { latitude, longitude } = await locat();
  console.log(latitude, longitude);
  data = await fetch(
    `https://jacinto-cors-proxy.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cdfd6daa95ae326cf3dae5367ea4319b`
  )
    .then((data) => data.json())
    .then((data) => data);
  console.log(data);
  info.temp = (data.main.temp / 10).toFixed(2);
  info.max = (data.main.temp_max / 10).toFixed(2);
  info.min = (data.main.temp_min / 10).toFixed(2);
  info.area = `${data.name.split(" ")[0]},${data.sys.country}`;
  info.icon = data.weather[0].main;
  console.log(info.icon);

  setup();
}
wether();
// const whereAmI = function ([lat, long]) {
//   return fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
//     .then((programe) => {
//       return programe.json();
//     })
//     .then((data) => {
//       wether(data.city);
//       return console.log(`You are in ${data.city},${data.country}`);
//     });
// };
