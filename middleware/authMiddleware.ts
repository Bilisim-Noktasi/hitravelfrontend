import { getCookie, deleteCookie } from 'cookies-next';
import { getGuardRequest } from '../service/requestService';
import { setCredentials, handleLogout } from '../redux/authSlice';
import { AppDispatch } from '../redux/store';

/**
 * Initializes authentication by checking for an existing token
 * and fetching user data if the token exists
 * @param dispatch - Redux dispatch function
 */
export const initializeAuth = async (dispatch: AppDispatch): Promise<void> => {
  try {
    // Check if token exists in cookies
    const token = getCookie('next-auth.session-token');
    
    if (!token) {
      // No token found, ensure user is logged out in Redux
      dispatch(handleLogout());
      return;
    }
    
    // If token exists, fetch user data
    try {
      const userResponse = await getGuardRequest({
        controller: 'Users',
        action: 'GetFromAuth',
      });
      
      // Set user credentials in Redux store
      dispatch(setCredentials({
        user: userResponse,
        token: token.toString(),
      }));
    } catch (error) {
      console.error('Error fetching user data:', error);
      
      // If we get an error (like 401), the token is likely invalid
      // Remove the token and log the user out
      deleteCookie('next-auth.session-token');
      dispatch(handleLogout());
    }
  } catch (error) {
    console.error('Error initializing authentication:', error);
    // Ensure user is logged out in case of any errors
    dispatch(handleLogout());
  }
};

export default initializeAuth; 