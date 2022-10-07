import axios from 'axios';
import {
  Application
} from 'models/application.model';

export function fetchAllReq() {
  return axios.get('/applications');
}

export function getApplicationReq(applicationId: string) {
  return axios.get(`/applications/${applicationId}`);
}

export function createApplicationReq(formData: Application) {
  return axios.post('/applications', formData);
}

export function updateApplicationReq(formData: Application) {
  // const { id, ...body } = formData;
  return axios.put(`/applications/${formData.id}`, formData);
}

export function deleteApplicationReq(applicationId: string) {
  return axios.delete(`/applications/${applicationId}`);
}
