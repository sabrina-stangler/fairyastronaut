export interface NewsletterPage {
  tabTitle?: string // Optional tab title for the page
  title?: string // Optional title for the page
  media: NewsletterMedia[] // Array of media items for the page
}

export interface NewsletterMedia {
  title?: string // Optional title for the media item
  author: string
  date?: Date
  body?: string // markdown text
  image?: string
  video?: string // video URL
  span?: 1 | 2 | 4 // Column span: 1=quarter, 2=half, 4=full width (default: 2)
}

export interface UpcomingDate {
  date: Date
  type: 'performance' | 'release'
  title: string
  location?: string // for performances
}

export interface Newsletter {
  pages: NewsletterPage[]
  upcomingDates: UpcomingDate[]
  month: number // 1-12
  year: number // e.g., 2026
  title?: string // Optional title for the newsletter
}

// Author constants for filtering
export const AUTHORS = {
  MCKENZIE: 'McKenzie Van Oss',
  JOJO: 'Jojo Brickey',
  ANON_GUEST: 'Anonymous Guest',
} as const

export type Author = (typeof AUTHORS)[keyof typeof AUTHORS]
