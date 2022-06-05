import React, {  useState, useRef } from "react";
import FontawesomeIcon from "react-native-vector-icons/FontAwesome";
import { Animated, View } from "react-native";

const AnimatedIcon = Animated.createAnimatedComponent(FontawesomeIcon);

export const Like = ({ item, style }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const reverseOpacity = useRef(new Animated.Value(0)).current;
  const [liked, setLiked] = useState(false);

  const like = (value) => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(value ? opacity : reverseOpacity, {
          toValue: 0,
          duration: 90,
          useNativeDriver: true,
        }),
        Animated.timing(value ? reverseOpacity : opacity, {
          toValue: 1,
          duration: 90,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
    setLiked(value);
  };

  return (
    <View>
      <AnimatedIcon
        name={"heart"}
        size={20}
        style={{
          ...style,
          position: "absolute",
          opacity: reverseOpacity,
          transform: [{ scale }],
        }}
        color="#FF1F1F"
        onPress={() => like(!liked)}
      />
      <AnimatedIcon
        name={"heart-o"}
        size={20}
        style={{
          ...style,
          opacity: opacity,
          transform: [{ scale }],
        }}
        color="white"
        onPress={() => like(!liked)}
      />
    </View>
  );
};