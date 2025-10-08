'use client';

import base64 from "base-64";
import axios, { type AxiosError, type AxiosResponse } from "axios";

// interfaces
export interface IResponse {
  data: {
    title?: string;
    results?: any;
  };
  status?: number;
}

export interface IRequest {
  url: string;
  method: string;
  postData?: any;
}

// variables
const auth = {
  username: 'username',
  password: 'password',
};

const createAuth = base64.encode(`${auth.username}:${auth.password}`);

/**
 * Generates the base URL for API requests.
 *
 * @return {string} The base URL for API requests.
 */
const buildUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
};

/**
 * Parses a JSON string into a JavaScript object.
 *
 * @param {string} value - The JSON string to be parsed.
 * @return {any} The parsed JavaScript object.
 */
const parseResults = (value: string): any => {
  return JSON.parse(value);
};

/**
 * This function makes a request to the API and returns the response.
 *
 * @param {IRequest} parameters - The parameters for the request.
 * @return {Promise<IResponse>} The response from the API.
 */
const getResponse = async (parameters: IRequest): Promise<IResponse> => {
  let response: AxiosResponse<any, any>;

  const url = `${buildUrl()}${parameters.url}`;

  const headers = { Authorization: `Basic ${createAuth}` };

  try {
    const config = {
      headers,
      timeout: 15000,
    };

    const axiosMethodMap: Record<string, () => Promise<any>> = {
      GET: () => axios.get(url, config),
      POST: () => axios.post(url, parameters.postData, config),
      PUT: () => axios.put(url, parameters.postData, config),
      DELETE: () => axios.delete(url, config),
      PATCH: () => axios.patch(url, parameters.postData, config),
    };

    const method = parameters.method?.toUpperCase();

    if (!method || !(method in axiosMethodMap)) {
      throw new Error(`Unsupported HTTP method: ${method}`);
    }

    response = await axiosMethodMap[method]();

    const d: IResponse = {
      data: response.data,
      status: response.status,
    };

    return d;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;

      const responseText: string = err.request?.responseText;

      let parsedResults;

      if (responseText !== "") {
        parsedResults = parseResults(responseText);
      } else {
        parsedResults = { title: err.message };
      }

      const d: IResponse = {
        data: parsedResults,
        status: err.response?.status,
      };

      return d;
    }

    const err = error as Error;

    const d: IResponse = {
      data: {
        title: err.message,
      },
      status: 0,
    };

    return d;
  }
};

const Request = {
  getResponse,
};

export default Request;
