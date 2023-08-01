let input_box_el = document.querySelector(".input__box-el");
let icon_search = document.querySelector(".fa-magnifying-glass");

// const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${place_name}&days=3`;
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
      asideFunc(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

apiData("uzbekistan");

function asideFunc(data) {
  console.log(data);

  let asideImg = document.querySelector(".info_weather_img");
  asideImg.setAttribute("src", data.current.condition.icon);

  let aside_location__city = document.querySelector(".location__city");
  let aside_location__country = document.querySelector(".location__country");

  aside_location__city.textContent = data.location.name;
  aside_location__country.textContent = data.location.country;

  let updated__date = document.querySelector(".updated__date");
  let updated__time = document.querySelector(".updated__time");
  const d = new Date(data.current.last_updated);

  let time =
    data.current.last_updated.split(" ")[
      data.current.last_updated.split(" ").length - 1
    ];

  updated__time.textContent = time;

  switch (d.getDay()) {
    case 1:
      updated__date.textContent = "Monday";
      break;
    case 2:
      updated__date.textContent = "Tuesday";
      break;
    case 3:
      updated__date.textContent = "Wednesday";
      break;
    case 4:
      updated__date.textContent = "Thursday";
      break;
    case 5:
      updated__date.textContent = "Friday";
      break;
    case 6:
      updated__date.textContent = "Saturday";
      break;
    case 7:
      updated__date.textContent = "Sunday";
      break;

    default:
      updated__date.textContent = "undefined";
  }

  let info_air = document.querySelector(".info_air");
  let info_cloud = document.querySelector(".info_other-cloud_the");

  info_air.textContent = data.current.condition.text;
  info_cloud.textContent = data.current.cloud;
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
