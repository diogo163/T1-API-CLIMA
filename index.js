const axios = require('axios');
require('dotenv').config();
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const apiKey = process.env.API_KEY;


async function getCoordinates(city) {
  try {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
    if (response.data.length === 0) {
      console.log('Cidade não encontrada. Tente novamente.');
      return null;
    }
    const { lat, lon } = response.data[0];
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);
    return { lat, lon };
  } catch (error) {
    console.error('Erro ao obter coordenadas:', error);
    return null;
  }
}


async function getWeather(lat, lon) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const { feels_like } = response.data.main;
    const { description } = response.data.weather[0];
    console.log(`Sensação térmica: ${feels_like}°C, Descrição: ${description}`);
  } catch (error) {
    console.error('Erro ao obter previsão:', error);
  }
}


rl.question('Digite o nome de uma cidade: ', (cityName) => {
  getCoordinates(cityName).then(coords => {
    if (coords) {
      getWeather(coords.lat, coords.lon);
    }
    rl.close();
  });
});
