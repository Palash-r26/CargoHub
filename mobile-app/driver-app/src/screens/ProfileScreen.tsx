import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../theme/theme';
import { Header } from '../components/Header';
import { StatusBadge } from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { useDriver } from '../context/DriverContext';
import { LogOut, ChevronRight, FileText, Bell, Shield, Settings } from 'lucide-react-native';

export const ProfileScreen = () => {
  const { logout } = useAuth();
  const { driver } = useDriver();

  const menuItems = [
    { icon: <FileText size={20} color={theme.colors.text.secondary} />, title: 'KYC Documents' },
    { icon: <Shield size={20} color={theme.colors.text.secondary} />, title: 'Insurance & Safety' },
    { icon: <Bell size={20} color={theme.colors.text.secondary} />, title: 'Notifications' },
    { icon: <Settings size={20} color={theme.colors.text.secondary} />, title: 'App Settings' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{driver?.name?.[0] || 'D'}</Text></View>
          <View style={styles.info}>
            <Text style={styles.name}>{driver?.name || 'Driver Name'}</Text>
            <Text style={styles.phone}>{driver?.phone || '+91 00000 00000'}</Text>
            <View style={styles.tags}>
              <StatusBadge status={driver?.kycStatus === 'VERIFIED' ? 'verified' : 'pending'} label={driver?.kycStatus || 'PENDING KYC'} />
              <View style={styles.ratingBadge}><Text style={styles.ratingText}>★ {driver?.rating || '4.8'}</Text></View>
            </View>
          </View>
        </View>
        <View style={styles.vehicleCard}>
          <Text style={styles.sectionTitle}>Vehicle Details</Text>
          <View style={styles.vehicleInfo}>
            <View><Text style={styles.label}>Type</Text><Text style={styles.value}>{driver?.vehicleType?.replace('_', ' ') || 'TATA ACE'}</Text></View>
            <View><Text style={styles.label}>Number</Text><Text style={styles.value}>{driver?.vehicleNumber || 'MH 12 AB 1234'}</Text></View>
          </View>
        </View>
        <View style={styles.menuList}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuLeft}>{item.icon}<Text style={styles.menuTitle}>{item.title}</Text></View>
              <ChevronRight size={20} color={theme.colors.text.muted} />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <LogOut size={20} color={theme.colors.brand.danger} /><Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.primary },
  scrollContent: { padding: theme.spacing.lg },
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.background.card, padding: theme.spacing.lg, borderRadius: theme.radius.xl, borderWidth: 1, borderColor: theme.colors.border.card, marginBottom: theme.spacing.xl, ...theme.shadows.card },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: theme.colors.brand.primary, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  avatarText: { fontFamily: theme.typography.display.fontFamily, fontSize: 32, color: 'white' },
  info: { flex: 1 },
  name: { fontFamily: theme.typography.display.fontFamily, fontSize: 20, color: theme.colors.text.primary },
  phone: { fontFamily: theme.typography.body.fontFamily, fontSize: 14, color: theme.colors.text.muted, marginBottom: 8 },
  tags: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ratingBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: theme.radius.full },
  ratingText: { fontFamily: theme.typography.bodySemibold.fontFamily, fontSize: 12, color: '#D97706' },
  vehicleCard: { backgroundColor: theme.colors.background.secondary, padding: theme.spacing.lg, borderRadius: theme.radius.lg, marginBottom: theme.spacing.xl },
  sectionTitle: { fontFamily: theme.typography.bodySemibold.fontFamily, fontSize: 14, color: theme.colors.text.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 },
  vehicleInfo: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontFamily: theme.typography.body.fontFamily, fontSize: 12, color: theme.colors.text.muted },
  value: { fontFamily: theme.typography.mono.fontFamily, fontSize: 16, fontWeight: 'bold', color: theme.colors.text.primary, marginTop: 4 },
  menuList: { backgroundColor: theme.colors.background.card, borderRadius: theme.radius.xl, borderWidth: 1, borderColor: theme.colors.border.card, overflow: 'hidden', marginBottom: theme.spacing.xl },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: theme.spacing.md, borderBottomWidth: 1, borderBottomColor: theme.colors.border.subtle },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuTitle: { fontFamily: theme.typography.bodyMedium.fontFamily, fontSize: 15, color: theme.colors.text.primary },
  logoutBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, padding: theme.spacing.md, backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: theme.radius.full },
  logoutText: { fontFamily: theme.typography.bodySemibold.fontFamily, fontSize: 16, color: theme.colors.brand.danger },
});
