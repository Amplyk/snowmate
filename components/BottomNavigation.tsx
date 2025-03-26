import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Home, Users, MessageSquare, User } from "lucide-react-native";

interface BottomNavigationProps {
  activeTab?: string;
}

const BottomNavigation = ({ activeTab = "home" }: BottomNavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const currentTab =
    activeTab || pathname === "/" ? "home" : pathname.replace("/", "");

  const tabs = [
    {
      key: "home",
      label: "Home",
      icon: Home,
      onPress: () => router.push("/"),
    },
    {
      key: "match",
      label: "Match",
      icon: Users,
      onPress: () => router.push("/match"),
    },
    {
      key: "messages",
      label: "Messages",
      icon: MessageSquare,
      onPress: () => router.push("/messages"),
    },
    {
      key: "profile",
      label: "Profile",
      icon: User,
      onPress: () => router.push("/profile"),
    },
  ];

  return (
    <View className="flex-row items-center justify-around bg-white border-t border-gray-200 h-16 px-2 pb-2 pt-1 shadow-sm">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.key;
        const IconComponent = tab.icon;

        return (
          <TouchableOpacity
            key={tab.key}
            className={`flex-1 items-center justify-center py-1 ${isActive ? "bg-blue-50 rounded-lg" : ""}`}
            onPress={tab.onPress}
            accessibilityLabel={tab.label}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <IconComponent
              size={24}
              color={isActive ? "#3b82f6" : "#64748b"}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <Text
              className={`text-xs mt-1 ${isActive ? "text-blue-500 font-medium" : "text-gray-500"}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;
