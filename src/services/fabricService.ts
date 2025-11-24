import type { Fabric, CreateFabricRequest, UpdateFabricRequest, IssueFabricResponse } from '../types/fabric.types';

const BASE_URL = 'https://jmzmk06zp3.execute-api.us-east-1.amazonaws.com/Stage';

export const fabricService = {
  async getAllFabrics(): Promise<Fabric[]> {
    const response = await fetch(`${BASE_URL}/fabric`);
    if (!response.ok) throw new Error('Failed to fetch fabrics');
    return response.json();
  },

  async createFabric(data: CreateFabricRequest): Promise<Fabric> {
    const response = await fetch(`${BASE_URL}/fabric`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create fabric');
    return response.json();
  },

  async updateFabric(name: string, data: UpdateFabricRequest): Promise<Fabric> {
    const response = await fetch(`${BASE_URL}/fabric/${name}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update fabric');
    return response.json();
  },

  async deleteFabric(name: string): Promise<{ message: string }> {
    const response = await fetch(`${BASE_URL}/fabric/${name}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete fabric');
    return response.json();
  },

  async issueFabric(name: string, length: number): Promise<IssueFabricResponse> {
    const response = await fetch(`${BASE_URL}/fabric/issue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, length }),
    });
    if (!response.ok) throw new Error('Failed to issue fabric');
    return response.json();
  },
};
