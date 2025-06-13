/*
  # Create exercise sessions table

  1. New Tables
    - `exercise_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `exercise_id` (text, exercise identifier)
      - `exercise_name` (text)
      - `exercise_type` (enum: Mobility, Core, Strength)
      - `repetitions` (integer, default 10)
      - `duration_seconds` (integer, default 120)
      - `completed_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `exercise_sessions` table
    - Add policies for users to manage their own exercise sessions
*/

CREATE TABLE IF NOT EXISTS exercise_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  exercise_id text NOT NULL,
  exercise_name text NOT NULL,
  exercise_type text NOT NULL CHECK (exercise_type IN ('Mobility', 'Core', 'Strength')),
  repetitions integer DEFAULT 10,
  duration_seconds integer DEFAULT 120,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE exercise_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own exercise sessions"
  ON exercise_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exercise sessions"
  ON exercise_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exercise sessions"
  ON exercise_sessions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own exercise sessions"
  ON exercise_sessions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS exercise_sessions_user_id_idx ON exercise_sessions(user_id);
CREATE INDEX IF NOT EXISTS exercise_sessions_completed_at_idx ON exercise_sessions(completed_at);