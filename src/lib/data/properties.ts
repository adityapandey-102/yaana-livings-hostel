// lib/data/properties.ts
export const properties = [
  { id: '1', name: 'Yaana PG - Sector 62' },
  { id: '2', name: 'Yaana Hostel - Noida Extension' },
  { id: '3', name: 'Yaana Rooms - Greater Noida' },
  { id: '4', name: 'Yaana Grand - Greater Noida' },
]

export function getPropertyName(id: string | null): string {
  if (!id) return 'N/A'
  const property = properties.find(p => p.id === id)
  return property?.name || 'Unknown Property'
}