// src/WebServer.tsx
import React, { useState, useEffect } from "react";
import { Slider, SliderSingleProps, Switch } from "antd";
import { backendUrl } from "./Admin.tsx";

type Data = {
  soilMoisture: number;
  foodLevel: number;
  temperature: number;
  humidity: number;
  button1: boolean;
  button2: boolean;
  button3: boolean;
  pumperButton: boolean;
  servoButton: boolean;
  isAutoMode: boolean;
  temperatureThreshold: number;
  humidityThreshold: number;
  soilMoistureThreshold: number;
  lowFoodLevelThreshold: number;
  highFoodLevelThreshold: number;
};

const Screen31: React.FC = () => {
  const [isAutoMode, setIsAutoMode] = useState<boolean>(true);
  const [pumperState, setPumperState] = useState<boolean>(false);
  const [servoState, setServoState] = useState<boolean>(false);
  const [led3State, setLed3State] = useState<boolean>(false);
  const [led1State, setLed1State] = useState<boolean>(true);
  const [led2State, setLed2State] = useState<boolean>(true);
  const [humidity, setHumidity] = useState<number>();
  const [temperature, setTemperature] = useState<number>();
  const [soilMoisture, setSoilMoisture] = useState<number>();
  const [foodLevel, setFoodLevel] = useState<number>();
  const [humidityThreshold, setHumidityThreshold] = useState<number>();
  const [temperatureThreshold, setTemperatureThreshold] = useState<number>();
  const [soilMoistureThreshold, setSoilMoistureThreshold] = useState<number>();
  const [lowFoodLevelThreshold, setLowFoodLevelThreshold] = useState<number>();
  const [highFoodLevelThreshold, setHighFoodLevelThreshold] = useState<number>();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(foodLevel);
        const response = await fetch(`${backendUrl}/app/data`);
        const data: Data = await response.json();
        setLed1State(data.button1);
        setLed2State(data.button2);
        setLed3State(data.button3);
        setPumperState(data.pumperButton);
        setServoState(data.servoButton);
        setIsAutoMode(data.isAutoMode);
        setTemperature(data.temperature);
        setHumidity(data.humidity);
        setSoilMoisture(data.soilMoisture);
        setFoodLevel(data.foodLevel);
        setTemperatureThreshold(data.temperatureThreshold);
        setHumidityThreshold(data.humidityThreshold);
        setSoilMoistureThreshold(data.soilMoistureThreshold);
        setLowFoodLevelThreshold(data.lowFoodLevelThreshold);
        setHighFoodLevelThreshold(data.highFoodLevelThreshold);
        console.log(data.foodLevel);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const onChange = async () => {
    try {
      const response = await fetch(`${backendUrl}/app/auto`);
      const data: boolean = await response.json();
      setIsAutoMode(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onLed3Change = async () => {
    try {
      const response = await fetch(`${backendUrl}/app/led3`);
      const data: boolean = await response.json();
      setLed3State(data);
    } catch (e) {
      console.error(e);
    }
  };

  const onPumperChange = async () => {
    try {
      const response = await fetch(`${backendUrl}/app/pumper`);
      const data: boolean = await response.json();
      setPumperState(data);
    } catch (e) {
      console.error(e);
    }
  };

  const onServoChange = async () => {
    try {
      const response = await fetch(`${backendUrl}/app/servo`);
      const data: boolean = await response.json();
      setServoState(data);
    } catch (e) {
      console.error(e);
    }
  };

  const onLed1Change = async () => {
    try {
      const response = await fetch(`${backendUrl}/app/toggle/1`);
      const data: boolean = await response.json();
      setLed1State(data);
    } catch (e) {
      console.error(e);
    }
  };
  const onLed2Change = async () => {
    try {
      const response = await fetch(`${backendUrl}/app/toggle/2`);
      const data: boolean = await response.json();
      setLed2State(data);
    } catch (e) {
      console.error(e);
    }
  };

  const onHumidityThresholdChange = async (value: number) => {
    const threshold = {
      temperature: temperatureThreshold,
      humidity: value,
      soilMoisture: soilMoistureThreshold,
      lowFoodLevel: lowFoodLevelThreshold,
      highFoodLevel: highFoodLevelThreshold,
    };
    updateThreshold(threshold);
  };

  const onTemperatureThresholdChange = async (value: number) => {
    const threshold = {
      temperature: value,
      humidity: humidityThreshold,
      soilMoisture: soilMoistureThreshold,
      lowFoodLevel: lowFoodLevelThreshold,
      highFoodLevel: highFoodLevelThreshold,
    };
    updateThreshold(threshold);
  };

  const onSoilMoistureThresholdChange = async (value: number) => {
    const threshold = {
      temperature: temperatureThreshold,
      humidity: humidityThreshold,
      soilMoisture: value,
      lowFoodLevel: lowFoodLevelThreshold,
      highFoodLevel: highFoodLevelThreshold,
    };
    updateThreshold(threshold);
  };

  const onFoodLevelThresholdChange = async (value: number[]) => {
    const threshold = {
      temperature: temperatureThreshold,
      humidity: humidityThreshold,
      soilMoisture: soilMoistureThreshold,
      lowFoodLevel: value[0],
      highFoodLevel: value[1],
    };

    updateThreshold(threshold);
  };

  const updateThreshold = async (threshold) => {
    try {
      console.log(threshold);
      const response = await fetch(`${backendUrl}/app/threshold`, {
        method: "POST",
        body: JSON.stringify(threshold),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.error("Failed to update threshold:", response.statusText);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const temperatureMarks: SliderSingleProps["marks"] = {
    0: "0°C",
    30: "30°C",
    60: {
      style: {
        color: "#f50",
      },
      label: <strong>60°C</strong>,
    },
  };
  const humidityMarks: SliderSingleProps["marks"] = {
    0: "0%",
    40: "40%",
    80: {
      style: {
        color: "#f50",
      },
      label: <strong>80%</strong>,
    },
  };
  const soilMoistureMarks: SliderSingleProps["marks"] = {
    0: "0%",
    30: "30%",
    80: {
      style: {
        color: "#f50",
      },
      label: <strong>80%</strong>,
    },
  };
  const foodLevelMarks: SliderSingleProps["marks"] = {
    0: "0 cm",
    50: "50 cm",
    100: {
      style: {
        color: "#f50",
      },
      label: <strong>100 cm</strong>,
    },
  };

  return (
    <div className="flex justify-center items-center h-auto p-8 bg-gray-100">
      <div className="lg:w-2/3 sm:w-[95%] bg-white flex p-8 rounded-lg shadow-lg">
        <div className={`w-1/4`}>
          <h1 className="text-2xl font-bold mb-6 text-gray-700">
            ESP32 Web Server
          </h1>
          <div className="flex flex-col gap-4 mb-6">
            <div className={`flex gap-4`}>
              <p>Led 1: </p>
              <Switch value={led1State} onChange={onLed1Change} />
            </div>
            <div className={`flex gap-4`}>
              <p>Led 2: </p>
              <Switch value={led2State} onChange={onLed2Change} />
            </div>
          </div>
          <p className="text-lg text-gray-600">
            Temperature:{" "}
            <span className="font-semibold">
              {temperature ?? temperature} °C
            </span>
          </p>
          <p className="text-lg text-gray-600">
            Humidity: <span className="font-semibold">{humidity} %</span>
          </p>
          <p className="text-lg text-gray-600">
            Soil Moisture:{" "}
            <span className="font-semibold">{soilMoisture} %</span>
          </p>
          <p className="text-lg text-gray-600">
            Food:{" "}
            <span className="font-semibold">
              {Math.round(foodLevel * 10) / 10} cm
            </span>
          </p>
        </div>
        <div className={`w-3/4 flex flex-col gap-6`}>
          <div className={`flex gap-4`}>
            <p>Auto mode: </p>
            <Switch value={isAutoMode} onChange={onChange} />
          </div>
          <p className={`font-bold text-[18px] ${!isAutoMode && "hidden"}`}>
            Threshold:
          </p>
          {isAutoMode ? (
            <div className={`flex flex-col gap-6`}>
              <div className={`flex gap-4 items-center justify-between w-full`}>
                <p className={`w-[100px]`}>Temperature: </p>
                <Slider
                  className={`w-3/5`}
                  value={temperatureThreshold}
                  onChange={(value) => setTemperatureThreshold(value)}
                  onChangeComplete={onTemperatureThresholdChange}
                  max={60}
                  marks={temperatureMarks}
                  defaultValue={temperatureThreshold ?? temperatureThreshold}
                />
                <Switch
                  className=""
                  value={led3State}
                  disabled={isAutoMode}
                  onChange={onLed3Change}
                />
              </div>
              <div className={`flex gap-4 items-center w-full justify-between`}>
                <p className={`w-[100px]`}>Humidity: </p>
                <Slider
                  className={`w-3/5`}
                  value={humidityThreshold}
                  onChange={(value) => setHumidityThreshold(value)}
                  onChangeComplete={onHumidityThresholdChange}
                  max={80}
                  marks={humidityMarks}
                  defaultValue={humidityThreshold ?? humidityThreshold}
                />
                <Switch
                  className="invisible"
                  value={led3State}
                  disabled={isAutoMode}
                  onChange={onLed3Change}
                />
              </div>
              <div className={`flex gap-4 items-center w-full justify-between`}>
                <p className={`w-[100px]`}>Soil Moisture: </p>
                <Slider
                  className={`w-3/5`}
                  value={soilMoistureThreshold}
                  onChange={(value) => setSoilMoistureThreshold(value)}
                  onChangeComplete={onSoilMoistureThresholdChange}
                  max={80}
                  marks={soilMoistureMarks}
                  defaultValue={soilMoistureThreshold ?? soilMoistureThreshold}
                />
                <Switch
                  value={pumperState}
                  disabled={isAutoMode}
                  onChange={onPumperChange}
                />
              </div>
              <div className={`flex gap-4 items-center w-full justify-between`}>
                <p className={`w-[100px]`}>Food: </p>
                <Slider
                  className={`w-3/5`}
                  value={[lowFoodLevelThreshold, highFoodLevelThreshold]}
                  onChange={([value1, value2]) => {
                    if (value1 > value2) {
                      const temp = value1;
                      value1 = value2;
                      value2 = temp;
                    }
                    setLowFoodLevelThreshold(value1);
                    setHighFoodLevelThreshold(value2);
                  }}
                  onChangeComplete={onFoodLevelThresholdChange}
                  marks={foodLevelMarks}
                  range
                  defaultValue={[20, 50]}
                  min={0}
                  max={100}
                />
                <Switch
                  value={servoState}
                  disabled={isAutoMode}
                  onChange={onServoChange}
                />
              </div>
            </div>
          ) : (
            <div className="w-1/3">
              <div className={`flex mt-4 gap-4 justify-between flex-1`}>
                <p className="">Fan: </p>
                <Switch
                  className=""
                  value={led3State}
                  disabled={isAutoMode}
                  onChange={onLed3Change}
                />
              </div>
              <div className={`flex mt-4 gap-4 flex-1 justify-between`}>
                <p>Pumper: </p>
                <Switch
                  value={pumperState}
                  disabled={isAutoMode}
                  onChange={onPumperChange}
                />
              </div>
              <div className={`flex mt-4 gap-4 flex-1 justify-between`}>
                <p>Food: </p>
                <Switch
                  value={servoState}
                  disabled={isAutoMode}
                  onChange={onServoChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Screen31;
