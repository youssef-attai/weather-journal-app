const zipInput = document.getElementById("zip");
const feelingsTextArea = document.getElementById("feelings");
const generateButton = document.getElementById("generate");

const apiKey = "cb0a2c1ecfb0396459240d7ad5a432dd";

const postData = async () => {
    const countryCode = "";
    const zipCode = zipInput.value;

    const response = await fetch(`api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(zipCode)
    });

    try {
        const data = response.json();
        return data;
    }
     catch (e) {
         console.log(e);
     }
}
