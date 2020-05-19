export class UpdateStatusRequest {
  constructor( 
    public readonly id: number,
    public readonly admin_id: number, 
    public readonly status: number
  ) {}
}
