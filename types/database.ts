export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          notification_enabled: boolean
          work_hours_only: boolean
          sound_enabled: boolean
          vibration_enabled: boolean
          exercise_difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
          focus_area: 'Mobility' | 'Core' | 'Strength' | 'All'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          notification_enabled?: boolean
          work_hours_only?: boolean
          sound_enabled?: boolean
          vibration_enabled?: boolean
          exercise_difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
          focus_area?: 'Mobility' | 'Core' | 'Strength' | 'All'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          notification_enabled?: boolean
          work_hours_only?: boolean
          sound_enabled?: boolean
          vibration_enabled?: boolean
          exercise_difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
          focus_area?: 'Mobility' | 'Core' | 'Strength' | 'All'
          created_at?: string
          updated_at?: string
        }
      }
      exercise_sessions: {
        Row: {
          id: string
          user_id: string
          exercise_id: string
          exercise_name: string
          exercise_type: 'Mobility' | 'Core' | 'Strength'
          repetitions: number
          duration_seconds: number
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          exercise_id: string
          exercise_name: string
          exercise_type: 'Mobility' | 'Core' | 'Strength'
          repetitions?: number
          duration_seconds?: number
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          exercise_id?: string
          exercise_name?: string
          exercise_type?: 'Mobility' | 'Core' | 'Strength'
          repetitions?: number
          duration_seconds?: number
          completed_at?: string
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          achievement_type: string
          achievement_name: string
          description: string
          unlocked_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_type: string
          achievement_name: string
          description: string
          unlocked_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_type?: string
          achievement_name?: string
          description?: string
          unlocked_at?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}