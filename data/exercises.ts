import { Exercise } from '@/types/Exercise';

export const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Neck Rolls',
    type: 'Mobility',
    description: 'Gentle neck movements to relieve tension and improve flexibility in the cervical spine.',
    image: 'https://images.pexels.com/photos/7592530/pexels-photo-7592530.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: [
      'Sit up straight with shoulders relaxed',
      'Slowly roll your head in a circular motion',
      'Complete 5 circles in each direction',
      'Keep movements slow and controlled'
    ],
    targetMuscles: ['Neck', 'Upper Trapezius'],
    difficulty: 'Beginner',
    duration: 120
  },
  {
    id: '2',
    name: 'Shoulder Blade Squeezes',
    type: 'Strength',
    description: 'Strengthen the muscles between your shoulder blades to improve posture and reduce upper back tension.',
    image: 'https://images.pexels.com/photos/7592423/pexels-photo-7592423.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: [
      'Sit or stand with arms at your sides',
      'Pull shoulder blades together behind you',
      'Hold for 3 seconds, then release',
      'Focus on squeezing between the shoulder blades'
    ],
    targetMuscles: ['Rhomboids', 'Middle Trapezius'],
    difficulty: 'Beginner',
    duration: 90
  },
  {
    id: '3',
    name: 'Seated Spinal Twist',
    type: 'Mobility',
    description: 'Improve spinal mobility and relieve lower back stiffness with this gentle twisting movement.',
    image: 'https://images.pexels.com/photos/7592421/pexels-photo-7592421.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: [
      'Sit tall in your chair',
      'Place right hand on left knee',
      'Gently twist your torso to the left',
      'Hold for 15 seconds, repeat on other side'
    ],
    targetMuscles: ['Obliques', 'Erector Spinae'],
    difficulty: 'Beginner',
    duration: 120
  },
  {
    id: '4',
    name: 'Desk Push-ups',
    type: 'Strength',
    description: 'Upper body strengthening exercise using your desk for support.',
    image: 'https://images.pexels.com/photos/7592319/pexels-photo-7592319.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: [
      'Stand arms length from your desk',
      'Place hands shoulder-width apart on desk edge',
      'Lower chest toward desk, then push back',
      'Keep body straight throughout movement'
    ],
    targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    difficulty: 'Beginner',
    duration: 90
  },
  {
    id: '5',
    name: 'Seated Leg Extensions',
    type: 'Strength',
    description: 'Strengthen your quadriceps and improve circulation while seated at your desk.',
    image: 'https://images.pexels.com/photos/7592287/pexels-photo-7592287.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: [
      'Sit tall with feet flat on floor',
      'Extend one leg straight out',
      'Hold for 2 seconds, then lower slowly',
      'Alternate legs for each repetition'
    ],
    targetMuscles: ['Quadriceps', 'Hip Flexors'],
    difficulty: 'Beginner',
    duration: 90
  },
  {
    id: '6',
    name: 'Seated Cat-Cow Stretch',
    type: 'Mobility',
    description: 'Mobilize your spine and relieve back tension with this yoga-inspired movement.',
    image: 'https://images.pexels.com/photos/7592255/pexels-photo-7592255.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: [
      'Sit with hands on knees',
      'Arch your back and look up (cow pose)',
      'Round your back and tuck chin (cat pose)',
      'Move slowly between positions'
    ],
    targetMuscles: ['Erector Spinae', 'Core'],
    difficulty: 'Beginner',
    duration: 120
  },
  {
    id: '7',
    name: 'Seated Core Twists',
    type: 'Core',
    description: 'Strengthen your obliques and improve core stability while seated.',
    image: 'https://images.pexels.com/photos/7592242/pexels-photo-7592242.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: [
      'Sit tall with hands behind head',
      'Twist torso to the right, engaging core',
      'Return to center, then twist left',
      'Keep hips facing forward'
    ],
    targetMuscles: ['Obliques', 'Rectus Abdominis'],
    difficulty: 'Beginner',
    duration: 90
  },
  {
    id: '8',
    name: 'Calf Raises',
    type: 'Strength',
    description: 'Strengthen calf muscles and improve circulation in your lower legs.',
    image: 'https://images.pexels.com/photos/7592190/pexels-photo-7592190.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: [
      'Stand behind your chair for support',
      'Rise up onto your toes',
      'Hold for 2 seconds at the top',
      'Lower slowly to starting position'
    ],
    targetMuscles: ['Calves', 'Soleus'],
    difficulty: 'Beginner',
    duration: 60
  },
  {
    id: '9',
    name: 'Ankle Circles',
    type: 'Mobility',
    description: 'Improve ankle mobility and circulation in your feet and lower legs.',
    image: 'https://images.pexels.com/photos/7592165/pexels-photo-7592165.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: [
      'Lift one foot off the ground',
      'Make slow circles with your ankle',
      'Complete 5 circles in each direction',
      'Switch to the other foot'
    ],
    targetMuscles: ['Ankle Stabilizers', 'Calves'],
    difficulty: 'Beginner',
    duration: 90
  },
  {
    id: '10',
    name: 'Wall Slides',
    type: 'Strength',
    description: 'Improve shoulder mobility and strengthen the muscles that support good posture.',
    image: 'https://images.pexels.com/photos/7592131/pexels-photo-7592131.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: [
      'Stand with back against wall',
      'Place arms in goal post position against wall',
      'Slide arms up and down the wall',
      'Keep contact with wall throughout movement'
    ],
    targetMuscles: ['Posterior Deltoid', 'Rhomboids'],
    difficulty: 'Beginner',
    duration: 120
  },
  {
    id: '11',
    name: 'Seated Forward Fold',
    type: 'Mobility',
    description: 'Stretch your hamstrings and lower back while seated at your desk.',
    image: 'https://images.pexels.com/photos/7592098/pexels-photo-7592098.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: [
      'Sit forward in your chair',
      'Slowly hinge forward at the hips',
      'Reach toward your feet',
      'Hold the stretch for 15-20 seconds'
    ],
    targetMuscles: ['Hamstrings', 'Lower Back'],
    difficulty: 'Beginner',
    duration: 120
  },
  {
    id: '12',
    name: 'Seated Glute Squeezes',
    type: 'Core',
    description: 'Activate and strengthen your glutes to support proper pelvic alignment.',
    image: 'https://images.pexels.com/photos/7592087/pexels-photo-7592087.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructions: [
      'Sit tall in your chair',
      'Squeeze your glute muscles tightly',
      'Hold for 3 seconds',
      'Release and repeat'
    ],
    targetMuscles: ['Glutes', 'Deep Core'],
    difficulty: 'Beginner',
    duration: 60
  }
];