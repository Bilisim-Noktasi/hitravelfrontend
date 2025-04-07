export interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phoneNumber?: string;
    status?: boolean;
  }
  
  export const decodeToken = (token: string): any => {
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return null;
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  };
  
  export const extractUserFromToken = (token: string, email: string = ''): User => {
    const payload = decodeToken(token);
    return {
      id: payload?.id || payload?.sub,
      email: payload?.email || email,
      firstName: payload?.given_name || '',
      lastName: payload?.family_name || '',
      status: true,
    };
  };
  