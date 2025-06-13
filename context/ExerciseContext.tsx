import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import { Exercise } from '@/types/Exercise';
import { exercises } from '@/data/exercises';
import { Database } from '@/types/database';

type ExerciseSession = Database['public']['Tables']['exercise_sessions']['Row'];
type Achievement = Database['public']['Tables']['achievements']['Row'];

interface ExerciseStats {
  todayCompleted: number;
  weeklyCompleted: number;
  totalCompleted: number;
  currentStreak: number;
}

interface ExerciseContextType {
  stats: ExerciseStats;
  recentSessions: ExerciseSession[];
  achievements: Achievement[];
  loading: boolean;
  completeExercise: (exercise: Exercise, repetitions?: number, durationSeconds?: number) => Promise<void>;
  getRecommendedExercise: () => Exercise;
  refreshStats: () => Promise<void>;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

export function ExerciseProvider({ children }: { children: React.ReactNode }) {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<ExerciseStats>({
    todayCompleted: 0,
    weeklyCompleted: 0,
    totalCompleted: 0,
    currentStreak: 0,
  });
  const [recentSessions, setRecentSessions] = useState<ExerciseSession[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      refreshStats();
      fetchRecentSessions();
      fetchAchievements();
    } else {
      // Reset to default values when not logged in
      setStats({
        todayCompleted: 3,
        weeklyCompleted: 12,
        totalCompleted: 47,
        currentStreak: 5,
      });
      setRecentSessions([]);
      setAchievements([]);
    }
  }, [user]);

  const refreshStats = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());

      // Get today's completed exercises
      const { data: todayData } = await supabase
        .from('exercise_sessions')
        .select('*')
        .eq('user_id', user.id)
        .gte('completed_at', today.toISOString());

      // Get this week's completed exercises
      const { data: weekData } = await supabase
        .from('exercise_sessions')
        .select('*')
        .eq('user_id', user.id)
        .gte('completed_at', weekStart.toISOString());

      // Get total completed exercises
      const { data: totalData } = await supabase
        .from('exercise_sessions')
        .select('*')
        .eq('user_id', user.id);

      // Calculate streak (simplified - consecutive days with at least one exercise)
      const streak = await calculateStreak(user.id);

      setStats({
        todayCompleted: todayData?.length || 0,
        weeklyCompleted: weekData?.length || 0,
        totalCompleted: totalData?.length || 0,
        currentStreak: streak,
      });
    } catch (error) {
      console.error('Error refreshing stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStreak = async (userId: string): Promise<number> => {
    try {
      const { data } = await supabase
        .from('exercise_sessions')
        .select('completed_at')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false });

      if (!data || data.length === 0) return 0;

      const dates = data.map(session => 
        new Date(session.completed_at).toDateString()
      );
      
      const uniqueDates = [...new Set(dates)];
      let streak = 0;
      const today = new Date().toDateString();
      
      for (let i = 0; i < uniqueDates.length; i++) {
        const checkDate = new Date();
        checkDate.setDate(checkDate.getDate() - i);
        
        if (uniqueDates.includes(checkDate.toDateString())) {
          streak++;
        } else {
          break;
        }
      }

      return streak;
    } catch (error) {
      console.error('Error calculating streak:', error);
      return 0;
    }
  };

  const fetchRecentSessions = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('exercise_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(10);

      setRecentSessions(data || []);
    } catch (error) {
      console.error('Error fetching recent sessions:', error);
    }
  };

  const fetchAchievements = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('unlocked_at', { ascending: false });

      setAchievements(data || []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const completeExercise = async (
    exercise: Exercise, 
    repetitions: number = 10, 
    durationSeconds: number = 120
  ) => {
    if (!user) return;

    try {
      // Record the exercise session
      const { error } = await supabase
        .from('exercise_sessions')
        .insert({
          user_id: user.id,
          exercise_id: exercise.id,
          exercise_name: exercise.name,
          exercise_type: exercise.type,
          repetitions,
          duration_seconds: durationSeconds,
          completed_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error recording exercise:', error);
        return;
      }

      // Check for new achievements
      await checkAchievements();

      // Refresh stats
      await refreshStats();
      await fetchRecentSessions();
    } catch (error) {
      console.error('Error completing exercise:', error);
    }
  };

  const checkAchievements = async () => {
    if (!user) return;

    const newStats = await getLatestStats();
    const existingAchievements = achievements.map(a => a.achievement_type);

    const achievementsToUnlock = [];

    // First Steps achievement
    if (newStats.totalCompleted >= 1 && !existingAchievements.includes('first_steps')) {
      achievementsToUnlock.push({
        user_id: user.id,
        achievement_type: 'first_steps',
        achievement_name: 'First Steps',
        description: 'Complete your first exercise',
      });
    }

    // Week Warrior achievement
    if (newStats.weeklyCompleted >= 5 && !existingAchievements.includes('week_warrior')) {
      achievementsToUnlock.push({
        user_id: user.id,
        achievement_type: 'week_warrior',
        achievement_name: 'Week Warrior',
        description: 'Exercise 5 days in a week',
      });
    }

    // Streak Master achievement
    if (newStats.currentStreak >= 7 && !existingAchievements.includes('streak_master')) {
      achievementsToUnlock.push({
        user_id: user.id,
        achievement_type: 'streak_master',
        achievement_name: 'Streak Master',
        description: 'Maintain a 7-day streak',
      });
    }

    if (achievementsToUnlock.length > 0) {
      const { error } = await supabase
        .from('achievements')
        .insert(achievementsToUnlock);

      if (!error) {
        await fetchAchievements();
      }
    }
  };

  const getLatestStats = async (): Promise<ExerciseStats> => {
    if (!user) return stats;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());

    const [todayData, weekData, totalData] = await Promise.all([
      supabase.from('exercise_sessions').select('*').eq('user_id', user.id).gte('completed_at', today.toISOString()),
      supabase.from('exercise_sessions').select('*').eq('user_id', user.id).gte('completed_at', weekStart.toISOString()),
      supabase.from('exercise_sessions').select('*').eq('user_id', user.id),
    ]);

    const streak = await calculateStreak(user.id);

    return {
      todayCompleted: todayData.data?.length || 0,
      weeklyCompleted: weekData.data?.length || 0,
      totalCompleted: totalData.data?.length || 0,
      currentStreak: streak,
    };
  };

  const getRecommendedExercise = (): Exercise => {
    let filteredExercises = exercises;

    // Filter by user preference if logged in
    if (profile?.focus_area && profile.focus_area !== 'All') {
      filteredExercises = exercises.filter(ex => ex.type === profile.focus_area);
    }

    // Filter by difficulty
    if (profile?.exercise_difficulty) {
      filteredExercises = filteredExercises.filter(ex => ex.difficulty === profile.exercise_difficulty);
    }

    // Return random exercise from filtered list
    return filteredExercises[Math.floor(Math.random() * filteredExercises.length)];
  };

  return (
    <ExerciseContext.Provider
      value={{
        stats,
        recentSessions,
        achievements,
        loading,
        completeExercise,
        getRecommendedExercise,
        refreshStats,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExercise() {
  const context = useContext(ExerciseContext);
  if (context === undefined) {
    throw new Error('useExercise must be used within an ExerciseProvider');
  }
  return context;
}