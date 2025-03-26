import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { MapPin, Mountain, Star, X, Heart } from "lucide-react-native";

interface ProfileCardProps {
  id: string;
  name: string;
  age: number;
  imageUrl: string;
  skillLevel: string;
  preferredTerrain: string;
  homeResort: string;
  bio: string;
  onSwipeLeft?: (id: string) => void;
  onSwipeRight?: (id: string) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

const ProfileCard = ({
  id = "1",
  name = "Alex Johnson",
  age = 28,
  imageUrl = "https://images.unsplash.com/photo-1564164841584-391b5561d85e?w=800&q=80",
  skillLevel = "Advanced",
  preferredTerrain = "Backcountry",
  homeResort = "Whistler Blackcomb",
  bio = "Looking for powder buddies who enjoy exploring the backcountry. Always chasing fresh tracks!",
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
}: ProfileCardProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
      rotation.value = (translateX.value / SCREEN_WIDTH) * 15; // -15 to 15 degrees
    },
    onEnd: (event) => {
      if (translateX.value > SWIPE_THRESHOLD) {
        // Swipe right
        translateX.value = withSpring(SCREEN_WIDTH * 1.5);
        runOnJS(onSwipeRight)(id);
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        // Swipe left
        translateX.value = withSpring(-SCREEN_WIDTH * 1.5);
        runOnJS(onSwipeLeft)(id);
      } else {
        // Return to center
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotation.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  const likeOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: translateX.value > SWIPE_THRESHOLD / 2 ? 1 : 0,
    };
  });

  const nopeOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: translateX.value < -SWIPE_THRESHOLD / 2 ? 1 : 0,
    };
  });

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          className="w-[350px] h-[500px] bg-white rounded-3xl overflow-hidden shadow-lg"
          style={[animatedStyle]}
        >
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-3/5"
            contentFit="cover"
          />

          {/* Like Overlay */}
          <Animated.View
            className="absolute top-5 right-5 bg-green-500/80 px-4 py-2 rounded-full border-2 border-white rotate-12"
            style={likeOpacityStyle}
          >
            <View className="flex-row items-center">
              <Heart size={24} color="white" />
              <Text className="text-white font-bold text-xl ml-1">LIKE</Text>
            </View>
          </Animated.View>

          {/* Nope Overlay */}
          <Animated.View
            className="absolute top-5 left-5 bg-red-500/80 px-4 py-2 rounded-full border-2 border-white -rotate-12"
            style={nopeOpacityStyle}
          >
            <View className="flex-row items-center">
              <X size={24} color="white" />
              <Text className="text-white font-bold text-xl ml-1">NOPE</Text>
            </View>
          </Animated.View>

          <View className="p-4 flex-1 bg-white">
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-gray-800">
                {name}, {age}
              </Text>
            </View>

            <View className="mt-2 flex-row items-center">
              <MapPin size={18} color="#4F46E5" />
              <Text className="ml-1 text-gray-700">{homeResort}</Text>
            </View>

            <View className="mt-2 flex-row flex-wrap">
              <View className="flex-row items-center bg-blue-100 rounded-full px-3 py-1 mr-2 mb-2">
                <Star size={16} color="#4F46E5" />
                <Text className="ml-1 text-blue-800">{skillLevel}</Text>
              </View>

              <View className="flex-row items-center bg-purple-100 rounded-full px-3 py-1 mr-2 mb-2">
                <Mountain size={16} color="#7C3AED" />
                <Text className="ml-1 text-purple-800">{preferredTerrain}</Text>
              </View>
            </View>

            <Text className="mt-2 text-gray-600">{bio}</Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default ProfileCard;
