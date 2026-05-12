export class ApiService {
  #baseUrl;
  #defaultHeaders;

  constructor(baseUrl = "", defaultHeaders = {}) {
    this.#baseUrl = baseUrl;
    this.#defaultHeaders = {
      "Content-Type": "application/json",
      ...defaultHeaders,
    };
  }

  #buildUrl(endpoint, params = {}) {
    const url = new URL(`${this.#baseUrl}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
    return url.toString();
  }

  async #request(method, endpoint, { params = {}, body, headers = {} } = {}) {
    const url = this.#buildUrl(endpoint, params);
    const options = {
      method,
      headers: { ...this.#defaultHeaders, ...headers },
    };

    if (body !== undefined) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(
        `HTTP ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`,
      );
    }

    return response.json();
  }

  get(endpoint, params = {}, headers = {}) {
    return this.#request("GET", endpoint, { params, headers });
  }

  post(endpoint, body, headers = {}) {
    return this.#request("POST", endpoint, { body, headers });
  }

  put(endpoint, body, headers = {}) {
    return this.#request("PUT", endpoint, { body, headers });
  }

  delete(endpoint, headers = {}) {
    return this.#request("DELETE", endpoint, { headers });
  }
}
