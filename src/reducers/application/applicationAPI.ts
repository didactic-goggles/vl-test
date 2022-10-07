import axios from 'axios';
import {
  Application,
  ApplicationCreatePayload
} from 'models/application.model';

export function fetchAllReq() {
  return axios.get('/products');
}

export function createApplicationReq(formData: ApplicationCreatePayload) {
  return axios.post('/products/add', formData);
}

export function updateApplicationReq(formData: Application) {
  const { id, ...body } = formData;
  return axios.put(`/products/${id}`, body);
}

export function deleteApplicationReq(applicationId: string | number) {
  return axios.delete(`/products/${applicationId}`);
}
