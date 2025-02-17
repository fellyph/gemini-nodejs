interface River {
    riverName: string;
    riverLength: number;
}

interface RiverResponse {
    success: boolean;
    data?: {
        rivers: River[];
    };
    error?: string;
}

export { River, RiverResponse };
