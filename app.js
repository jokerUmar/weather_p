// const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=Uzbekistan`;
const url =
  "https://weatherapi-com.p.rapidapi.com/forecast.json?q=tashkent&days=3&lang=Uzbekistan&dt=2023-08-30";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f1a7b02962msh92552067aaf39fbp1cc731jsn5b18a784558e",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

function apiData(url) {
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

apiData(url);
