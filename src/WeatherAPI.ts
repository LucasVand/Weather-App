
import { fetchWeatherApi } from "openmeteo"


var apiCallCount = 0;

export const defaultWeather: WeatherData = {
    current: {
        time: new Date(Date.now()),
        temperature2m: 20,
        relative_humidity_2m: 20,
        apparent_temperature: 20,

    },
    location: {
        longitude: 0,
        latitude: 0,
        locationData: 'Error'
    },
    hourly: {

        precipitationChance: 30,
        dew_point: 18
    },
    daily: {
        precipitation: 5
    }

}



export interface WeatherData {
    current: Current
    location: Location
    hourly: Hourly
    daily: Daily
}
interface Current {
    time: Date,
    temperature2m: number
    relative_humidity_2m: number
    apparent_temperature: number

}
interface Hourly {

    precipitationChance: number
    dew_point: number
}
interface Location {
    longitude: number,
    latitude: number
    locationData: any
}
interface Daily {
    precipitation: number
}

var lat = 44.51857
var long = -80.81476

async function getWeather() {
    apiCallCount++;
    console.log(apiCallCount)

    //Getting Location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success)
    }
    else {
        console.log('Cant Fetch Location')
    }

    //Reverse Engineering Location
    const locationDataFetch = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
    const locationData = await locationDataFetch.json()


    const params = {
        "latitude": lat,
        "longitude": long,
        "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature"],
        "hourly": ["precipitation_probability", "dew_point_2m"],
        "daily": "precipitation_sum"
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData: WeatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0)!.value(),
            relative_humidity_2m: current.variables(1)!.value(),
            apparent_temperature: current.variables(2)!.value()
        },
        location: {
            longitude: long,
            latitude: lat,
            locationData: locationData

        },
        hourly: {

            precipitationChance: hourly.variables(0)!.value(),
            dew_point: hourly.variables(1)!.value(),
        },
        daily: {
            precipitation: daily.variables(0)!.value()
        }
    };

    return weatherData
}

function success(position: any) {
    lat = position.coords.latitude
    long = position.coords.longitude
}

export const weatherDataPromise = getWeather()



