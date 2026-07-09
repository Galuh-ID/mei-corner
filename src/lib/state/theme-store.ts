import { atom } from 'nanostores';

export type Theme = 'flat' | 'bento' | 'glass' | 'brutalism' | 'cyberpunk';

const THEME_STORAGE_KEY = 'mei_corner_theme';

const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme;
        if (storedTheme) {
            return storedTheme;
        }
    }
    return 'flat'; 
};

export const $theme = atom<Theme>(getInitialTheme());

if (typeof window !== 'undefined') {
    $theme.subscribe((theme) => {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
        document.documentElement.setAttribute('data-theme', theme);
    });
}