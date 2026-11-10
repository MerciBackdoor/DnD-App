(() => {
    const weatherData = {
        clear: { icon: "☀", title: "Ясно", effect: "Спокойная погода без негативных эффектов." },
        rain: { icon: "🌧", title: "Сильный дождь", effect: "Область считается слабо заслонённой. Существа совершают с помехой проверки Мудрости (Внимательность), основанные на зрении. Открытое пламя гаснет." },
        snow: { icon: "❄", title: "Снегопад", effect: "Область считается слабо заслонённой. Существа совершают с помехой проверки Мудрости (Внимательность), основанные на зрении. Поверхности могут считаться труднопроходимой местностью." },
        fog: { icon: "🌫", title: "Туман", effect: "Область считается слабо заслонённой. Существа совершают с помехой проверки Мудрости (Внимательность), полагающиеся на зрение." },
        storm: { icon: "⛈", title: "Шторм", effect: "Помеха для проверок Мудрости (Внимательность), основанных на зрении и слухе. Полёт без магии практически невозможен. Летающее существо в шторм должно приземляться в конце каждого своего хода, иначе оно падает." },
        wind: { icon: "🌪", title: "Сильный ветер", effect: "Помеха для бросков дальнобойных атак оружием и проверкам Мудрости (Внимательность), полагающимся на слух. Открытое пламя гаснет, туман рассеивается. Полёт без помощи магии практически невозможен. Летающее существо при сильном ветре должно приземляться в конце каждого своего хода, иначе оно падает." },
    };

    const weatherSelect = document.getElementById("weatherSelect");
    const weatherIcon = document.getElementById("weatherIcon");
    const weatherTitle = document.getElementById("weatherTitle");
    const effectText = document.getElementById("effectText");

    const tempSlider = document.getElementById("tempSlider");
    const tempValue = document.getElementById("tempValue");
    const weatherTemp = document.getElementById("weatherTemp");

    let isInitialLoad = true; 

    function saveWeatherState() {
        if (isInitialLoad) return; 
        localStorage.setItem("dnd_weather_type", weatherSelect.value);
        localStorage.setItem("dnd_weather_temp", tempSlider.value);
    }

    function loadWeatherState() {
        const savedWeather = localStorage.getItem("dnd_weather_type");
        const savedTemp = localStorage.getItem("dnd_weather_temp");

        if (savedWeather && weatherSelect) weatherSelect.value = savedWeather;
        if (savedTemp && tempSlider) tempSlider.value = savedTemp;
    }

    function getTemperatureEffect(temp) {
        if (temp >= 37) {
            return "\n\nЧрезвычайная жара:\nСущества без Сопротивления или Иммунитета должны регулярно совершать спасброски Телосложения сл. 5+1 за каждый час во избежание истощения. Cредние или Тяжёлые доспехи накладывают Помеху.";
        }
        if (temp <= -17) {
            return "\n\nЧрезвычайный холод:\nСущества без Сопротивления или Иммунитета должны регулярно совершать спасброски Телосложения сл. 10 во избежание истощения. Тепло одетые существа преуспевают автоматически.";
        }
        return "";
    }

    // Аргумент указывает, нужно ли насиловать диск записью
    function updateWeather(shouldSave = false) {
        if (!weatherSelect || !weatherData[weatherSelect.value]) return;

        const selected = weatherData[weatherSelect.value];
        const temp = parseInt(tempSlider.value) || 0;

        if (weatherIcon) weatherIcon.textContent = selected.icon;
        if (weatherTitle) weatherTitle.textContent = selected.title;

        let fullEffect = selected.effect;
        fullEffect += getTemperatureEffect(temp);

        if (effectText) effectText.textContent = fullEffect;

        if (shouldSave) saveWeatherState();
    }

    function updateTemperatureVisual() {
        if (!tempSlider) return;
        const value = tempSlider.value + "°C";

        if (tempValue) tempValue.textContent = value;
        if (weatherTemp) weatherTemp.textContent = value;

        // Обновляем текст на экране, но НЕ сохраняем в localStorage при каждом сдвиге
        updateWeather(false); 
    }

    if (weatherSelect && tempSlider) {
        // Выбор погоды меняется дискретно — можно сохранять сразу
        weatherSelect.addEventListener("change", () => updateWeather(true));

        // Ползунок: на 'input' только двигаем циферки, на 'change' (отпустили мышь) — сохраняем
        tempSlider.addEventListener("input", updateTemperatureVisual);
        tempSlider.addEventListener("change", () => updateWeather(true));

        // Инициализация
        loadWeatherState();
        updateTemperatureVisual();
        
        isInitialLoad = false; 
    }
})();