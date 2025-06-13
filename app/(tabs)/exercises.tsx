import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useState } from 'react';
import { Search, Filter } from 'lucide-react-native';
import { exercises } from '@/data/exercises';
import { Exercise } from '@/types/Exercise';

const exerciseTypes = ['All', 'Mobility', 'Core', 'Strength'];

export default function ExercisesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || exercise.type === selectedType;
    return matchesSearch && matchesType;
  });

  const renderExerciseCard = (exercise: Exercise) => (
    <TouchableOpacity key={exercise.id} style={styles.exerciseCard}>
      <View style={styles.exerciseImageContainer}>
        <Image source={{ uri: exercise.image }} style={styles.exerciseImage} />
        <View style={[styles.typeTag, { backgroundColor: getTypeColor(exercise.type) }]}>
          <Text style={styles.typeTagText}>{exercise.type}</Text>
        </View>
      </View>
      
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.exerciseDescription} numberOfLines={2}>
          {exercise.description}
        </Text>
        <View style={styles.exerciseMeta}>
          <Text style={styles.exerciseReps}>10 reps</Text>
          <Text style={styles.exerciseDuration}>~2 min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Mobility': return '#3B82F6';
      case 'Core': return '#10B981';
      case 'Strength': return '#F97316';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exercises</Text>
        <Text style={styles.headerSubtitle}>Discover desk-friendly workouts</Text>
      </View>

      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {exerciseTypes.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterTab,
                selectedType === type && styles.filterTabActive
              ]}
              onPress={() => setSelectedType(type)}>
              <Text style={[
                styles.filterTabText,
                selectedType === type && styles.filterTabTextActive
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Exercise Grid */}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.exercisesList}>
          <View style={styles.exercisesGrid}>
            {filteredExercises.map(renderExerciseCard)}
          </View>
        </ScrollView>
      </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  filterContainer: {
    marginBottom: 24,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 12,
  },
  filterTabActive: {
    backgroundColor: '#3B82F6',
  },
  filterTabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  exercisesList: {
    flex: 1,
  },
  exercisesGrid: {
    gap: 16,
  },
  exerciseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  exerciseImageContainer: {
    position: 'relative',
    height: 160,
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  typeTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  typeTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    textTransform: 'uppercase',
  },
  exerciseInfo: {
    padding: 16,
  },
  exerciseName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  exerciseDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  exerciseMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  exerciseReps: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  exerciseDuration: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});