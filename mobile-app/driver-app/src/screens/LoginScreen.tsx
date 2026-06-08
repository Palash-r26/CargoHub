import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import { theme } from '../theme/theme';
import { GradientButton } from '../components/GradientButton';
import { OTPInput } from '../components/OTPInput';
import { sendOTP, verifyOTP } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import { Truck } from 'lucide-react-native';

export const LoginScreen = () => {
  const { updateProfile, login } = useAuth();
  const [phone, setPhone] = useState('9999999999');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<any>(null);

  const handleSendOtp = async () => {
    if (phone.length !== 10) { Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number.'); return; }
    setLoading(true);
    try {
      const result = await sendOTP(`+91${phone}`);
      setConfirmation(result);
      setStep('OTP');
    } catch (error) { Alert.alert('Error', 'Failed to send OTP. Try again.'); console.error(error); } finally { setLoading(false); }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    setLoading(true);
    try {
      const result = await verifyOTP(confirmation, otp);
      if (result.token) {
        await login(result.token, { id: result.uid, firebaseUid: result.uid, name: '', phone: `+91${phone}`, role: 'DRIVER', accountType: 'STANDARD', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      }
    } catch (error) { Alert.alert('Error', 'Invalid OTP. Please try again.'); console.error(error); } finally { setLoading(false); }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <View style={styles.logoContainer}><Truck size={40} color="white" /></View>
        <Text style={styles.title}>CargoHub</Text>
        <Text style={styles.subtitle}>Driver Partner App</Text>
      </View>
      <View style={styles.formContainer}>
        {step === 'PHONE' ? (
          <>
            <Text style={styles.label}>Enter your mobile number</Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}><Text style={styles.countryCodeText}>+91</Text></View>
              <TextInput style={styles.phoneInput} value={phone} onChangeText={setPhone} keyboardType="phone-pad" maxLength={10} placeholder="00000 00000" placeholderTextColor={theme.colors.text.muted} />
            </View>
            <GradientButton title="Send OTP" onPress={handleSendOtp} loading={loading} disabled={phone.length !== 10} style={styles.button} />
          </>
        ) : (
          <>
            <Text style={styles.label}>Enter OTP sent to +91 {phone}</Text>
            <View style={styles.otpContainer}><OTPInput length={6} value={otp} onChangeText={setOtp} /></View>
            <GradientButton title="Verify & Login" onPress={handleVerifyOtp} loading={loading} disabled={otp.length !== 6} style={styles.button} />
            <GradientButton title="Change Number" variant="secondary" onPress={() => setStep('PHONE')} style={styles.button} disabled={loading} />
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.primary },
  header: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoContainer: { width: 80, height: 80, borderRadius: theme.radius.xl, backgroundColor: theme.colors.brand.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 20, ...theme.shadows.glow },
  title: { fontFamily: theme.typography.display.fontFamily, fontSize: 32, color: theme.colors.text.primary },
  subtitle: { fontFamily: theme.typography.bodyMedium.fontFamily, fontSize: 16, color: theme.colors.text.muted, marginTop: 4 },
  formContainer: { padding: theme.spacing.xl, paddingBottom: 40, backgroundColor: theme.colors.background.card, borderTopLeftRadius: theme.radius.xxl, borderTopRightRadius: theme.radius.xxl, ...theme.shadows.card },
  label: { fontFamily: theme.typography.bodyMedium.fontFamily, fontSize: 14, color: theme.colors.text.secondary, marginBottom: 12 },
  phoneInputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: theme.colors.border.subtle, borderRadius: theme.radius.md, backgroundColor: theme.colors.background.primary, overflow: 'hidden', marginBottom: 24 },
  countryCode: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: theme.colors.background.secondary, borderRightWidth: 1, borderRightColor: theme.colors.border.subtle },
  countryCodeText: { fontFamily: theme.typography.bodySemibold.fontFamily, fontSize: 16, color: theme.colors.text.primary },
  phoneInput: { flex: 1, paddingHorizontal: 16, paddingVertical: 16, fontFamily: theme.typography.mono.fontFamily, fontSize: 18, color: theme.colors.text.primary },
  otpContainer: { marginBottom: 24 },
  button: { marginBottom: 12 },
});
