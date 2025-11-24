import type { IssuedFabric, AddTypeRequest } from '../types/issued.types';

const BASE_URL = 'https://jmzmk06zp3.execute-api.us-east-1.amazonaws.com/Stage';

export const issuedService = {
  async getAllIssuedFabrics(): Promise<IssuedFabric[]> {
    const response = await fetch(`${BASE_URL}/issued`);
    if (!response.ok) throw new Error('Failed to fetch issued fabrics');
    return response.json();
  },

  async addTypeToIssued(fabricName: string, data: AddTypeRequest): Promise<IssuedFabric> {
    const response = await fetch(`${BASE_URL}/issued/${fabricName}/type`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to add type to issued fabric');
    return response.json();
  },
};
