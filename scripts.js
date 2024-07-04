const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = '71e5d52923862fb52b987d4fd31c75db';

weatherForm.addEventListener('submit', async event =>{
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please Enter a City");
    }
});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error('Could not fetch weather data')
    } 
    return await response.json();
}
function displayWeatherInfo(data){
    console.log(data);
    const { name: city,
            main: {temp, humidity},
            weather: [{description, id}]} = data;
    card.textContent = ''
}

function getWeatherEmoji(weatherId){

}
function displayError(message){
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');
    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(errorDisplay)
}