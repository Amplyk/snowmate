import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MessageSquare, User, Snowflake } from "lucide-react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  title?: string;
  showMessagesIcon?: boolean;
  showProfileIcon?: boolean;
  onMessagesPress?: () => void;
  onProfilePress?: () => void;
}

const Header = ({
  title = "Ski Buddy",
  showMessagesIcon = true,
  showProfileIcon = true,
  onMessagesPress,
  onProfilePress,
}: HeaderProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleMessagesPress = () => {
    if (onMessagesPress) {
      onMessagesPress();
    } else {
      // Default navigation to messages screen
      router.push("/messages");
    }
  };

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      // Default navigation to profile screen
      router.push("/profile");
    }
  };

  return (
    <BlurView
      intensity={80}
      tint="light"
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Snowflake size={24} color="#3b82f6" />
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.iconsContainer}>
          {showMessagesIcon && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleMessagesPress}
              accessibilityLabel="Messages"
            >
              <MessageSquare size={24} color="#3b82f6" />
            </TouchableOpacity>
          )}

          {showProfileIcon && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleProfilePress}
              accessibilityLabel="Profile"
            >
              <User size={24} color="#3b82f6" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#0f172a",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
});

export default Header;
