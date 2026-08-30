import React, { createContext, useContext, useState } from 'react';
import { ME } from './demo';

type S = { signedIn: boolean; me: typeof ME;
  signIn: () => void; signOut: () => void };
const Ctx = createContext<S | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <Ctx.Provider value={{ signedIn, me: ME,
      signIn: () => setSignedIn(true), signOut: () => setSignedIn(false) }}>
      {children}
    </Ctx.Provider>
  );
}
export const useSession = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useSession outside provider');
  return v;
};
