import React, {memo, useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetTextInput,
  useBottomSheet,
} from '@gorhom/bottom-sheet';
import {RectButton} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {toRad} from 'react-native-redash';

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

interface CustomFooterProps extends BottomSheetFooterProps {}

const CustomFooterComponent = ({animatedFooterPosition}: CustomFooterProps) => {

  const {bottom: bottomSafeArea} = useSafeAreaInsets();
  const {expand, close, animatedIndex} = useBottomSheet();
  const [value, setValue] = useState();
 const handleInputChange = useCallback(({nativeEvent: {text}}) => {
    setValue(text);
  }, []);
  return (
    <BottomSheetFooter
      // bottomInset={bottomSafeArea}
      animatedFooterPosition={animatedFooterPosition}>
      {/* <AnimatedRectButton style={containerStyle} onPress={handleArrowPress}>
        <Animated.Text style={arrowStyle}>⌃</Animated.Text>
      </AnimatedRectButton> */}
      <View
        style={{
          ...styles.container2,
          paddingBottom:
            bottomSafeArea,
        }}>
        <BottomSheetTextInput
          style={styles.input}
          value={value}
          // onFocus={()=>{bottomSheetModalRef}}
          // textContentType="location"
          // placeholderTextColor={colors.secondaryText}
          placeholder="Search for a place or address"
          onChange={handleInputChange}
        />
      </View>
    </BottomSheetFooter>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 12,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8.0,

    elevation: 8,
  },
  container2: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  arrow: {
    fontSize: 20,
    height: 20,
    textAlignVertical: 'center',
    fontWeight: '900',
    color: 'gray',
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: '#EBEBEB',
  },
});

export const CustomFooter = memo(CustomFooterComponent);
