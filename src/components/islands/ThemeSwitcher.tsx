import { useStore } from '@nanostores/react';
import { $theme, type Theme } from '../../lib/state/theme-store';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
    const currentTheme = useStore($theme);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const availableThemes: Theme[] = [
        'flat', 
        'bento', 
        'glass', 
        'brutalism', 
        'cyberpunk'
    ];

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        $theme.set(e.target.value as Theme);
    };

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="theme-selector" className="text-sm font-bold uppercase tracking-wider">
                Pilih Tema
            </label>
            <select
                id="theme-selector"
                value={isMounted ? currentTheme : 'flat'}
                onChange={handleThemeChange}
                className="px-4 py-2 border-2 border-black bg-white text-black focus:outline-none cursor-pointer"
                style={{ 
                    boxShadow: 'var(--shadow-card)',
                    borderRadius: 'var(--radius-md)'
                }}
            >
                {availableThemes.map((theme) => (
                    <option key={theme} value={theme}>
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
}