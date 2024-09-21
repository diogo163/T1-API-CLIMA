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




rl.question('Digite o nome de uma cidade: ', (cityName) => {
  getCoordinates(cityName).then(coords => {
    
    rl.close();
  });
});
