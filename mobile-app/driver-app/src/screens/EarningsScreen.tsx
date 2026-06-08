import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { theme } from '../theme/theme';
import { Header } from '../components/Header';
import { EarningsCard } from '../components/EarningsCard';
import { useDriver } from '../context/DriverContext';

const screenWidth = Dimensions.get('window').width;

const mockChartData = [
  { day: 'Mon', earnings: 450 }, { day: 'Tue', earnings: 1200 }, { day: 'Wed', earnings: 850 },
  { day: 'Thu', earnings: 2100 }, { day: 'Fri', earnings: 1650 }, { day: 'Sat', earnings: 2800 },
  { day: 'Sun', earnings: 3200 },
];

export const EarningsScreen = () => {
  const { driver } = useDriver();
  const earnings = driver?.earnings || { today: 0, thisWeek: 0, thisMonth: 0, tripCount: 0 };
  const maxEarnings = Math.max(...mockChartData.map(d => d.earnings), 1);

  return (
    <View style={styles.container}>
      <Header title="Earnings" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.summaryGrid}>
          <EarningsCard label="Today" amount={earnings.today} style={styles.cardHalf} />
          <EarningsCard label="Trips" amount={earnings.tripCount} style={styles.cardHalf} />
          <EarningsCard label="This Week" amount={earnings.thisWeek} isTotal style={styles.cardFull} />
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Weekly Activity</Text>
          <View style={styles.chartRow}>
            {mockChartData.map((item, i) => {
              const heightPercent = (item.earnings / maxEarnings) * 100;
              return (
                <View key={i} style={styles.chartCol}>
                  <Text style={styles.barValue}>₹{item.earnings >= 1000 ? `${(item.earnings / 1000).toFixed(1)}k` : item.earnings}</Text>
                  <View style={styles.barContainer}>
                    <View style={[styles.barFill, { height: `${heightPercent}%` }]} />
                  </View>
                  <Text style={styles.barLabel}>{item.day}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <Text style={styles.sectionTitle}>Recent Trips</Text>
        {[1, 2, 3].map((_, i) => (
          <View key={i} style={styles.tripRow}>
            <View><Text style={styles.tripDate}>Today, {10 + i}:30 AM</Text><Text style={styles.tripRoute}>Koramangala → Indiranagar</Text></View>
            <Text style={styles.tripFare}>+₹450</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.primary },
  scrollContent: { padding: theme.spacing.lg },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md, marginBottom: theme.spacing.xl },
  cardHalf: { width: (screenWidth - 32 - 16) / 2 },
  cardFull: { width: '100%' },
  chartContainer: { backgroundColor: theme.colors.background.card, borderRadius: theme.radius.xl, padding: theme.spacing.md, borderWidth: 1, borderColor: theme.colors.border.card, marginBottom: theme.spacing.xl },
  sectionTitle: { fontFamily: theme.typography.display.fontFamily, fontSize: 18, color: theme.colors.text.primary, marginBottom: 16 },
  chartRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 160, paddingHorizontal: 4, paddingBottom: 8 },
  chartCol: { alignItems: 'center', flex: 1 },
  barContainer: { width: 14, height: 100, backgroundColor: theme.colors.background.secondary, borderRadius: 6, overflow: 'hidden', justifyContent: 'flex-end', marginVertical: 8 },
  barFill: { width: '100%', backgroundColor: theme.colors.brand.primaryLight, borderRadius: 6 },
  barLabel: { fontFamily: theme.typography.bodySemibold.fontFamily, fontSize: 11, color: theme.colors.text.secondary },
  barValue: { fontFamily: theme.typography.mono.fontFamily, fontSize: 10, color: theme.colors.text.muted },
  tripRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border.subtle },
  tripDate: { fontFamily: theme.typography.body.fontFamily, fontSize: 12, color: theme.colors.text.muted },
  tripRoute: { fontFamily: theme.typography.bodySemibold.fontFamily, fontSize: 14, color: theme.colors.text.primary, marginTop: 4 },
  tripFare: { fontFamily: theme.typography.mono.fontFamily, fontSize: 16, fontWeight: 'bold', color: theme.colors.brand.success },
});
