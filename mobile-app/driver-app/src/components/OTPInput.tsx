import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import { theme } from '../theme/theme';

interface OTPInputProps { length: number; value: string; onChangeText: (value: string) => void; }

export const OTPInput: React.FC<OTPInputProps> = ({ length, value, onChangeText }) => {
  const [internalValues, setInternalValues] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    const newValues = value.split('').slice(0, length);
    setInternalValues([...newValues, ...Array(length - newValues.length).fill('')]);
  }, [value, length]);

  const handleChange = (text: string, index: number) => {
    const newText = text.replace(/[^0-9]/g, '');
    if (newText.length > 1) {
      const pasted = newText.split('').slice(0, length);
      onChangeText(pasted.join(''));
      pasted.length === length ? Keyboard.dismiss() : inputs.current[pasted.length]?.focus();
      return;
    }
    const newValues = [...internalValues];
    newValues[index] = newText;
    onChangeText(newValues.join(''));
    if (newText !== '' && index < length - 1) inputs.current[index + 1]?.focus();
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !internalValues[index] && index > 0) inputs.current[index - 1]?.focus();
  };

  return (
    <View style={styles.container}>
      {internalValues.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => { if (ref) inputs.current[index] = ref; }}
          style={[styles.input, digit ? styles.inputFilled : styles.inputEmpty]}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  input: { width: 48, height: 56, borderRadius: theme.radius.md, borderWidth: 1.5, textAlign: 'center', fontSize: 24, fontFamily: theme.typography.mono.fontFamily, color: theme.colors.text.primary, backgroundColor: theme.colors.background.card },
  inputEmpty: { borderColor: theme.colors.border.subtle },
  inputFilled: { borderColor: theme.colors.brand.primary },
});
