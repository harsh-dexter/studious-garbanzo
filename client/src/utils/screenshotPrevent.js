import { useEffect } from 'react';
import { Platform, UIManager } from 'react-native';

export const useScreenshotPrevention = (enabled = true) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
      
      if (enabled) {
        UIManager.dispatchViewManagerCommand(
          UIManager.getViewManagerConfig('RCTView').Commands,
          UIManager.RCTView.Commands.setSecure,
          [true]
        );
      }
    }
  }, [enabled]);
};
