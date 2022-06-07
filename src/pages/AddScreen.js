import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import QAScreen from './QAScreen';
export default function AddScreen() {
  // variables
  const snapPoints = ['10%','50%','100%'];

  // callbacks
  // const handlePresentModalPress = useCallback(() => {
  //   bottomSheetModalRef.present();
  // }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (

    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Button
          onPress={()=>{bottomSheetModalRef.present()}}
          title="Present Modal"
          color="black"
        />
        <BottomSheetModal
          ref={ref => (this.bottomSheetModalRef = ref)}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <QAScreen bottomSheetModalRef={this.bottomSheetModalRef}/>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    // backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
