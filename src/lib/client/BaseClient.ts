export abstract class BaseService {
  async handleRequest<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, init);
    if (!response.ok) {
      let errorData: unknown;
      try {
        errorData = (await response.json()) as Partial<Error>;
      } catch {
        errorData = { message: response.statusText };
      }
      throw errorData;
    }
    return (await response.json()) as T;
  }
}
