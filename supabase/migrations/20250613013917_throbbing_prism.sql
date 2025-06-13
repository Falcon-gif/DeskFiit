/*
  # Create user profiles table

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text, nullable)
      - `avatar_url` (text, nullable)
      - `notification_enabled` (boolean, default true)
      - `work_hours_only` (boolean, default true)
      - `sound_enabled` (boolean, default true)
      - `vibration_enabled` (boolean, default true)
      - `exercise_difficulty` (enum, default 'Beginner')
      - `focus_area` (enum, default 'All')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `profiles` table
    - Add policies for users to read and update their own profile
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  notification_enabled boolean DEFAULT true,
  work_hours_only boolean DEFAULT true,
  sound_enabled boolean DEFAULT true,
  vibration_enabled boolean DEFAULT true,
  exercise_difficulty text DEFAULT 'Beginner' CHECK (exercise_difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  focus_area text DEFAULT 'All' CHECK (focus_area IN ('Mobility', 'Core', 'Strength', 'All')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);