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
import {POST} from '../data/POST';

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

const CustomFooterComponent = ({animatedFooterPosition}) => {
  // console.log('comments:',POST[0].comments)
  const {bottom: bottomSafeArea} = useSafeAreaInsets();
  const {expand, close, animatedIndex} = useBottomSheet();
  const [key, setKey] = React.useState(0);
  const reload = React.useCallback(() => setKey(prevKey => prevKey + 1), []);
  const [value, setValue] = useState();

  const handleInputChange = useCallback(
    ({nativeEvent: {text}}) => {
      setValue(text);
      console.log('value : ', value);
    },
    [value],
  );
  const onSubmitEditing = useCallback(
    ({nativeEvent: {text}}) => {
      if (text) POST[0].comments.push({user: 'kimym56', comment: value});
      this.textInput.clear();
    },
    [value],
  );
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
          paddingBottom: bottomSafeArea,
        }}>
        <BottomSheetTextInput
          ref={ref => (this.textInput = ref)}
          style={styles.input}
          value={value}
          // onFocus={()=>{bottomSheetModalRef}}
          // textContentType="location"
          // placeholderTextColor={colors.secondaryText}
          placeholder="Enter your question"
          onChange={handleInputChange}
          onSubmitEditing={onSubmitEditing}
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
