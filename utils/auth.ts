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
      const decoded = JSON.parse(atob(base64));
      return decoded;
    } catch (error) {
      console.error('Token decode error:', error);
      return null;
    }
  };
  
  export const extractUserFromToken = (token: string, email: string = ''): User => {
    const payload = decodeToken(token);
    
    if (!payload) {
      return {
        id: '',
        email: email || 'Kullanıcı',
        status: true,
      };
    }
    
    const userEmail = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    const userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    
    return {
      id: userId,
      email: userEmail,
      status: true,
    };
  };
  