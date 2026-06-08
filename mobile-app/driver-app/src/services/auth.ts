import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

let auth: any = null;
try {
  auth = require('@react-native-firebase/auth').default;
} catch (error) {
  console.log('Firebase Auth is not available (running in mock mode or Expo Go)');
}

export const sendOTP = async (phoneNumber: string) => {
  if (__DEV__ && phoneNumber === '+919999999999') {
    return { verificationId: 'mock_verification_id' };
  }

  if (!auth) {
    throw new Error('Firebase Auth not available. Use mock number +919999999999 for development.');
  }

  const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  return confirmation;
};

export const verifyOTP = async (confirmation: any, code: string) => {
  if (__DEV__ && confirmation?.verificationId === 'mock_verification_id' && code === '123456') {
    // Map directly to pre-seeded driver Suresh Kumar for development
    const mockUid = 'driver-uid-001';
    await AsyncStorage.setItem('@cargohub_mock_uid', mockUid);
    await AsyncStorage.setItem('@cargohub_driver_token', mockUid);
    
    return {
      uid: mockUid,
      isNewUser: false,
      token: mockUid
    };
  }

  if (!auth) {
    throw new Error('Firebase Auth not available. Use verification code 123456 with mock number.');
  }

  // Real Firebase verification
  const credential = auth.PhoneAuthProvider.credential(confirmation.verificationId, code);
  const userCredential = await auth().signInWithCredential(credential);
  const idToken = await userCredential.user.getIdToken();
  
  const response = await api.post('/auth/verify', {
    token: idToken,
    phone: userCredential.user.phoneNumber,
    uid: userCredential.user.uid
  });

  if (response.data?.data?.token) {
    await AsyncStorage.setItem('@cargohub_driver_token', response.data.data.token);
  }

  return {
    uid: userCredential.user.uid,
    isNewUser: response.data?.data?.isNewUser || false,
    token: response.data?.data?.token
  };
};

export const logout = async () => {
  if (auth) {
    try {
      await auth().signOut();
    } catch (e) {
      console.log('Error signing out from Firebase:', e);
    }
  }
  await AsyncStorage.removeItem('@cargohub_driver_token');
  await AsyncStorage.removeItem('@cargohub_mock_uid');
};

