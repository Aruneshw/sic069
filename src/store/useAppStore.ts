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

  // Novelty Experience Layer (Travel DNA & Travel State)
  travelDna: any;
  travelState: any;
  isOnboardingOpen: boolean;
  setTravelDna: (dna: any) => void;
  setTravelState: (state: any) => void;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  resetTravelDna: () => void;
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

  // Novelty Experience Layer
  travelDna: {
    adventure: 70,
    nature: 85,
    peace: 75,
    social: 45,
    solitude: 60,
    exploration: 80,
    photography: 85,
    culture: 65,
    food: 70,
    spontaneity: 60,
    comfort: 65,
    budgetSensitivity: 80,
    distanceTolerance: 75,
    crowdTolerance: 35,
    physicalIntensity: 60,
    durationPreference: 3,
  },
  travelState: {
    state: "Escape",
    startLocation: "Chennai",
    maxBudgetInr: 10000,
    availableDays: 2,
  },
  isOnboardingOpen: false,
  setTravelDna: (dna) => set((prev) => ({ travelDna: { ...prev.travelDna, ...dna } })),
  setTravelState: (state) => set((prev) => ({ travelState: { ...prev.travelState, ...state } })),
  openOnboarding: () => set({ isOnboardingOpen: true }),
  closeOnboarding: () => set({ isOnboardingOpen: false }),
  resetTravelDna: () =>
    set({
      travelDna: {
        adventure: 70,
        nature: 85,
        peace: 75,
        social: 45,
        solitude: 60,
        exploration: 80,
        photography: 85,
        culture: 65,
        food: 70,
        spontaneity: 60,
        comfort: 65,
        budgetSensitivity: 80,
        distanceTolerance: 75,
        crowdTolerance: 35,
        physicalIntensity: 60,
        durationPreference: 3,
      },
    }),
}));
