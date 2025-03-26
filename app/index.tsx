import React, { useState } from "react";
import { View, Text, ScrollView, StatusBar, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Import components
import Header from "../components/Header";
import WeatherWidget from "../components/WeatherWidget";
import MatchStack from "../components/MatchStack";
import BottomNavigation from "../components/BottomNavigation";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("home");

  // Sample weather data
  const weatherData = {
    resortName: "Whistler Blackcomb",
    temperature: -2,
    condition: "snowing",
    snowDepth: 45,
    forecast: [
      { day: "Today", condition: "snowing", temperature: -2 },
      { day: "Tue", condition: "cloudy", temperature: 0 },
      { day: "Wed", condition: "sunny", temperature: 2 },
      { day: "Thu", condition: "mixed", temperature: -1 },
    ],
  };

  // Sample profiles data
  const profiles = [
    {
      id: "1",
      name: "Alex Johnson",
      age: 28,
      imageUrl:
        "https://images.unsplash.com/photo-1564164841584-391b5561d85e?w=800&q=80",
      skillLevel: "Advanced",
      preferredTerrain: "Backcountry",
      homeResort: "Whistler Blackcomb",
      bio: "Looking for powder buddies who enjoy exploring the backcountry. Always chasing fresh tracks!",
    },
    {
      id: "2",
      name: "Sarah Miller",
      age: 25,
      imageUrl:
        "https://images.unsplash.com/photo-1603123853880-a92fafb7809f?w=800&q=80",
      skillLevel: "Intermediate",
      preferredTerrain: "Groomed Runs",
      homeResort: "Aspen Snowmass",
      bio: "Weekend warrior looking for ski buddies to enjoy the mountain with. Love cruising groomers and occasional tree runs.",
    },
    {
      id: "3",
      name: "Mike Chen",
      age: 31,
      imageUrl:
        "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=800&q=80",
      skillLevel: "Expert",
      preferredTerrain: "Park",
      homeResort: "Park City",
      bio: "Park rat looking for friends to session with. Always working on new tricks and pushing my limits.",
    },
    {
      id: "4",
      name: "Emma Wilson",
      age: 27,
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
      skillLevel: "Advanced",
      preferredTerrain: "All Mountain",
      homeResort: "Vail",
      bio: "Passionate skier who loves exploring every corner of the mountain. Looking for adventure partners!",
    },
  ];

  // Handle match events
  const handleMatch = (profileId) => {
    console.log(`Matched with profile ${profileId}`);
    // In a real app, this would update the database and potentially navigate to messages
  };

  const handleSwipeLeft = (profileId) => {
    console.log(`Swiped left on profile ${profileId}`);
    // In a real app, this would update user preferences
  };

  const handleSwipeRight = (profileId) => {
    console.log(`Swiped right on profile ${profileId}`);
    // In a real app, this would update user preferences and check for matches
  };

  const handleEmptyStack = () => {
    console.log("No more profiles to show");
    // In a real app, this might trigger loading more profiles or showing a message
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1">
        <Header />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          showsVerticalScrollIndicator={false}
        >
          {/* Weather Widget */}
          <View className="px-4 pt-2 pb-4">
            <WeatherWidget
              resortName={weatherData.resortName}
              temperature={weatherData.temperature}
              condition={weatherData.condition}
              snowDepth={weatherData.snowDepth}
              forecast={weatherData.forecast}
            />
          </View>

          {/* Match Stack */}
          <View className="flex-1" style={{ height: 600 }}>
            <MatchStack
              profiles={profiles}
              onMatch={handleMatch}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              onEmptyStack={handleEmptyStack}
            />
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab={activeTab} />
      </SafeAreaView>
    </View>
  );
}
