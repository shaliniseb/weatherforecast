<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

/**
 * @desc class contains function related to weather forecast
 * get current weather,
 */
class WeatherController extends Controller
{

    /***
     * @desc function return json response of the weather in the given location
     * @input place - eg: London
     * @return json response of the weather ref: https://openweathermap.org/api/one-call-3
     */
    public function currentWeather($place)
    {
        //if the place value is not null then fetch data else return error
        if ($place != '') {

            //Get coridinates for the given input place
            $cordinates = $this->getLatLong($place);

            //If cordinates are available then fetch weather info else return error code
            if (!empty($cordinates)) {

                //fetch weather info
                $latitude = $cordinates['lat'];
                $longitude = $cordinates['lon'];
                $excludeParam = 'minutely,hourly,daily,alerts';
                $jsonData = $this->getWeather($latitude, $longitude, $excludeParam);

                //if weather info available for the cordinates then return it else return an error code
                if (!empty($jsonData)) {
                    $data['status'] = 200;
                    $data['c_weather'] = $jsonData['current']['weather'][0]['main'];
                    $data['lat'] = $jsonData['lat'];
                    $data['lon'] = $jsonData['lon'];
                    $data['description'] = $jsonData['current']['weather'][0]['description'];
                    $data['feel_like'] = $jsonData['current']['feels_like'];
                    $data['humidity'] = $jsonData['current']['humidity'];
                    $data['temp'] = $jsonData['current']['temp'];
                    return response(json_encode($data), 200);
                } else {
                    return response()->json(['status' => 500, 'message' => 'No data found for the given location'], 200);
                }
            } else {
                return response()->json(['status' => 500, 'message' => 'No data found for the given location'], 200);
            }
        } else {
            return response()->json(['status' => 422, 'message' => 'Invalid input data'], 200);
        }
    }

    /**
     * @desc fetch weather forecast for 24 hours
     * @input place given by the user
     * @output json array of elements
     */
    public function dayWeather($place)
    {
        //if the place value is not null then fetch data else return error
        if ($place != '') {

            //Get coridinates for the given input place
            $cordinates = $this->getLatLong($place);

            //If cordinates are available then fetch weather info else return error code
            if (!empty($cordinates)) {

                //fetch weather info
                $latitude = $cordinates['lat'];
                $longitude = $cordinates['lon'];
                $excludeParam = 'current,minutely,daily,alerts';
                $jsonData = $this->getWeather($latitude, $longitude, $excludeParam);

                //if weather info available for the cordinates then return it else return an error code
                if (!empty($jsonData)) {
                    $data = array('status' => 200);

                    //fetch value of each hour and extract requied elements
                    foreach ($jsonData['hourly'] as $hourlyData) {
                        $hdata['hour'] = date('h a', $hourlyData['dt']);
                        $hdata['weather'] = $hourlyData['weather'][0]['main'];
                        $hdata['temp'] = number_format($hourlyData['temp']);
                        $data['data'][] = $hdata;
                    }
                    return response(($data), 200);
                } else {
                    return response()->json(['status' => 500, 'message' => 'No data found'], 200);
                }
            } else {
                return response()->json(['status' => 500, 'message' => 'No data found for the given location'], 200);
            }
        } else {
            return response()->json(['status' => 422, 'message' => 'Invalid input data'], 200);
        }
    }

    /**
     * @desc fetch weather forecast for next 7 days
     * @input place given by the user
     * @output json array of elements
     */
    public function weeklyWeather($place)
    {
        //if the place value is not null then fetch data else return error
        if ($place != '') {

            //Get coridinates for the given input place
            $cordinates = $this->getLatLong($place);

            //If cordinates are available then fetch weather info else return error code
            if (!empty($cordinates)) {

                //fetch weather info
                $latitude = $cordinates['lat'];
                $longitude = $cordinates['lon'];
                $excludeParam = 'minutely,hourly,current,alerts';
                $jsonData = $this->getWeather($latitude, $longitude, $excludeParam);

                //if weather info available for the cordinates then return it else return an error code
                if (!empty($jsonData)) {
                    $data = array('status' => 200);

                    //fetch value of each hour and extract requied elements
                    foreach ($jsonData['daily'] as $dayData) {
                        $hdata['hour'] = date('D, M d', $dayData['dt']);
                        $hdata['weather'] = $dayData['weather'][0]['main'];
                        $hdata['temp'] = number_format($dayData['temp']['min']) . '/' . number_format($dayData['temp']['max']);
                        $data['data'][] = $hdata;
                    }
                    return response(($data), 200);
                } else {
                    return response()->json(['status' => 500, 'message' => 'No data found for the given location'], 200);
                }
            } else {
                return response()->json(['status' => 500, 'message' => 'No data found for the given location'], 200);
            }
        } else {
            return response()->json(['status' => 422, 'message' => 'Invalid input data'], 200);
        }
    }

    /**
     * @desc get weather info from the api based on conditions
     * @ref https://openweathermap.org/api/one-call-3
     * @input latitude, longitude and param list
     */
    function getWeather($latitude, $longitude, $excludeParam)
    {
        $weatherUrl = config('app.weather_api_url') . 'lat=' . $latitude . '&lon=' . $longitude . '&exclude=' . $excludeParam . '&appid=' . config('app.app_id') . '&units=metric';
        $response =  Http::withoutVerifying()
            ->withOptions(["verify" => false])->get($weatherUrl);
        $jsonData = $response->json();
        return  $jsonData;
    }
    /**
     * @desc funtion to return latitude and longitude of the given location
     * @input place
     * @return  array - if the data available return an array of lat and lon value else return an empty array
     */
    function getLatLong($place)
    {
        $cordinates = array();
        $geocodeUrl     = config('app.geocoding_api_url') . 'q=' . $place . '&limit=1&appid=' . config('app.app_id');
        $geocodeResponse = Http::get($geocodeUrl);
        $gCodeJson = $geocodeResponse->json();

        //if there is lat and lon value return array else return an empty array
        if (!empty($gCodeJson)) {
            $cordinates['lat'] = $gCodeJson[0]['lat'];
            $cordinates['lon'] = $gCodeJson[0]['lon'];
        }
        return $cordinates;
    }
}
