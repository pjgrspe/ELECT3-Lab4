document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const cityInput = document.getElementById('city-input').value.trim();
    const cityPattern = /^[A-Za-z\s]+$/;

    if (cityInput === '') {
        showToast('Input is required.');
        return;
    }

    if (!cityPattern.test(cityInput)) {
        showToast('Please enter a valid city name.');
        return;
    }
    
    const city = cityInput;
    const apiKey = 'b4308dcb56b9ca3fafdeb046056fc222';  // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        const cityName = data.name;
        const temperature = data.main.temp;
        const weatherCondition = data.weather[0].description;
        const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  
        document.getElementById('city-name').textContent = cityName;
        document.getElementById('temperature').textContent = `${temperature}°C`;
        document.getElementById('weather-condition').textContent = weatherCondition;
        document.getElementById('weather-icon').src = weatherIcon;
        document.getElementById('weather-icon').style.display = 'block';
        document.getElementById('weather-info').classList.remove('hidden');
        document.getElementById('error-message').textContent = '';
      })
      .catch(error => {
        document.getElementById('error-message').textContent = 'Error: ' + error.message;
        document.getElementById('weather-info').classList.add('hidden');
      });
  });

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    document.body.appendChild(toast);
  
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
  
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }