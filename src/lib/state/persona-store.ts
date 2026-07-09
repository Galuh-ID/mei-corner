import { atom } from 'nanostores';

export type Persona = 'recruiter' | 'student' | 'explore' | null;

const PERSONA_STORAGE_KEY = 'mei_corner_persona';

const getInitialPersona = (): Persona => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedPersona = window.localStorage.getItem(PERSONA_STORAGE_KEY) as Persona;
        if (storedPersona === 'recruiter' || storedPersona === 'student' || storedPersona === 'explore') {
            return storedPersona;
        }
    }
    return null; 
};

export const $persona = atom<Persona>(getInitialPersona());

if (typeof window !== 'undefined') {
    $persona.subscribe((persona) => {
        if (persona) {
            window.localStorage.setItem(PERSONA_STORAGE_KEY, persona);
        }
    });
}