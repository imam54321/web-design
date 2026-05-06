import {create} from 'zustand';

interface ThemeState {
    isDarkMode: boolean;
    toogleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    isDarkMode :false,

    toogleTheme :() => set((state) => ({isDarkMode : !state.isDarkMode})),
}));