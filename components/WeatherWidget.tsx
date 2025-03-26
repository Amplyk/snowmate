import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import {
  Cloud,
  CloudSnow,
  Snowflake,
  Sun,
  ThermometerSnowflake,
} from "lucide-react-native";

interface WeatherWidgetProps {
  resortName?: string;
  temperature?: number;
  condition?: "sunny" | "cloudy" | "snowing" | "mixed";
  snowDepth?: number;
  forecast?: {
    day: string;
    condition: "sunny" | "cloudy" | "snowing" | "mixed";
    temperature: number;
  }[];
}

const WeatherWidget = ({
  resortName = "Whistler Blackcomb",
  temperature = -2,
  condition = "snowing",
  snowDepth = 45,
  forecast = [
    { day: "Today", condition: "snowing", temperature: -2 },
    { day: "Tue", condition: "cloudy", temperature: 0 },
    { day: "Wed", condition: "sunny", temperature: 2 },
    { day: "Thu", condition: "mixed", temperature: -1 },
  ],
}: WeatherWidgetProps) => {
  const getConditionIcon = (condition: string, size = 24) => {
    switch (condition) {
      case "sunny":
        return <Sun size={size} color="#FFD700" />;
      case "cloudy":
        return <Cloud size={size} color="#CCCCCC" />;
      case "snowing":
        return <CloudSnow size={size} color="#FFFFFF" />;
      case "mixed":
        return <Snowflake size={size} color="#A5F2F3" />;
      default:
        return <Sun size={size} color="#FFD700" />;
    }
  };

  return (
    <View className="w-full bg-blue-900 rounded-xl p-4 shadow-md">
      {/* Resort and current conditions */}
      <View className="flex-row justify-between items-center mb-2">
        <View>
          <Text className="text-white font-bold text-lg">{resortName}</Text>
          <View className="flex-row items-center">
            <ThermometerSnowflake size={16} color="#FFFFFF" />
            <Text className="text-white ml-1">{temperature}°C</Text>
          </View>
        </View>
        <View className="items-center">
          {getConditionIcon(condition, 36)}
          <Text className="text-white capitalize mt-1">{condition}</Text>
        </View>
      </View>

      {/* Snow depth */}
      <View className="bg-blue-800 rounded-lg p-2 mb-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-white font-medium">Fresh Snow</Text>
          <View className="flex-row items-center">
            <Snowflake size={16} color="#FFFFFF" />
            <Text className="text-white font-bold ml-1">{snowDepth}cm</Text>
          </View>
        </View>
      </View>

      {/* Forecast */}
      <Text className="text-white font-medium mb-2">Forecast</Text>
      <View className="flex-row justify-between">
        {forecast.map((day, index) => (
          <View key={index} className="items-center">
            <Text className="text-white text-xs">{day.day}</Text>
            {getConditionIcon(day.condition, 20)}
            <Text className="text-white text-xs mt-1">{day.temperature}°C</Text>
          </View>
        ))}
      </View>

      {/* View full forecast button */}
      <TouchableOpacity className="mt-3 bg-blue-700 rounded-lg py-2 items-center">
        <Text className="text-white font-medium">View Full Forecast</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WeatherWidget;
