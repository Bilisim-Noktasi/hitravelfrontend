import { deleteCookie } from 'cookies-next';
import { handleLogout as logoutAction } from '../redux/authSlice';
import { AppDispatch } from '../redux/store';

/**
 * Logs out the user by removing the auth token and dispatching the logout action
 * @param dispatch - Redux dispatch function
 * @param callback - Optional callback function to execute after logout
 */
export const logout = (
  dispatch: AppDispatch, 
  callback?: () => void
): void => {
  // Remove the auth token from cookies
  deleteCookie('next-auth.session-token');
  
  // Dispatch the logout action to update the Redux store
  dispatch(logoutAction());
  
  // Execute the callback if provided
  if (callback) {
    callback();
  }
};

/**
 * Checks if the user is authenticated based on the presence of a token
 * Note: This is a simple check and doesn't validate if the token is actually valid
 * @returns boolean indicating if the user has an auth token
 */
export const isAuthenticated = (): boolean => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return false;
  }
  
  // Check for the auth token in cookies
  const cookies = document.cookie.split(';');
  return cookies.some(cookie => 
    cookie.trim().startsWith('next-auth.session-token=')
  );
}; 