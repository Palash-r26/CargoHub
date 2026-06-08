import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export type BadgeStatus = 'pending' | 'accepted' | 'arriving' | 'transit' | 'delivered' | 'cancelled' | 'verified' | 'rejected';

interface StatusBadgeProps {
  status: BadgeStatus;
  label?: string;
}

const getBadgeConfig = (status: BadgeStatus) => {
  switch (status) {
    case 'pending': return { bg: 'rgba(245, 158, 11, 0.15)', text: '#D97706', border: 'rgba(245,158,11,0.2)' };
    case 'accepted': return { bg: 'rgba(59, 130, 246, 0.15)', text: '#2563EB', border: 'rgba(59,130,246,0.2)' };
    case 'arriving': return { bg: 'rgba(139, 92, 246, 0.15)', text: '#7C3AED', border: 'rgba(139,92,246,0.2)' };
    case 'transit': return { bg: 'rgba(14, 165, 233, 0.15)', text: '#0284C7', border: 'rgba(14,165,233,0.2)' };
    case 'delivered': case 'verified': return { bg: 'rgba(16, 185, 129, 0.15)', text: '#059669', border: 'rgba(16,185,129,0.2)' };
    case 'cancelled': case 'rejected': return { bg: 'rgba(239, 68, 68, 0.15)', text: '#DC2626', border: 'rgba(239,68,68,0.2)' };
    default: return { bg: 'rgba(107, 114, 128, 0.15)', text: '#4B5563', border: 'rgba(107,114,128,0.2)' };
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const config = getBadgeConfig(status);
  return (
    <View style={[styles.badge, { backgroundColor: config.bg, borderColor: config.border }]}>
      <Text style={[styles.text, { color: config.text }]}>{label || status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: { paddingVertical: 4, paddingHorizontal: 12, borderRadius: theme.radius.full, borderWidth: 1, alignSelf: 'flex-start' },
  text: { fontFamily: theme.typography.bodySemibold.fontFamily, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 },
});
