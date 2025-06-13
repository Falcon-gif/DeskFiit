/*
  # Create achievements table

  1. New Tables
    - `achievements`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `achievement_type` (text, unique identifier for achievement)
      - `achievement_name` (text, display name)
      - `description` (text, achievement description)
      - `unlocked_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `achievements` table
    - Add policies for users to read their own achievements
*/

CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_type text NOT NULL,
  achievement_name text NOT NULL,
  description text NOT NULL,
  unlocked_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_type)
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own achievements"
  ON achievements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
  ON achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS achievements_user_id_idx ON achievements(user_id);
CREATE INDEX IF NOT EXISTS achievements_unlocked_at_idx ON achievements(unlocked_at);