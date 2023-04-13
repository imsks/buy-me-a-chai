import React, { createContext, useContext } from "react"
import { useWeb3 } from "@/hooks"
import { DataContextProps } from "@/interfaces"

const DataContext = createContext<DataContextProps>({
    loading: true,
    account: "",
    contract: undefined,
    images: [],
    imageCount: 0,
    updateImages: () => {},
    donateImageOwner: (id: string, donateAmout: any) => {}
})

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const data = useWeb3()
    return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

export const useData = () => useContext<DataContextProps>(DataContext)
