'use client';

import { Workout } from "@/app/types/workout.data";
import { createContext, ReactNode, useState } from "react";


export type FitLogContextType = {
    planCount: Workout[];
    savedCount : Workout[];
    setPlanCount : React.Dispatch<React.SetStateAction<Workout[]>>;
    setSavedCount : React.Dispatch<React.SetStateAction<Workout[]>>;
}

export const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

const FitLogProvider = ({ children }: {children: ReactNode}) => {

    const [planCount, setPlanCount] = useState<Workout[]>([])
    const [savedCount, setSavedCount] = useState<Workout[]>([])

    const sharedData: FitLogContextType = {
        planCount, setPlanCount, savedCount, setSavedCount
    }
    return <FitLogContext.Provider value={sharedData} >{children}</FitLogContext.Provider>
};

export default FitLogProvider;