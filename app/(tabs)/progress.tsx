import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Calendar, Target, Award } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useExercise } from '@/context/ExerciseContext';
import AuthScreen from '@/components/AuthScreen';

export default function ProgressScreen() {
  const { user } = useAuth();
  const { stats, achievements } = useExercise();

  if (!user) {
    return <AuthScreen />;
  }

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const mockWeeklyData = [3, 5, 2, 7, 4, 1, stats.todayCompleted]; // Mock data for demonstration

  const achievementsList = [
    {
      id: 'first_steps',
      name: 'First Steps',
      description: 'Complete your first exercise',
      icon: Target,
      color: '#3B82F6',
      bgColor: '#EFF6FF',
      unlocked: achievements.some(a => a.achievement_type === 'first_steps'),
    },
    {
      id: 'week_warrior',
      name: 'Week Warrior',
      description: 'Exercise 5 days in a week',
      icon: Calendar,
      color: '#10B981',
      bgColor: '#ECFDF5',
      unlocked: achievements.some(a => a.achievement_type === 'week_warrior'),
    },
    {
      id: 'streak_master',
      name: 'Streak Master',
      description: 'Maintain a 7-day streak',
      icon: Award,
      color: '#F97316',
      bgColor: '#FFF7ED',
      unlocked: achievements.some(a => a.achievement_type === 'streak_master'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Progress</Text>
        <Text style={styles.headerSubtitle}>Track your fitness journey</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={['#3B82F6', '#1D4ED8']}
              style={styles.statGradient}>
              <Target size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>{stats.todayCompleted}</Text>
              <Text style={styles.statLabel}>Today</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.statGradient}>
              <Calendar size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>{stats.weeklyCompleted}</Text>
              <Text style={styles.statLabel}>This Week</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#F97316', '#EA580C']}
              style={styles.statGradient}>
              <Award size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>{stats.currentStreak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              style={styles.statGradient}>
              <TrendingUp size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>{stats.totalCompleted}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Weekly Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Weekly Activity</Text>
          <View style={styles.chart}>
            {weekDays.map((day, index) => (
              <View key={day} style={styles.chartBar}>
                <View style={styles.barContainer}>
                  <View 
                    style={[
                      styles.bar,
                      { 
                        height: Math.max(mockWeeklyData[index] * 8, 4),
                        backgroundColor: index === 6 ? '#3B82F6' : '#E5E7EB'
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.barLabel}>{day}</Text>
                <Text style={styles.barValue}>{mockWeeklyData[index]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsCard}>
          <Text style={styles.achievementsTitle}>Achievements</Text>
          
          {achievementsList.map((achievement) => {
            const IconComponent = achievement.icon;
            return (
              <View key={achievement.id} style={styles.achievement}>
                <View style={[styles.achievementIcon, { backgroundColor: achievement.bgColor }]}>
                  <IconComponent size={20} color={achievement.color} />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementName}>{achievement.name}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                </View>
                <View style={[
                  styles.achievementBadge, 
                  !achievement.unlocked && { backgroundColor: '#F3F4F6' }
                ]}>
                  <Text style={[
                    styles.achievementBadgeText,
                    !achievement.unlocked && { color: '#9CA3AF' }
                  ]}>
                    {achievement.unlocked ? '✓' : '•••'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Health Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Health Tips</Text>
          <View style={styles.tip}>
            <Text style={styles.tipText}>
              💡 Take a 2-minute break every hour to reduce eye strain and improve posture
            </Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipText}>
              🚰 Stay hydrated! Aim for 8 glasses of water throughout your workday
            </Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipText}>
              🧘 Deep breathing exercises can help reduce stress and improve focus
            </Text>
          </View>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    width: '47%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    height: 80,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    width: 20,
    borderRadius: 10,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 4,
  },
  barValue: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  achievementsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  achievementsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 20,
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  achievementIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  achievementBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  tipsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  tip: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    lineHeight: 20,
  },
});