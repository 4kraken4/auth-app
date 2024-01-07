import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private BASE_URL = environment.BASE_URL;

  constructor() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private axiosInstance = axios.create({
    baseURL: this.BASE_URL,
    timeout: 1800,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Origin, Content-Type, Accept, Authorization, X-Request-With',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
      'Access-Control-Expose-Headers': 'Authorization',
    },
  });

  public get(url: string) {
    return this.axiosInstance
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }

  public post(url: string, data: any) {
    return this.axiosInstance
      .post(url, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.message;
      });
  }

  public put(url: string, data: any) {
    return this.axiosInstance
      .put(url, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }

  public delete(url: string) {
    return this.axiosInstance
      .delete(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }

  public patch(url: string, data: any) {
    return this.axiosInstance
      .patch(url, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }

  public head(url: string) {
    return this.axiosInstance
      .head(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }

  public options(url: string) {
    return this.axiosInstance
      .options(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
}
