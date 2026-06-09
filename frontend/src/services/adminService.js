import { api } from './api';

export const adminService = {
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  getPendingOwners: async () => {
    const response = await api.get('/admin/pending-owners');
    return response.data;
  },

  verifyOwner: async (ownerId) => {
    const response = await api.put(`/admin/verify-owner/${ownerId}`);
    return response.data;
  },

  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  getKos: async () => {
    const response = await api.get('/admin/kos');
    return response.data;
  },

  getFacilities: async () => {
    const response = await api.get('/admin/facilities');
    return response.data;
  },

  addFacility: async (data) => {
    const response = await api.post('/admin/facilities', data);
    return response.data;
  },

  deleteFacility: async (id) => {
    const response = await api.delete(`/admin/facilities/${id}`);
    return response.data;
  },

  getReviews: async () => {
    const response = await api.get('/admin/reviews');
    return response.data;
  },

  getSavedKos: async () => {
    const response = await api.get('/admin/saved-kos');
    return response.data;
  }
};
