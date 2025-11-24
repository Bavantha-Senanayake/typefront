export interface IssuedFabric {
  PK: string;
  SK: string;
  fabricName: string;
  totalIssuedLength: number;
  type?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddTypeRequest {
  type: string;
}

export interface IssuedFabricState {
  issuedFabrics: IssuedFabric[];
  loading: boolean;
  error: string | null;
}
