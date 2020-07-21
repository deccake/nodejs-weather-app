const getWeather = async (address) => {
  const res = await fetch(`http://localhost:3000/weather?address=${address}`);
  const data = await res.json();
  return data;
};

//all dom string
const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const msgOne = document.querySelector("#msg-1");
const msgTwo = document.querySelector("#msg-2");

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const address = searchElement.value;
  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";
  const res = await fetch(`http://localhost:3000/weather?address=${address}`);
  const data = await res.json();
  console.log(data);
  if (!data.err) {
    msgOne.textContent = data.temperature;
    msgTwo.textContent = data.weather_descriptions[0];
  } else {
    msgOne.textContent = data.err;
  }
});

const getData = (address) => {
  getWeather(address).then((err, data) => {
    console.log("data");
    console.log(data);
    if (err) {
      return (document.querySelector("#err").textContent = err.err);
    }
    // renderUi(data);
  });
};

const renderUi = (data) => {
  console.log(data);
  document.querySelector("#temp").textContent = data.tempearture;
  document.querySelector("#precip").textContent = data.precip;
  document.querySelector("#weather").textContent = data.weather_descriptions[0];
};
