import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { X, Heart } from "lucide-react-native";
import * as Haptics from "expo-haptics";

import ProfileCard from "./ProfileCard";
import MatchNotification from "./MatchNotification";

interface MatchStackProps {
  profiles?: Array<{
    id: string;
    name: string;
    age: number;
    imageUrl: string;
    skillLevel: string;
    preferredTerrain: string;
    homeResort: string;
    bio: string;
  }>;
  onMatch?: (profileId: string) => void;
  onSwipeLeft?: (profileId: string) => void;
  onSwipeRight?: (profileId: string) => void;
  onEmptyStack?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const MatchStack = ({
  profiles = [
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
  ],
  onMatch = () => {},
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
  onEmptyStack = () => {},
}: MatchStackProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<any>(null);
  const [localProfiles, setLocalProfiles] = useState([...profiles]);

  // Animation values for the action buttons
  const likeScale = useSharedValue(1);
  const nopeScale = useSharedValue(1);

  useEffect(() => {
    if (localProfiles.length === 0) {
      onEmptyStack();
    }
  }, [localProfiles, onEmptyStack]);

  const handleSwipeLeft = (profileId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSwipeLeft(profileId);
    shiftProfiles();
  };

  const handleSwipeRight = (profileId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSwipeRight(profileId);

    // Simulate a match with 30% probability
    const isMatch = Math.random() < 0.3;
    if (isMatch) {
      const matchedUser = localProfiles[currentIndex];
      setMatchedProfile({
        name: matchedUser.name,
        age: matchedUser.age,
        image: matchedUser.imageUrl,
        skillLevel: matchedUser.skillLevel,
        resort: matchedUser.homeResort,
      });
      onMatch(profileId);
      setTimeout(() => {
        setShowMatch(true);
      }, 500);
    } else {
      shiftProfiles();
    }
  };

  const shiftProfiles = () => {
    setLocalProfiles((prev) => {
      const newProfiles = [...prev];
      newProfiles.shift();
      return newProfiles;
    });
  };

  const handleLikePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    likeScale.value = withSpring(0.8, {}, () => {
      likeScale.value = withSpring(1);
    });
    if (localProfiles.length > 0) {
      handleSwipeRight(localProfiles[0].id);
    }
  };

  const handleNopePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    nopeScale.value = withSpring(0.8, {}, () => {
      nopeScale.value = withSpring(1);
    });
    if (localProfiles.length > 0) {
      handleSwipeLeft(localProfiles[0].id);
    }
  };

  const likeButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: likeScale.value }],
    };
  });

  const nopeButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: nopeScale.value }],
    };
  });

  const closeMatch = () => {
    setShowMatch(false);
    shiftProfiles();
  };

  const handleMessage = () => {
    setShowMatch(false);
    shiftProfiles();
    // Navigation to messages would happen here in a real app
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-1 items-center justify-center">
        {localProfiles.length > 0 ? (
          <>
            {/* Render the top 3 cards for stack effect */}
            {localProfiles.slice(0, 3).map((profile, index) => (
              <View
                key={profile.id}
                className="absolute"
                style={{
                  zIndex: localProfiles.length - index,
                  opacity: index === 0 ? 1 : index === 1 ? 0.8 : 0.6,
                  transform: [
                    { scale: index === 0 ? 1 : index === 1 ? 0.95 : 0.9 },
                  ],
                  top: index * 10,
                }}
              >
                <ProfileCard
                  id={profile.id}
                  name={profile.name}
                  age={profile.age}
                  imageUrl={profile.imageUrl}
                  skillLevel={profile.skillLevel}
                  preferredTerrain={profile.preferredTerrain}
                  homeResort={profile.homeResort}
                  bio={profile.bio}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                />
              </View>
            ))}
          </>
        ) : (
          <View className="items-center justify-center p-8">
            <Text className="text-xl text-gray-500 text-center">
              No more profiles to show.
            </Text>
            <Text className="text-gray-400 text-center mt-2">
              Check back later for new ski buddies!
            </Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      {localProfiles.length > 0 && (
        <View className="flex-row justify-center items-center pb-6 pt-2">
          <Animated.View style={nopeButtonStyle}>
            <TouchableOpacity
              onPress={handleNopePress}
              className="w-16 h-16 bg-white rounded-full shadow-md items-center justify-center mr-8 border border-red-400"
            >
              <X size={32} color="#F87171" />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={likeButtonStyle}>
            <TouchableOpacity
              onPress={handleLikePress}
              className="w-16 h-16 bg-white rounded-full shadow-md items-center justify-center ml-8 border border-green-400"
            >
              <Heart size={32} color="#4ADE80" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}

      {/* Match Notification */}
      {showMatch && (
        <MatchNotification
          isVisible={showMatch}
          matchedUser={matchedProfile}
          onClose={closeMatch}
          onMessage={handleMessage}
        />
      )}
    </View>
  );
};

export default MatchStack;
