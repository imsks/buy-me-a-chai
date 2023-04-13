export interface DataContextProps {
    account: string
    contract: any
    loading: boolean
    images: any[]
    imageCount: number
    updateImages: any
    donateImageOwner: (id: string, donateAmout: any) => any
}

export interface DataContextActionsProps extends DataContextProps {
    updateImages: () => Promise<void>
    donateImageOwner: (id: string, donateAmout: any) => Promise<void>
}

export interface BodyItemProps {
    address: string
    description: string
    totalDonations: string
    hash: string
    id: string
}
