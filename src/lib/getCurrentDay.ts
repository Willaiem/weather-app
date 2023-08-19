export const getCurrentDay = (date: string, type: 'short' | 'long') => new Date(date).toLocaleDateString('en-US', { weekday: type })
