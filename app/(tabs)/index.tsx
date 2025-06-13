import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Clock, CircleCheck as CheckCircle, RotateCcw, LogOut } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useExercise } from '@/context/ExerciseContext';
import { Exercise } from '@/types/Exercise';
import AuthScreen from '@/components/AuthScreen';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const { stats, completeExercise, getRecommendedExercise } = useExercise();
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [exerciseStarted, setExerciseStarted] = useState(false);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [timeUntilNext, setTimeUntilNext] = useState('');

  useEffect(() => {
    // Set a recommended exercise
    setCurrentExercise(getRecommendedExercise());

    // Update countdown timer
    const updateTimer = () => {
      const now = new Date();
      const nextHour = new Date(now);
      nextHour.setHours(now.getHours() + 1, 0, 0, 0);
      const diff = nextHour.getTime() - now.getTime();
      
      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeUntilNext(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [user]);

  const startExercise = () => {
    setExerciseStarted(true);
    setExerciseCompleted(false);
  };

  const handleCompleteExercise = async () => {
    if (currentExercise) {
      setExerciseCompleted(true);
      await completeExercise(currentExercise);
    }
  };

  const resetExercise = () => {
    setExerciseStarted(false);
    setExerciseCompleted(false);
    setCurrentExercise(getRecommendedExercise());
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#3B82F6', '#1D4ED8']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>DeskFiit</Text>
            <Text style={styles.headerSubtitle}>Stay active, stay healthy</Text>
          </View>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <LogOut size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.todayCompleted}</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
          <View style={styles.statCard}>
            <Clock size={20} color="#10B981" />
            <Text style={styles.statTime}>{timeUntilNext}</Text>
            <Text style={styles.statLabel}>Next Exercise</Text>
          </View>
        </View>

        {/* Current Exercise */}
        {currentExercise && (
          <View style={styles.exerciseCard}>
            <Text style={styles.exerciseTitle}>Current Exercise</Text>
            
            <View style={styles.exerciseImageContainer}>
              <Image source={{ uri: currentExercise.image }} style={styles.exerciseImage} />
              <View style={styles.exerciseTypeTag}>
                <Text style={styles.exerciseTypeText}>{currentExercise.type}</Text>
              </View>
            </View>

            <Text style={styles.exerciseName}>{currentExercise.name}</Text>
            <Text style={styles.exerciseDescription}>{currentExercise.description}</Text>
            
            <View style={styles.exerciseReps}>
              <Text style={styles.repsText}>10 repetitions</Text>
            </View>

            {/* Exercise Actions */}
            <View style={styles.exerciseActions}>
              {!exerciseStarted && !exerciseCompleted && (
                <TouchableOpacity style={styles.startButton} onPress={startExercise}>
                  <Play size={20} color="#FFFFFF" />
                  <Text style={styles.startButtonText}>Start Exercise</Text>
                </TouchableOpacity>
              )}

              {exerciseStarted && !exerciseCompleted && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.completeButton} onPress={handleCompleteExercise}>
                    <CheckCircle size={20} color="#FFFFFF" />
                    <Text style={styles.completeButtonText}>Complete</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.resetButton} onPress={resetExercise}>
                    <RotateCcw size={18} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              )}

              {exerciseCompleted && (
                <View style={styles.completedContainer}>
                  <CheckCircle size={24} color="#10B981" />
                  <Text style={styles.completedText}>Exercise Completed!</Text>
                  <TouchableOpacity style={styles.newExerciseButton} onPress={resetExercise}>
                    <Text style={styles.newExerciseButtonText}>Start New Exercise</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>How it works</Text>
          <View style={styles.instructionItem}>
            <View style={styles.instructionNumber}>
              <Text style={styles.instructionNumberText}>1</Text>
            </View>
            <Text style={styles.instructionText}>Get notified every hour with a new exercise</Text>
          </View>
          <View style={styles.instructionItem}>
            <View style={styles.instructionNumber}>
              <Text style={styles.instructionNumberText}>2</Text>
            </View>
            <Text style={styles.instructionText}>Follow the visual guide and complete 10 reps</Text>
          </View>
          <View style={styles.instructionItem}>
            <View style={styles.instructionNumber}>
              <Text style={styles.instructionNumberText}>3</Text>
            </View>
            <Text style={styles.instructionText}>Track your progress and build healthy habits</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#DBEAFE',
  },
  signOutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 12,
  },
  content: {
    padding: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statTime: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
    marginTop: 4,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  exerciseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  exerciseTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  exerciseImageContainer: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  exerciseImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  exerciseTypeTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  exerciseTypeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    textTransform: 'uppercase',
  },
  exerciseName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  exerciseDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 16,
  },
  exerciseReps: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  repsText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  exerciseActions: {
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  completeButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  resetButton: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 12,
  },
  completedContainer: {
    alignItems: 'center',
    gap: 12,
  },
  completedText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  newExerciseButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  newExerciseButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  instructionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  instructionNumber: {
    backgroundColor: '#3B82F6',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
});