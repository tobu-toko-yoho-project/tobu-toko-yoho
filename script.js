// OpenWeatherMap APIキー
// **注意: この方法はセキュリティ上非推奨ですが、今回は簡易リリース優先のため直接記述します。**
const API_KEY = "65a21d878cba99c46a9424a5490bd5a2";

// APIのエンドポイントURLは「予報」API
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const WEATHER_ICON_BASE_URL = "https://openweathermap.org/img/wn/"; // 天気アイコンのベースURL

// 主要空港と対応する緯度経度
const AIRPORT_LOCATIONS = {
    "HND": { name: "羽田空港", lat: 35.5494, lon: 139.7798 }, // 羽田空港を追加
    "NRT": { name: "成田空港", lat: 35.7647, lon: 140.3863 }, // 成田空港を追加
    "CTS": { name: "札幌（新千歳）", lat: 42.7758, lon: 141.6997 },
    "HKD": { name: "函館", lat: 41.770, lon: 140.821 },
    "AKJ": { name: "旭川", lat: 43.670774, lon: 142.452868 },
    "OBO": { name: "帯広", lat: 42.73258, lon: 143.212859 },
    "KUH": { name: "釧路", lat: 43.045909, lon: 144.194057 },
    "MMB": { name: "女満別", lat: 43.8815542, lon: 144.1596852 },
    "WKJ": { name: "稚内", lat: 45.400424, lon: 141.79669 },
    "KSP": { name: "根室中標津", lat: 43.5775, lon: 144.960 },
    "MBE": { name: "オホーツク紋別", lat: 44.304, lon: 143.404 },
    "AXT": { name: "秋田", lat: 39.6155, lon: 140.2186 },
    "OHE": { name: "大館能代", lat: 40.1955149, lon: 140.3722153 },
    "SYO": { name: "庄内（山形）", lat: 38.814992, lon: 139.787683 },
    "HAC": { name: "八丈島", lat: 33.115549, lon: 139.783013 },
    "NGO": { name: "名古屋（中部）", lat: 34.8583, lon: 136.8053 },
    "KMQ": { name: "小松（石川）", lat: 36.402181, lon: 136.415112 },
    "TOY": { name: "富山", lat: 36.643826, lon: 137.18965 },
    "NTQ": { name: "能登", lat: 37.2933, lon: 136.9622 },
    "ITM": { name: "大阪（伊丹）", lat: 34.7844, lon: 135.4389 },
    "KIX": { name: "大阪（関西）", lat: 34.4272, lon: 135.2447 },
    "UKB": { name: "神戸", lat: 34.637216, lon: 135.228905 },
    "OKJ": { name: "岡山", lat: 34.759644, lon: 133.853842 },
    "HIJ": { name: "広島", lat: 34.439915, lon: 132.919095 },
    "IWK": { name: "岩国", lat: 34.145, lon: 132.2469 },
    "UBJ": { name: "山口宇部", lat: 33.930, lon: 131.2786 },
    "TTJ": { name: "鳥取", lat: 35.527313, lon: 134.167594 },
    "YGJ": { name: "米子", lat: 35.500655, lon: 133.244737 },
    "IWJ": { name: "萩・石見", lat: 34.678471, lon: 131.796945 },
    "TKS": { name: "徳島", lat: 34.1345346, lon: 134.618012 },
    "TAK": { name: "高松（香川）", lat: 34.2167, lon: 134.0167 },
    "MYJ": { name: "松山（愛媛）", lat: 33.8239, lon: 132.7022 },
    "KCZ": { name: "高知", lat: 33.5473327, lon: 133.6742703 },
    "FUK": { name: "福岡", lat: 33.5936, lon: 130.4503 },
    "KKJ": { name: "北九州", lat: 33.839033, lon: 131.03168 },
    "HSG": { name: "佐賀", lat: 33.152478, lon: 130.301985 },
    "NGS": { name: "長崎", lat: 32.91347, lon: 129.921636 },
    "OIT": { name: "大分", lat: 33.4794444, lon: 131.737222 },
    "KMJ": { name: "熊本", lat: 32.835441, lon: 130.857388 },
    "KMI": { name: "宮崎", lat: 31.872463, lon: 131.440494 },
    "KOJ": { name: "鹿児島", lat: 31.8033, lon: 130.718 },
    "OKA": { name: "沖縄（那覇）", lat: 26.1958, lon: 127.6468 },
    "MMY": { name: "宮古", lat: 24.7792046, lon: 125.2972687 },
    "ISG": { name: "石垣", lat: 24.3858, lon: 124.187 }
};

// 主要航空会社の運航状況確認ページURL (公式ページに更新)
const AIRLINE_STATUS_URLS = {
    "JAL": "https://www.jal.co.jp/jp/ja/other/weather_info_dom/",
    "ANA": "https://www.ana.co.jp/fs/dom/jp/",
    "スカイマーク": "https://www.skymark.co.jp/ja/flight_info/flight_status.html",
    "Peach": "https://www.flypeach.com/lm/flightstatus",
    "Jetstar Japan": "https://booking.jetstar.com/flight-status/?culture=ja-jp&pid=subnav:flight-status",
    "ソラシドエア": "https://www.solaseedair.jp/prospect/",
    "スターフライヤー": "https://www.starflyer.jp/flight-info/",
    "AIRDO": "https://www.airdo.jp/flight-status/",
    "フジドリームエアラインズ": "https://www.fujidream.co.jp/flight_info/"
};


// --- DOM要素の取得 ---
const departureAirportSelect = document.getElementById("departure-airport-select");
const arrivalAirportSelect = document.getElementById("arrival-airport-select");
const dateSelect = document.getElementById("date-select"); // 日付選択のselect要素
const departureTimeInput = document.getElementById("departure-time");
const predictButton = document.getElementById("predict-button");
const resetButton = document.getElementById("reset-button");
const loadingIndicator = document.getElementById("loading-indicator");
const resultSection = document.getElementById("result-section");

// 出発空港の結果表示要素
const displayDepartureAirport = document.getElementById("display-departure-airport");
const displayDate = document.getElementById("display-date");
const displayTime = document.getElementById("display-time");
const departureWeatherIcon = document.getElementById("departure-weather-icon");
const displayDepartureWeather = document.getElementById("display-departure-weather");
const displayDepartureWind = document.getElementById("display-departure-wind");
const displayDepartureTemp = document.getElementById("display-departure-temp");
const displayDepartureHumidity = document.getElementById("display-departure-humidity");
const displayDeparturePressure = document.getElementById("display-departure-pressure");
const displayDepartureVisibility = document.getElementById("display-departure-visibility");
const displayDepartureClouds = document.getElementById("display-departure-clouds");
const displayDepartureRisk = document.getElementById("display-departure-risk");

// 到着空港の結果表示要素
const displayArrivalAirport = document.getElementById("display-arrival-airport");
const displayDateArrival = document.getElementById("display-date-arrival");
const displayTimeArrival = document.getElementById("display-time-arrival");
const arrivalWeatherIcon = document.getElementById("arrival-weather-icon");
const displayArrivalWeather = document.getElementById("display-arrival-weather");
const displayArrivalWind = document.getElementById("display-arrival-wind");
const displayArrivalTemp = document.getElementById("display-arrival-temp");
const displayArrivalHumidity = document.getElementById("display-arrival-humidity");
const displayArrivalPressure = document.getElementById("display-arrival-pressure");
const displayArrivalVisibility = document.getElementById("display-arrival-visibility");
const displayArrivalClouds = document.getElementById("display-arrival-clouds");
const displayArrivalRisk = document.getElementById("display-arrival-risk");

const airlineLinksContainer = document.getElementById("airline-links-container");

// このサイトについてセクションの要素
const aboutToggle = document.getElementById("about-toggle");
const aboutContent = document.getElementById("about-content");


// --- Select2の初期化とオプションの動的生成 ---
$(document).ready(function() {
    // 空港オプションデータを準備
    const airportOptionsData = [{ id: "", text: "空港を選択してください", selected: true, disabled: true }];
    Object.keys(AIRPORT_LOCATIONS).forEach(code => {
        airportOptionsData.push({
            id: code,
            text: `${AIRPORT_LOCATIONS[code].name} (${code})`
        });
    });

    // 出発空港のSelect2を適用
    $('#departure-airport-select').select2({
        placeholder: '出発空港を検索',
        data: airportOptionsData,
        language: "ja",
        width: 'resolve',
        dropdownAutoWidth: true
    });

    // 到着空港のSelect2を適用
    $('#arrival-airport-select').select2({
        placeholder: '到着空港を検索',
        data: airportOptionsData,
        language: "ja",
        width: 'resolve',
        dropdownAutoWidth: true
    });

    // 日付オプションを動的に生成
    generateDateOptions();

    // 航空会社リンクを生成して表示
    generateAirlineLinks();
});

// --- イベントリスナーの設定 ---
predictButton.addEventListener("click", predictFlightRisk);
resetButton.addEventListener("click", resetForm);
aboutToggle.addEventListener("click", toggleAboutSection);

// --- 欠航リスク予測のメイン関数 ---
async function predictFlightRisk() {
    const selectedDepartureAirportCode = departureAirportSelect.value;
    const selectedArrivalAirportCode = arrivalAirportSelect.value;
    const selectedDateValue = dateSelect.value;
    const selectedTime = departureTimeInput.value;

    // バリデーション
    if (!selectedDepartureAirportCode) {
        alert("出発空港を選択してください。");
        return;
    }
    if (!selectedArrivalAirportCode) {
        alert("到着空港を選択してください。");
        return;
    }
    if (!selectedTime) {
        alert("出発時刻を選択してください。");
        return;
    }
    if (selectedDepartureAirportCode === selectedArrivalAirportCode) {
        alert("出発空港と到着空港は異なる空港を選択してください。");
        return;
    }

    const departureAirportInfo = AIRPORT_LOCATIONS[selectedDepartureAirportCode];
    const arrivalAirportInfo = AIRPORT_LOCATIONS[selectedArrivalAirportCode];

    // ローディングインジケーターを表示し、結果セクションを非表示にする
    loadingIndicator.style.display = "flex";
    resultSection.style.display = "none";
    predictButton.disabled = true;

    try {
        // 出発空港の気象予報データを取得
        const departureForecastData = await getForecastDataForTime(
            departureAirportInfo.lat,
            departureAirportInfo.lon,
            selectedDateValue,
            selectedTime
        );

        // 到着空港の気象予報データを取得
        const arrivalForecastData = await getForecastDataForTime(
            arrivalAirportInfo.lat,
            arrivalAirportInfo.lon,
            selectedDateValue,
            selectedTime
        );

        if (!departureForecastData) {
            alert(`出発空港（${departureAirportInfo.name}）の指定された時刻の予報データが見つかりませんでした。`);
            return;
        }
        if (!arrivalForecastData) {
            alert(`到着空港（${arrivalAirportInfo.name}）の指定された時刻の予報データが見つかりませんでした。`);
            return;
        }

        // 出発空港のUIを更新
        updateAirportResultDisplay(
            'departure',
            departureAirportInfo.name,
            selectedDateValue,
            selectedTime,
            departureForecastData
        );

        // 到着空港のUIを更新
        updateAirportResultDisplay(
            'arrival',
            arrivalAirportInfo.name,
            selectedDateValue,
            selectedTime,
            arrivalForecastData
        );

        // 出発空港のリスクを判定・表示
        const departureRiskLevel = calculateRisk(departureForecastData);
        displayDepartureRisk.textContent = departureRiskLevel.text;
        displayDepartureRisk.className = '';
        displayDepartureRisk.classList.add(`risk-${departureRiskLevel.level}`);

        // 到着空港のリスクを判定・表示
        const arrivalRiskLevel = calculateRisk(arrivalForecastData);
        displayArrivalRisk.textContent = arrivalRiskLevel.text;
        displayArrivalRisk.className = '';
        displayArrivalRisk.classList.add(`risk-${arrivalRiskLevel.level}`);


        resultSection.style.display = "block";
    } catch (error) {
        console.error("予測中にエラーが発生しました:", error);
        alert("気象データの取得に失敗しました。もう一度お試しください。\nエラー: " + error.message);
    } finally {
        loadingIndicator.style.display = "none";
        predictButton.disabled = false;
    }
}

// --- OpenWeatherMapから気象予報データを取得し、指定時刻に最も近いデータを返す関数 ---
async function getForecastDataForTime(lat, lon, dateValue, timeString) {
    const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`;

    try {
        const response = await fetch(url);
        const responseText = await response.text();

        if (!response.ok) {
            let errorMessage = `APIからの応答エラー: ${response.status} ${response.statusText}`;
            try {
                const errorData = JSON.parse(responseText);
                if (errorData.message) {
                    errorMessage += `\n詳細: ${errorData.message}`;
                }
            } catch (parseError) {
                errorMessage += `\n生のレスポンス: ${responseText}`;
            }
            throw new Error(errorMessage);
        }

        const data = JSON.parse(responseText);

        const [year, month, day] = dateValue.split('-').map(Number);
        const [hours, minutes] = timeString.split(':').map(Number);
        const targetDateTime = new Date(year, month - 1, day, hours, minutes, 0, 0);

        let closestForecast = null;
        let minDiff = Infinity;

        data.list.forEach(forecastItem => {
            const forecastTime = new Date(forecastItem.dt * 1000);

            if (forecastTime.toDateString() === targetDateTime.toDateString()) {
                const diff = Math.abs(forecastTime.getTime() - targetDateTime.getTime());
                if (diff < minDiff) {
                    minDiff = diff;
                    closestForecast = forecastItem;
                }
            }
        });

        return closestForecast;

    } catch (fetchError) {
        console.error("Fetch エラー:", fetchError);
        if (fetchError.name === 'TypeError') {
            throw new Error("ネットワークエラー: インターネット接続を確認してください");
        } else {
            throw fetchError;
        }
    }
}

// --- 結果表示UIを更新する関数 (出発/到着で共通化) ---
function updateAirportResultDisplay(type, airportName, dateValue, timeString, forecastData) {
    const prefix = type === 'departure' ? 'departure' : 'arrival';

    document.getElementById(`display-${prefix}-airport`).textContent = airportName;
    
    const [year, month, day] = dateValue.split('-');
    const formattedDate = `${year}/${month}/${day}`;

    if (type === 'departure') {
        document.getElementById("display-date").textContent = formattedDate;
        document.getElementById("display-time").textContent = timeString;
    } else {
        document.getElementById("display-date-arrival").textContent = formattedDate;
        document.getElementById("display-time-arrival").textContent = timeString;
    }

    const weatherMain = forecastData.weather[0].main;
    const weatherDescription = forecastData.weather[0].description;
    const weatherIconCode = forecastData.weather[0].icon;
    const windSpeed = forecastData.wind.speed;
    const temperature = forecastData.main.temp;
    const humidity = forecastData.main.humidity;
    const pressure = forecastData.main.pressure;
    const visibility = forecastData.visibility;
    const clouds = forecastData.clouds.all;

    document.getElementById(`${prefix}-weather-icon`).src = `${WEATHER_ICON_BASE_URL}${weatherIconCode}@2x.png`;
    document.getElementById(`${prefix}-weather-icon`).alt = weatherDescription;

    document.getElementById(`display-${prefix}-weather`).textContent = `${weatherDescription} (${weatherMain})`;
    document.getElementById(`display-${prefix}-wind`).textContent = `${windSpeed.toFixed(1)} m/s`;
    document.getElementById(`display-${prefix}-temp`).textContent = `${temperature.toFixed(1)} °C`;
    document.getElementById(`display-${prefix}-humidity`).textContent = `${humidity}%`;
    document.getElementById(`display-${prefix}-pressure`).textContent = `${pressure} hPa`;
    document.getElementById(`display-${prefix}-visibility`).textContent = visibility !== undefined ? `${(visibility / 1000).toFixed(1)} km` : 'N/A';
    document.getElementById(`display-${prefix}-clouds`).textContent = `${clouds}%`;
}


// --- 欠航リスクを計算する関数 ---
function calculateRisk(forecastData) {
    const weatherId = forecastData.weather[0].id;
    const windSpeed = forecastData.wind.speed;

    let riskLevel = "low";
    let riskText = "低い (気象は良好と予測)";

    if (windSpeed >= 15) {
        riskLevel = "high";
        riskText = "高い (強風の影響)";
    } else if (windSpeed >= 10) {
        riskLevel = "medium";
        riskText = "中程度 (やや風が強い)";
    }

    if (weatherId >= 200 && weatherId < 300) { // 雷雨 (Thunderstorm)
        riskLevel = "high";
        riskText = "高い (雷雨の可能性)";
    } else if (weatherId >= 502 && weatherId <= 504 || weatherId === 522 || weatherId === 531) { // 激しい雨 (Heavy Rain, extreme rain)
        riskLevel = "high";
        riskText = "高い (激しい雨の影響)";
    } else if (weatherId >= 600 && weatherId < 700) { // 雪 (Snow)
        if (weatherId === 602 || weatherId === 622) {
             riskLevel = "high";
             riskText = "高い (大雪の影響)";
        } else if (riskLevel !== "high") {
            riskLevel = "medium";
            riskText = "中程度 (雪の影響)";
        }
    } else if (weatherId === 701 || weatherId === 741) { // 霧 (Mist, Fog)
        riskLevel = "high";
        riskText = "高い (濃霧による視程不良)";
    }

    if (riskLevel === "high") {
        return { level: "high", text: riskText };
    } else if (riskLevel === "medium") {
        return { level: "medium", text: riskText };
    } else {
        return { level: "low", text: riskText };
    }
}

// --- 航空会社リンクを生成する関数 ---
function generateAirlineLinks() {
    airlineLinksContainer.innerHTML = '';

    for (const airlineName in AIRLINE_STATUS_URLS) {
        const url = AIRLINE_STATUS_URLS[airlineName];
        const link = document.createElement('a');
        link.href = url;
        link.textContent = airlineName;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        airlineLinksContainer.appendChild(link);
    }
}

// --- フォームをリセットする関数 ---
function resetForm() {
    // Select2の選択をリセット
    $('#departure-airport-select').val('').trigger('change');
    $('#arrival-airport-select').val('').trigger('change');

    // 日付選択を今日に設定 (動的に生成されたオプションから今日を選択)
    const today = new Date();
    const todayFormatted = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    dateSelect.value = todayFormatted;

    departureTimeInput.value = "12:00";

    resultSection.style.display = "none";
    loadingIndicator.style.display = "none";
    predictButton.disabled = false;

    // 「このサイトについて」セクションを閉じる
    if (aboutContent.style.display !== "none") {
        toggleAboutSection();
    }
}

// --- 「このサイトについて」セクションの開閉機能 ---
function toggleAboutSection() {
    if (aboutContent.style.display === "none") {
        aboutContent.style.display = "block";
        aboutToggle.textContent = "このサイトについて ▲";
    } else {
        aboutContent.style.display = "none";
        aboutToggle.textContent = "このサイトについて ▼";
    }
}

// --- 日付オプションを動的に生成する関数 ---
function generateDateOptions() {
    dateSelect.innerHTML = '';

    const today = new Date();
    const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

    for (let i = 0; i < 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const dayOfWeek = daysOfWeek[date.getDay()];

        const value = `${year}-${month}-${day}`;
        let text = `${month}月${day}日 (${dayOfWeek})`;

        if (i === 0) {
            text += " (今日)";
        } else if (i === 1) {
            text += " (明日)";
        }

        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        dateSelect.appendChild(option);
    }
    dateSelect.value = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
}