type EntryMetric = {
  name: string
  value: number
}

export type Entry = {
  id: number
  comment: string
  created_at: string
  metrics: Record<number, EntryMetric>
}