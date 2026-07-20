import { create } from "zustand";

interface AppState {
  // Notification panel
  isNotificationPanelOpen: boolean;
  unreadCount: number;
  openNotificationPanel: () => void;
  closeNotificationPanel: () => void;
  toggleNotificationPanel: () => void;
  setUnreadCount: (count: number) => void;

  // Trip filters
  activeCategory: string;
  searchQuery: string;
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;

  // Calendar
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;

  // Mobile nav
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Notification panel
  isNotificationPanelOpen: false,
  unreadCount: 3,
  openNotificationPanel: () => set({ isNotificationPanelOpen: true }),
  closeNotificationPanel: () => set({ isNotificationPanelOpen: false }),
  toggleNotificationPanel: () =>
    set((state) => ({ isNotificationPanelOpen: !state.isNotificationPanelOpen })),
  setUnreadCount: (count) => set({ unreadCount: count }),

  // Trip filters
  activeCategory: "All",
  searchQuery: "",
  setActiveCategory: (category) => set({ activeCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Calendar
  selectedDate: null,
  setSelectedDate: (date) => set({ selectedDate: date }),

  // Mobile nav
  isMobileMenuOpen: false,
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));
