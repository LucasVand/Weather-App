
import { fetchWeatherApi } from "openmeteo"




export const defaultWeather: WeatherData = {
    current: {
        time: new Date(Date.now()),
        temperature2m: 0,
        relative_humidity_2m: 0,
        apparent_temperature: 0,

    },
    location: {
        longitude: 0,
        latitude: 0,
        locationData: 'Error'
    },
    hourly: {

        precipitationChance: new Float32Array(168),
        dew_point: new Float32Array(168),
        uv_index: new Float32Array(168)
    },
    daily: {
        precipitation: new Float32Array(7),
        temperature_Max: new Float32Array(7),
        temperature_Min: new Float32Array(7),
        precipitation_probability_max: new Float32Array(7)

    },

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

    precipitationChance: Float32Array
    dew_point: Float32Array
    uv_index: Float32Array
}
interface Location {
    longitude: number,
    latitude: number
    locationData: any
}
interface Daily {
    precipitation: Float32Array
    temperature_Max: Float32Array
    temperature_Min: Float32Array
    precipitation_probability_max: Float32Array
}


var lat = 44.00523
var long = -81.27308


export async function getWeather(la: number, lo: number) {
    long = lo
    lat = la


    //Reverse Engineering Location
    const locationDataFetch = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
    const locationData = await locationDataFetch.json()





    const params = {
        "latitude": lat,
        "longitude": long,
        "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature"],
        "hourly": ["dew_point_2m", "precipitation_probability", "uv_index"],
        "daily": ["temperature_2m_max", "temperature_2m_min", "precipitation_sum", "precipitation_probability_max"]
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

            precipitationChance: hourly.variables(1)!.valuesArray() || new Float32Array(168),
            dew_point: hourly.variables(0)!.valuesArray() || new Float32Array(168),
            uv_index: hourly.variables(2)!.valuesArray() || new Float32Array(168)
        },
        daily: {
            precipitation: daily.variables(2)!.valuesArray() || new Float32Array(7),
            temperature_Max: daily.variables(0)!.valuesArray() || new Float32Array(7),
            temperature_Min: daily.variables(1)!.valuesArray() || new Float32Array(7),
            precipitation_probability_max: daily.variables(3)!.valuesArray() || new Float32Array(7)
        }
    };


    return weatherData
}


