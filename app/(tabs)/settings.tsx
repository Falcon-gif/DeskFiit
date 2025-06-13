import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { Bell, Clock, Volume2, Smartphone, Info, CircleHelp as HelpCircle, Star, LogOut } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import AuthScreen from '@/components/AuthScreen';

export default function SettingsScreen() {
  const { user, profile, updateProfile, signOut } = useAuth();
  const [soundEnabled, setSoundEnabled] = useState(profile?.sound_enabled ?? true);
  const [vibrationEnabled, setVibrationEnabled] = useState(profile?.vibration_enabled ?? true);

  if (!user) {
    return <AuthScreen />;
  }

  const handleNotificationToggle = async (enabled: boolean) => {
    await updateProfile({ notification_enabled: enabled });
  };

  const handleWorkHoursToggle = async (enabled: boolean) => {
    await updateProfile({ work_hours_only: enabled });
  };

  const handleSoundToggle = async (enabled: boolean) => {
    setSoundEnabled(enabled);
    await updateProfile({ sound_enabled: enabled });
  };

  const handleVibrationToggle = async (enabled: boolean) => {
    setVibrationEnabled(enabled);
    await updateProfile({ vibration_enabled: enabled });
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    rightElement, 
    onPress 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    rightElement?: React.ReactNode;
    onPress?: () => void;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={!onPress}>
      <View style={styles.settingIcon}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement && (
        <View style={styles.settingRight}>
          {rightElement}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your experience</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <View style={styles.settingsGroup}>
            <View style={styles.userInfo}>
              <View style={styles.userAvatar}>
                <Text style={styles.userInitial}>
                  {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{profile?.full_name || 'User'}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={<Bell size={20} color="#3B82F6" />}
              title="Exercise Reminders"
              subtitle="Get notified for exercise breaks"
              rightElement={
                <Switch
                  value={profile?.notification_enabled ?? true}
                  onValueChange={handleNotificationToggle}
                  trackColor={{ false: '#E5E7EB', true: '#DBEAFE' }}
                  thumbColor={profile?.notification_enabled ? '#3B82F6' : '#9CA3AF'}
                />
              }
            />

            <SettingItem
              icon={<Clock size={20} color="#10B981" />}
              title="Work Hours Only"
              subtitle="9 AM - 6 PM, Monday to Friday"
              rightElement={
                <Switch
                  value={profile?.work_hours_only ?? true}
                  onValueChange={handleWorkHoursToggle}
                  trackColor={{ false: '#E5E7EB', true: '#ECFDF5' }}
                  thumbColor={profile?.work_hours_only ? '#10B981' : '#9CA3AF'}
                />
              }
            />

            <SettingItem
              icon={<Volume2 size={20} color="#F97316" />}
              title="Sound"
              subtitle="Play notification sounds"
              rightElement={
                <Switch
                  value={soundEnabled}
                  onValueChange={handleSoundToggle}
                  trackColor={{ false: '#E5E7EB', true: '#FFF7ED' }}
                  thumbColor={soundEnabled ? '#F97316' : '#9CA3AF'}
                />
              }
            />

            <SettingItem
              icon={<Smartphone size={20} color="#8B5CF6" />}
              title="Vibration"
              subtitle="Vibrate on notifications"
              rightElement={
                <Switch
                  value={vibrationEnabled}
                  onValueChange={handleVibrationToggle}
                  trackColor={{ false: '#E5E7EB', true: '#F3E8FF' }}
                  thumbColor={vibrationEnabled ? '#8B5CF6' : '#9CA3AF'}
                />
              }
            />
          </View>
        </View>

        {/* Exercise Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercise Preferences</Text>
          
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={<Text style={styles.emojiIcon}>🧘</Text>}
              title="Focus Area"
              subtitle={profile?.focus_area || 'All exercises'}
              rightElement={<Text style={styles.chevron}>›</Text>}
              onPress={() => {}}
            />

            <SettingItem
              icon={<Text style={styles.emojiIcon}>💪</Text>}
              title="Exercise Difficulty"
              subtitle={profile?.exercise_difficulty || 'Beginner'}
              rightElement={<Text style={styles.chevron}>›</Text>}
              onPress={() => {}}
            />

            <SettingItem
              icon={<Text style={styles.emojiIcon}>⏱️</Text>}
              title="Session Duration"
              subtitle="2-3 minutes per exercise"
              rightElement={<Text style={styles.chevron}>›</Text>}
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Support & Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Information</Text>
          
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={<HelpCircle size={20} color="#6B7280" />}
              title="Help & FAQ"
              subtitle="Get answers to common questions"
              rightElement={<Text style={styles.chevron}>›</Text>}
              onPress={() => {}}
            />

            <SettingItem
              icon={<Star size={20} color="#EAB308" />}
              title="Rate DeskFiit"
              subtitle="Share your feedback"
              rightElement={<Text style={styles.chevron}>›</Text>}
              onPress={() => {}}
            />

            <SettingItem
              icon={<Info size={20} color="#3B82F6" />}
              title="About"
              subtitle="Version 1.0.0"
              rightElement={<Text style={styles.chevron}>›</Text>}
              onPress={() => {}}
            />

            <SettingItem
              icon={<LogOut size={20} color="#EF4444" />}
              title="Sign Out"
              subtitle="Sign out of your account"
              onPress={handleSignOut}
            />
          </View>
        </View>

        {/* Health Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerTitle}>Health & Safety</Text>
          <Text style={styles.disclaimerText}>
            Always consult with a healthcare professional before starting any exercise program. 
            Stop immediately if you experience pain or discomfort during any exercise.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  settingsGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInitial: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  emojiIcon: {
    fontSize: 18,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  settingRight: {
    marginLeft: 12,
  },
  chevron: {
    fontSize: 18,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  disclaimer: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  disclaimerTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#92400E',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#92400E',
    lineHeight: 16,
  },
});