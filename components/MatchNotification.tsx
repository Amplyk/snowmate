import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { BlurView } from "expo-blur";
import { MessageCircle, X } from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface MatchNotificationProps {
  isVisible?: boolean;
  matchedUser?: {
    name: string;
    age: number;
    image: string;
    skillLevel: string;
    resort: string;
  };
  onClose?: () => void;
  onMessage?: () => void;
}

const MatchNotification = ({
  isVisible = true,
  matchedUser = {
    name: "Sarah",
    age: 28,
    image:
      "https://images.unsplash.com/photo-1603123853880-a92fafb7809f?w=400&q=80",
    skillLevel: "Advanced",
    resort: "Whistler Blackcomb",
  },
  onClose = () => {},
  onMessage = () => {},
}: MatchNotificationProps) => {
  const [animation] = useState(new Animated.Value(0));
  const [confettiAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      // Trigger haptic feedback when match appears
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Animate modal in
      Animated.spring(animation, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();

      // Animate confetti
      Animated.timing(confettiAnimation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    } else {
      // Animate modal out
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const modalScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const modalOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View className="absolute inset-0 flex items-center justify-center z-50 bg-black/50">
      <BlurView intensity={30} className="absolute inset-0" />

      <Animated.View
        style={{
          transform: [{ scale: modalScale }],
          opacity: modalOpacity,
        }}
        className="w-[300px] bg-white rounded-3xl overflow-hidden shadow-xl"
      >
        {/* Confetti animation container */}
        <View className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <Animated.View
              key={i}
              className="absolute w-2 h-6 bg-blue-500 rounded-full"
              style={{
                top: Math.random() * 350,
                left: Math.random() * 300,
                backgroundColor: [
                  "#FF5F6D",
                  "#38AECC",
                  "#FFBE0B",
                  "#3A86FF",
                  "#FB5607",
                ][Math.floor(Math.random() * 5)],
                transform: [
                  {
                    translateY: confettiAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 400 + Math.random() * 100],
                    }),
                  },
                  {
                    rotate: `${Math.random() * 360}deg`,
                  },
                ],
                opacity: confettiAnimation.interpolate({
                  inputRange: [0, 0.7, 1],
                  outputRange: [1, 1, 0],
                }),
              }}
            />
          ))}
        </View>

        {/* Match header */}
        <View className="px-6 pt-6 pb-4 items-center">
          <Text className="text-3xl font-bold text-center text-blue-600 mb-2">
            It's a Match!
          </Text>
          <Text className="text-gray-600 text-center mb-4">
            You and {matchedUser.name} want to hit the slopes together
          </Text>
        </View>

        {/* Profile images */}
        <View className="flex-row justify-center items-center px-6 py-4">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=200&q=80",
            }}
            className="w-32 h-32 rounded-full border-4 border-white -mr-4 z-10"
          />
          <Image
            source={{ uri: matchedUser.image }}
            className="w-32 h-32 rounded-full border-4 border-white -ml-4"
          />
        </View>

        {/* Match details */}
        <View className="px-6 py-2">
          <Text className="text-center text-gray-700">
            {matchedUser.name}, {matchedUser.age} • {matchedUser.skillLevel}
          </Text>
          <Text className="text-center text-gray-500 text-sm">
            {matchedUser.resort}
          </Text>
        </View>

        {/* Action buttons */}
        <View className="flex-row px-6 py-6 border-t border-gray-100 mt-2">
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onMessage();
            }}
            className="flex-1 bg-blue-500 py-3 rounded-full flex-row justify-center items-center mr-2"
          >
            <MessageCircle size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Message</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onClose();
            }}
            className="flex-1 bg-gray-200 py-3 rounded-full flex-row justify-center items-center ml-2"
          >
            <X size={20} color="#666" />
            <Text className="text-gray-700 font-semibold ml-2">
              Keep Swiping
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default MatchNotification;
