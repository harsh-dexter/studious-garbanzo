import { View, Text, Button, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PrivacyBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    checkPrivacyAcceptance();
  }, []);

  const checkPrivacyAcceptance = async () => {
    const accepted = await AsyncStorage.getItem('privacyAccepted');
    setVisible(accepted !== 'true');
  };

  const handleAccept = async () => {
    await AsyncStorage.setItem('privacyAccepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        We value your privacy: All messages are encrypted and automatically deleted after 24 hours.
        No personal information is stored.
      </Text>
      <Button title="Accept & Continue" onPress={handleAccept} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#e3f2fd',
    borderBottomWidth: 1,
    borderColor: '#90caf9'
  },
  text: {
    fontSize: 14,
    color: '#0d47a1',
    marginBottom: 12
  }
});
