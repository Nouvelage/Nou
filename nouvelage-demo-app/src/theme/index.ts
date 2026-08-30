export const c = {
  bg: '#FAF7F2', surface: '#FFFDFA', header: '#EAE1D6',
  border: '#E5DBCD', borderStrong: '#D9CDBE',
  primary: '#3E2E20', secondary: '#7A5C48', muted: '#A8967F',
  onPrimary: '#F5EFE7',
  dangerBg: '#F9E9E9', dangerBorder: '#E3C9C9', danger: '#8B4A4A',
  okBg: '#E8F0E6', ok: '#4A6B45', star: '#E8B23A',
} as const;

export const R = { sm: 8, md: 12, lg: 16, xl: 20, pill: 999 } as const;
export const S = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 } as const;

export const F = {
  h: 'PlayfairDisplay_500Medium',
  hb: 'PlayfairDisplay_600SemiBold',
} as const;

export const t = {
  h1: { fontFamily: F.h, fontSize: 26, color: c.primary },
  h2: { fontFamily: F.h, fontSize: 21, color: c.primary },
  h3: { fontFamily: F.h, fontSize: 16, color: c.primary },
  body: { fontSize: 14, color: c.primary },
  small: { fontSize: 12, color: c.secondary },
  tiny: { fontSize: 11, color: c.muted },
} as const;

export const card = {
  backgroundColor: c.surface, borderWidth: 0.5, borderColor: c.border,
  borderRadius: R.lg, padding: 14,
} as const;
