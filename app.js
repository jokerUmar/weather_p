let input_box_el = document.querySelector(".input__box-el");
let icon_search = document.querySelector(".fa-magnifying-glass");
let container = document.querySelector(".container");
let load_box = document.querySelector(".load_box");
let loadMainPage = true;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f1a7b02962msh92552067aaf39fbp1cc731jsn5b18a784558e",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

function apiData(place_name) {
  fetch(
    `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${place_name}&days=3`,
    options
  )
    .then((res) => res.json())
    .then((data) => {
      loadMainPage = false;
      if (loadMainPage) {
        container.style.display = "none";
        load_box.style.display = "flex";
      } else {
        container.style.display = "block";
        load_box.style.display = "none";
      }
      if (loadMainPage == false) {
        renderHtml(data);
      }
    })
    .catch((err) => {
      console.log(err);
      loadMainPage = true;
    });

  console.log(loadMainPage);
}

apiData("uzbekistan");

function renderHtml(data) {
  let info_air = document.querySelector(".info_air");
  let info_cloud = document.querySelector(".info_other-cloud_the");
  let today_temperature_celcius = document.querySelector(
    ".today_temperature_celcius"
  );
  let asideImg = document.querySelector(".info_weather_img");
  let aside_location__city = document.querySelector(".location__city");
  let aside_location__country = document.querySelector(".location__country");
  let updated__date = document.querySelector(".updated__date");
  let updated__time = document.querySelector(".updated__time");
  let item_card = document.querySelectorAll(".item__card");
  let wind_status = document.querySelector(".wind_status");
  let index_uv = document.querySelector("#index-uv");
  let humidity = document.querySelector("#humidity");
  let visibility = document.querySelector("#visibility");

  // textcontent

  asideImg.setAttribute("src", data.current.condition.icon);
  aside_location__city.textContent = data.location.name;
  aside_location__country.textContent = data.location.country;
  today_temperature_celcius.textContent = data.current.temp_c;

  const d = new Date(data.current.last_updated).getDay();

  let time =
    data.current.last_updated.split(" ")[
      data.current.last_updated.split(" ").length - 1
    ];

  // textContent

  updated__time.textContent = time;
  updated__date.textContent = daysFunc(d);
  info_air.textContent = data.current.condition.text;
  info_cloud.textContent = data.current.cloud;
  wind_status.textContent = data.current.wind_kph;
  index_uv.textContent = data.current.uv;
  humidity.textContent = data.current.humidity;
  visibility.textContent = data.current.vis_km;

  // FOR

  for (let i = 0; i < item_card.length; i++) {
    const dataForecast = data.forecast.forecastday[i];
    let week_day = dataForecast.date;

    let week_day_name = new Date(week_day);

    const parent = item_card[i];
    let child_card_info = parent.querySelector(".card__info");
    let child_card_img = parent.querySelector(".card__info_img");
    let child_card_temperature = parent.querySelector(".card__temperature");

    // textContent

    child_card_info.textContent = daysFunc(week_day_name.getDay());
    child_card_img.setAttribute("src", dataForecast.day.condition.icon);
    child_card_temperature.textContent =
      dataForecast.hour[new Date().getHours()].temp_c;

    setInterval(() => {
      let t = new Date().getHours();
      child_card_temperature.textContent = dataForecast.hour[t].temp_c;
    }, 1000 * 60 * 60);
  }
}

function daysFunc(params) {
  switch (params) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";

    default:
      return "undefined";
  }
}

input_box_el.addEventListener("change", function (e) {
  e.preventDefault();
  if (e.target.value.length > 0) {
    apiData(e.target.value);
  }
});

icon_search.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.value.length > 0) {
    apiData(e.target.value);
  }
});
