import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Vibration } from 'react-native';
import { theme } from '../theme/theme';
import { GradientButton } from '../components/GradientButton';
import { CountdownTimer } from '../components/CountdownTimer';
import { MapPin, Navigation, Package, IndianRupee } from 'lucide-react-native';

interface IncomingJobProps { visible: boolean; job: any; onAccept: () => void; onDecline: () => void; }

export const IncomingJobModal: React.FC<IncomingJobProps> = ({ visible, job, onAccept, onDecline }) => {
  useEffect(() => {
    visible ? Vibration.vibrate([0, 500, 200, 500], true) : Vibration.cancel();
    return () => Vibration.cancel();
  }, [visible]);

  if (!job) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.headerTitle}>New Booking Request</Text>
          <View style={styles.timerContainer}><CountdownTimer duration={30} onComplete={onDecline} size={80} strokeWidth={6} /></View>
          <View style={styles.routeContainer}>
            <View style={styles.routeItem}><MapPin size={20} color={theme.colors.brand.primary} /><View style={styles.routeText}><Text style={styles.routeLabel}>PICKUP</Text><Text style={styles.addressText} numberOfLines={2}>{job.pickupAddress}</Text></View></View>
            <View style={styles.routeLine} />
            <View style={styles.routeItem}><Navigation size={20} color={theme.colors.brand.secondary} /><View style={styles.routeText}><Text style={styles.routeLabel}>DROP</Text><Text style={styles.addressText} numberOfLines={2}>{job.dropAddress}</Text></View></View>
          </View>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}><Package size={20} color={theme.colors.text.muted} /><Text style={styles.detailText}>{job.loadType}</Text></View>
            <View style={styles.detailItem}><IndianRupee size={20} color={theme.colors.brand.success} /><Text style={styles.fareText}>₹{job.fareEstimate}</Text></View>
          </View>
          <View style={styles.actions}>
            <GradientButton title="Decline" variant="secondary" onPress={onDecline} style={styles.btn} />
            <GradientButton title="Accept" onPress={onAccept} style={styles.btn} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(13, 15, 26, 0.85)', justifyContent: 'flex-end' },
  card: { backgroundColor: theme.colors.background.card, borderTopLeftRadius: theme.radius.xxl, borderTopRightRadius: theme.radius.xxl, padding: theme.spacing.xl, paddingBottom: 40, borderTopWidth: 1, borderTopColor: theme.colors.border.subtle },
  headerTitle: { fontFamily: theme.typography.display.fontFamily, fontSize: 24, fontWeight: 'bold', color: theme.colors.text.primary, textAlign: 'center' },
  timerContainer: { alignItems: 'center', marginVertical: 24 },
  routeContainer: { backgroundColor: theme.colors.background.primary, borderRadius: theme.radius.lg, padding: theme.spacing.lg, borderWidth: 1, borderColor: theme.colors.border.subtle, marginBottom: 20 },
  routeItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  routeLine: { width: 2, height: 24, backgroundColor: theme.colors.border.subtle, marginLeft: 9, marginVertical: 4 },
  routeText: { flex: 1 },
  routeLabel: { fontFamily: theme.typography.bodySemibold.fontFamily, fontSize: 11, color: theme.colors.text.muted },
  addressText: { fontFamily: theme.typography.bodyMedium.fontFamily, fontSize: 14, color: theme.colors.text.primary, marginTop: 2 },
  detailsGrid: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  detailItem: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: theme.colors.background.tertiary, padding: 16, borderRadius: theme.radius.lg, borderWidth: 1, borderColor: theme.colors.border.subtle },
  detailText: { fontFamily: theme.typography.bodySemibold.fontFamily, fontSize: 14, color: theme.colors.text.secondary },
  fareText: { fontFamily: theme.typography.mono.fontFamily, fontSize: 22, fontWeight: 'bold', color: theme.colors.brand.secondary },
  actions: { flexDirection: 'row', gap: 16 },
  btn: { flex: 1 },
});
