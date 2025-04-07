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
        firstName: '',
        lastName: '',
        status: true,
      };
    }
    
    const userEmail = payload.email || 
                     payload.mail || 
                     payload.userEmail || 
                     payload.user_email || 
                     email ||
                     'Kullanıcı';
    
    return {
      id: payload.id || payload.sub || payload.userId || payload.user_id || '',
      email: userEmail,
      firstName: payload.given_name || payload.firstName || payload.first_name || '',
      lastName: payload.family_name || payload.lastName || payload.last_name || '',
      status: true,
    };
  };
  