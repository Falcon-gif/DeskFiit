export interface Exercise {
  id: string;
  name: string;
  type: 'Mobility' | 'Core' | 'Strength';
  description: string;
  image: string;
  instructions: string[];
  targetMuscles: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in seconds
}