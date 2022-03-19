import create from 'zustand'

export const FILTER_VALUES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
}

export const useFilter = create((set) => ({
  filter: FILTER_VALUES.ALL,
  filterByAll: () => set({ filter: FILTER_VALUES.ALL }),
  filterByActive: () => set({ filter: FILTER_VALUES.ACTIVE }),
  filterByCompleted: () => set({ filter: FILTER_VALUES.COMPLETED }),
}))
