
export class AddRentalAssetRequest {
    constructor(
        public readonly asset_id: number,
        public readonly owner_id: number, 
        public readonly status: number
    ) {}
}