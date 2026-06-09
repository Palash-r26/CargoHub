import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { theme } from '../theme/theme';
import { GradientButton } from '../components/GradientButton';
import { OTPInput } from '../components/OTPInput';
import { sendOTP, verifyOTP } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import { Truck, ArrowLeft } from 'lucide-react-native';

export const LoginScreen = ({ route, navigation }: any) => {
  const selectedRole = route.params?.role || 'DRIVER';
  const { login } = useAuth();
  const [phone, setPhone] = useState('9999999999');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<any>(null);
  
  // Timer state for Resend OTP
  const [timer, setTimer] = useState(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (step === 'OTP') {
      setTimer(30);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step]);

  const handleSendOtp = async () => {
    if (phone.length !== 10) { 
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number.'); 
      return; 
    }
    setLoading(true);
    try {
      const result = await sendOTP(`+91${phone}`);
      setConfirmation(result);
      setStep('OTP');
    } catch (error) { 
      Alert.alert('Error', 'Failed to send OTP. Try again.'); 
      console.error(error); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    setLoading(true);
    try {
      const result = await sendOTP(`+91${phone}`);
      setConfirmation(result);
      setTimer(30);
      setOtp('');
      Alert.alert('OTP Sent', 'A new OTP has been sent to your mobile number.');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    setLoading(true);
    try {
      const result = await verifyOTP(confirmation, otp);
      if (result.token) {
        await login(result.token, { 
          id: result.uid, 
          firebaseUid: result.uid, 
          name: selectedRole === 'DRIVER' ? 'Suresh Kumar' : 'Rahul Sharma', 
          phone: `+91${phone}`, 
          role: selectedRole, 
          accountType: 'STANDARD', 
          isActive: true, 
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString() 
        });
      }
    } catch (error) { 
      Alert.alert('Error', 'Invalid OTP. Please try again.'); 
      console.error(error); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Back button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => step === 'OTP' ? setStep('PHONE') : navigation.goBack()}
      >
        <ArrowLeft size={24} color={theme.colors.text.primary} />
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Truck size={40} color="white" />
        </View>
        <Text style={styles.title}>CargoHub</Text>
        <Text style={styles.subtitle}>
          {selectedRole === 'DRIVER' ? 'Driver Partner App' : 'Customer Portal'}
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.welcomeTitle}>
          {selectedRole === 'DRIVER' ? 'Welcome, Driver 🚛' : 'Welcome, Customer 👋'}
        </Text>
        
        {step === 'PHONE' ? (
          <>
            <Text style={styles.label}>Enter your mobile number to sign in</Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+91</Text>
              </View>
              <TextInput 
                style={styles.phoneInput} 
                value={phone} 
                onChangeText={setPhone} 
                keyboardType="phone-pad" 
                maxLength={10} 
                placeholder="00000 00000" 
                placeholderTextColor={theme.colors.text.muted} 
              />
            </View>
            <GradientButton 
              title="Send OTP" 
              onPress={handleSendOtp} 
              loading={loading} 
              disabled={phone.length !== 10} 
              variant="coral"
              style={styles.button} 
            />
          </>
        ) : (
          <>
            <Text style={styles.label}>Enter OTP sent to +91 {phone}</Text>
            <View style={styles.otpContainer}>
              <OTPInput length={6} value={otp} onChangeText={setOtp} />
            </View>
            
            <GradientButton 
              title="Verify & Login" 
              onPress={handleVerifyOtp} 
              loading={loading} 
              disabled={otp.length !== 6} 
              variant="coral"
              style={styles.button} 
            />

            {/* Resend OTP button/link with countdown timer */}
            <View style={styles.resendContainer}>
              {timer > 0 ? (
                <Text style={styles.resendCountdown}>
                  Resend OTP in <Text style={styles.timerHighlight}>{timer}s</Text>
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResendOtp} disabled={loading}>
                  <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>

      {/* Coral spinner overlay during verification/loading */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.brand.primary} />
          <Text style={styles.loadingText}>Verifying...</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.primary },
  backButton: { position: 'absolute', top: 50, left: 20, zIndex: 10, padding: 8 },
  header: { flex: 1.2, justifyContent: 'center', alignItems: 'center', paddingTop: 40 },
  logoContainer: { width: 80, height: 80, borderRadius: theme.radius.xl, backgroundColor: theme.colors.brand.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 16, ...theme.shadows.glow },
  title: { fontFamily: theme.typography.display.fontFamily, fontSize: 32, color: theme.colors.text.primary, fontWeight: 'bold' },
  subtitle: { fontFamily: theme.typography.bodyMedium.fontFamily, fontSize: 16, color: theme.colors.text.muted, marginTop: 4 },
  formContainer: { padding: theme.spacing.xl, paddingBottom: 50, backgroundColor: theme.colors.background.card, borderTopLeftRadius: theme.radius.xxl, borderTopRightRadius: theme.radius.xxl, ...theme.shadows.card },
  welcomeTitle: { fontFamily: theme.typography.display.fontFamily, fontSize: 22, fontWeight: 'bold', color: theme.colors.text.primary, marginBottom: 8 },
  label: { fontFamily: theme.typography.bodyMedium.fontFamily, fontSize: 14, color: theme.colors.text.secondary, marginBottom: 20 },
  phoneInputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: theme.colors.border.subtle, borderRadius: theme.radius.md, backgroundColor: theme.colors.background.primary, overflow: 'hidden', marginBottom: 24 },
  countryCode: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: theme.colors.background.tertiary, borderRightWidth: 1, borderRightColor: theme.colors.border.subtle },
  countryCodeText: { fontFamily: theme.typography.bodySemibold.fontFamily, fontSize: 16, color: theme.colors.text.primary },
  phoneInput: { flex: 1, paddingHorizontal: 16, paddingVertical: 16, fontFamily: theme.typography.mono.fontFamily, fontSize: 18, color: theme.colors.text.primary },
  otpContainer: { marginBottom: 24 },
  button: { marginBottom: 12 },
  resendContainer: { alignItems: 'center', marginTop: 12 },
  resendCountdown: { fontFamily: theme.typography.bodyMedium.fontFamily, fontSize: 14, color: theme.colors.text.muted },
  timerHighlight: { color: theme.colors.brand.primary, fontWeight: 'bold' },
  resendText: { fontFamily: theme.typography.bodySemibold.fontFamily, fontSize: 14, color: theme.colors.brand.secondary, textDecorationLine: 'underline' },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(13, 15, 26, 0.85)', justifyContent: 'center', alignItems: 'center', zIndex: 100 },
  loadingText: { marginTop: 12, color: theme.colors.text.primary, fontSize: 16, fontWeight: '600' },
});
