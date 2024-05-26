// 基於 CRUD的封裝

// src/services/BaseService.js
import server from '@/api/server';

class BaseService {
  constructor(resource) { // 透過建構子取得 resource
    this.resource = resource;
  }

  getAll(params) {
    return server.get(`/${this.resource}`, {params});
  }

  getById(id, params) {
    return server.get(`/${this.resource}/${id}`, {params});
  }

  create(data) {
    return server.post(`/${this.resource}`, data);
  }

  update(id, data) {
    return server.put(`/${this.resource}/${id}`, data);
  }

  delete(id) {
    return server.delete(`/${this.resource}/${id}`);
  }
}

export default BaseService;
