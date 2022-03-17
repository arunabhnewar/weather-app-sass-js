(function () {

    // Select required elements
    let icon = document.querySelector(".icon");
    let city = document.querySelector(".city");
    let temp = document.querySelector(".temp");
    let description = document.querySelector(".condition_description");
    let wind = document.querySelector(".wind");
    let humidity = document.querySelector(".humidity");

    let searchField = document.getElementById("search_field");
    let searchBtn = document.getElementById("search_btn");

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
                    console.log(weatherInfo);
                })

        },
            (error) => {
                const uri = `https://api.openweathermap.org/data/2.5/weather?q=chittagong&appid=${api}`;

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
        wind.innerText = "Wind Speed : " + weatherInfo?.wind + "k.m/h"
    }

    searchBtn.addEventListener('click', function (e) {
        let searchInput = searchField.value;

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
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                showOnUI();
                console.log(weatherInfo);
            })
    })


})()