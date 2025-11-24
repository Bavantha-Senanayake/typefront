export interface Fabric {
  PK: string;
  SK: string;
  name: string;
  length: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFabricRequest {
  name: string;
  length: number;
}

export interface UpdateFabricRequest {
  length: number;
}

export interface IssueFabricRequest {
  length: number;
}

export interface IssueFabricResponse {
  message: string;
  remainingLength: number;
  totalIssued: number;
}

export interface FabricState {
  fabrics: Fabric[];
  selectedFabric: Fabric | null;
  loading: boolean;
  error: string | null;
}
