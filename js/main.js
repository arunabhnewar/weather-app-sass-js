(function () {

    // Select required elements
    let icon = document.querySelector(".icon");
    let city = document.querySelector(".city");
    let temp = document.querySelector(".temp");
    let description = document.querySelector(".condition_description");
    let wind = document.querySelector(".wind");
    let humidity = document.querySelector(".humidity");
    let tempUnit = document.querySelector(".temp_unit");
    const convertBtn = document.getElementById("convert_btn");


    let searchField = document.getElementById("search_field");
    let searchBtn = document.getElementById("search_btn");
    let searchHistory = document.getElementById("search_history");

    const api = "03e502c70d5c99fc75b083a2c362ea76";
    let weatherInfo = {};


    // Get weather and location information using api key
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const lat = coords.latitude;
            const lon = coords.longitude;

            const uri = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;
            fetch(uri)
                .then(res => res.json())
                .then((data) => {
                    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                    const city = data.name;
                    const country = data.sys.country;
                    const condition = data.weather[0].description;
                    const temp = data.main.temp - 273.15;
                    const humidity = data.main.humidity;
                    const wind = data.wind.speed;

                    weatherInfo = {
                        icon,
                        city,
                        country,
                        condition,
                        temp,
                        humidity,
                        wind
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    showOnUI();
                })

        },
            (error) => {
                const uri = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;

                fetch(uri)
                    .then(res => res.json())
                    .then((data) => {
                        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                        const city = data.name;
                        const country = data.sys.country;
                        const condition = data.weather[0].description;
                        const temp = data.main.temp - 273.15;
                        const humidity = data.main.humidity;
                        const wind = data.wind.speed;

                        weatherInfo = {
                            icon,
                            city,
                            country,
                            condition,
                            temp,
                            humidity,
                            wind
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        showOnUI();
                        console.log(weatherInfo);
                    })
            })
    }


    // Show the data on UI
    function showOnUI() {
        icon.src = weatherInfo?.icon;
        city.innerText = "Weather in " + weatherInfo?.city + ", " + weatherInfo?.country;
        temp.innerText = weatherInfo?.temp.toFixed(2) + "°C";
        description.innerText = weatherInfo?.condition;
        humidity.innerText = "Humidity : " + weatherInfo?.humidity + "%";
        wind.innerText = "Wind Speed : " + weatherInfo?.wind + "k.m/h";
        // document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + temp + "')";
    }


    // Search button event handle
    searchBtn.addEventListener('click', function (e) {
        let searchInput = searchField.value;

        if (searchField.value === "") {
            alert('Please insert a location');
            return;
        } else {
            const uri = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${api}`;

            fetch(uri)
                .then(res => res.json())
                .then((data) => {
                    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                    const city = data.name;
                    const country = data.sys.country;
                    const condition = data.weather[0].description;
                    const temp = data.main.temp - 273.15;
                    const humidity = data.main.humidity;
                    const wind = data.wind.speed;

                    weatherInfo = {
                        icon,
                        city,
                        country,
                        condition,
                        temp,
                        humidity,
                        wind
                    }

                    // Search History reset
                    const history = getFromLocalStorage();
                    const historyCards = document.querySelectorAll(".history_card");
                    if (history.length === 3) {
                        historyCards[2].remove();
                        history.pop();
                        history.unshift(weatherInfo);
                    }
                    else {
                        history.unshift(weatherInfo);
                    }


                    const div = document.createElement('div');
                    div.innerHTML = `
                    <div class="history_card">
                    <div class="history_icon">
                    <img class="icon" src="${icon}" alt="" />
                    </div>
                    <div class="history_detail">
                    <h4>${city}</h4>
                    <p class="history_condition">${condition}</p>
                    <p class="history_wind">Wind Speed : ${wind}k.m/h</p>
                    <p class="history_humidity">Humidity : ${humidity}%</p>
                    </div>
                    </div>`


                    searchHistory.insertAdjacentElement('afterbegin', div);

                    // Set data from local storage
                    localStorage.setItem('weather', JSON.stringify(history));
                })
                .catch((error) => {
                    alert("Please insert a valid city name");
                })
                .finally(() => {
                    searchField.value = "";
                    showOnUI();
                })
        }
    })


    // // 
    // convertBtn.addEventListener('click', function (e) {
    //     if (tempUnit.innerText === "°C") {
    //         let temper = temp.innerText;
    //         let newTemper = Number(temper * 9) / 5 + 32;
    //         temp.innerText = Number(newTemper.toFixed(2));
    //         tempUnit.innerText = "°F";
    //         console.log(temp);
    //         console.log(tempUnit);
    //     }
    //     else {
    //         let temper = temp.innerText;
    //         let newTemper = Number((temper - 32) * 5 / 9);
    //         temp.innerText = Number(newTemper.toFixed(2));
    //         tempUnit.innerText = "°C";
    //         console.log(temp);
    //         console.log(tempUnit);
    //     }
    // })



    // Get data from local storage
    function getFromLocalStorage() {
        const data = localStorage.getItem('weather');
        let weather = [];
        if (data) {
            weather = JSON.parse(data);
        }
        return weather;
    }


    // Load data from local storage
    window.onload = function () {
        const history = getFromLocalStorage();
        history.forEach((singleHistory) => {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="history_card">
            <div class="history_icon">
            <img class="icon" src="${singleHistory.icon}" alt="" />
            </div>
            <div class="history_detail">
            <h4>${singleHistory.city}</h4>
            <p class="history_condition">${singleHistory.condition}</p>
            <p class="history_wind">Wind Speed : ${singleHistory.wind}k.m/h</p>
            <p class="history_humidity">Humidity : ${singleHistory.humidity}%</p>
            </div>
            </div>`
            searchHistory.appendChild(div)
        })
    }

})()