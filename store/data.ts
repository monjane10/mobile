import { create } from 'zustand';

export type Data = {
    name: string;
    weight: string;
    age: string;
    height: string;
    gender: string;
    level: string;
    goal: string;
};

type DataStore = {
    user: Data;
    setPageOne: (data: Omit<Data, "gender" | "goal" | "level">) => void;  
    setPageTwo: (data: Pick<Data, "gender" | "goal" | "level">) => void;
};

export const useDataStore = create<DataStore>((set) => ({
    user: {
        name: '',
        weight: '',
        age: '',
        height: '',
        gender: '',
        level: '',
        goal: '',
    },
    setPageOne: (data) => set((state) => ({ user: { ...state.user, ...data } })),
    setPageTwo: (data) => set((state) => ({ user: { ...state.user, ...data } })),
}));
