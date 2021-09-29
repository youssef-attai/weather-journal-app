const zipInput = document.getElementById("zip");
const feelingsTextArea = document.getElementById("feelings");
const generateButton = document.getElementById("generate");
const formCard = document.querySelector(".card.form")
const resultCard = document.querySelector(".card.result")
const backButton = document.getElementById("back");

const resultDateDiv = document.getElementById("date")
const resultCityDiv = document.getElementById("city")
const resultTempDiv = document.getElementById("temp")
const resultHumidityDiv = document.getElementById("humidity")
const resultWeatherDiv = document.getElementById("weather")
const resultContentDiv = document.getElementById("content")

const API_KEY = "cb0a2c1ecfb0396459240d7ad5a432dd&units=metric";
const URL = "https://api.openweathermap.org/data/2.5/weather?"

const getWeatherData = async (url, zipCode, apiKey) => {
    zipCode = `zip=${zipCode}&`
    apiKey = `appid=${apiKey}`
    query = url+zipCode+apiKey;
    console.log(query);
    const res = await fetch(query)

    try {
        return await res.json();
    } catch (e) {
        console.log(e);
    }

}

const postData = async (url="", data={}) => {
    try {
        const res = await fetch(url, {
            method: "POST",
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': "*"
            },
            body: JSON.stringify(data)
        });
    
        console.log("DONE", res);
        const newData = await res.json()
        return newData;

    } catch (e) {
        console.log(e);
    }
}

const updatePage = async () => {
    const res = await fetch("/result")

    try {
        const data = await res.json()

        zipInput.disabled = false;
        feelingsTextArea.disabled = false;
        generateButton.disabled = false;

        console.log(data);

        const dt = new Date(data.dt * 1000)

        resultDateDiv.innerHTML = `${dt.toDateString()}`
        resultTempDiv.innerHTML = `${(Number(data.main.temp)).toFixed(2)}°C`

        resultCityDiv.innerHTML = data.name
        resultHumidityDiv.innerHTML = data.main.humidity + "%"
        resultWeatherDiv.innerHTML = data.weather[0].description
        resultContentDiv.innerHTML = data.feeling

        toggleDisplayCards()

    } catch (e) {
        console.log(e);
    }
}

function toggleDisplayCards() {
    formCard.classList.toggle("display-none")
    resultCard.classList.toggle("display-none")
}


generateButton.addEventListener("click", ()=>{
    
    zipInput.disabled = true;
    feelingsTextArea.disabled = true;
    generateButton.disabled = true;

    getWeatherData(URL, zipInput.value, API_KEY)
    .then(data=>postData(
    "/weather",
    {...data, feeling: feelingsTextArea.value}).then(updatePage()))
});

backButton.addEventListener("click", toggleDisplayCards)
