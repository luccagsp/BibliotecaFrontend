import {create} from 'zustand';

export const useStackStore = create((set) => ({
  currentStack: null,
  setCurrentStack: (currentStack) => set({currentStack})
}))