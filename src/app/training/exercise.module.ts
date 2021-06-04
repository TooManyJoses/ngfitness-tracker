export interface Exercise {
  id: string,
  name: string,
  reps: number,
  sets: number,
  duration: number;
  weight?: number,
  unit?: string,
  state?: 'completed' | 'cancelled' | null
  date?: Date
}
