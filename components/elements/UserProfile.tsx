import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';

/**
 * UserProfile component that displays user information when authenticated
 * or a login button when not authenticated
 */
const UserProfile = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="user-profile-container">
        <p>Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <div className="user-profile-header">
        <h3>User Profile</h3>
        <button 
          className="btn btn-outline-danger btn-sm" 
          onClick={logout}
        >
          Logout
        </button>
      </div>
      
      <div className="user-profile-details">
        <div className="profile-item">
          <span className="profile-label">ID:</span>
          <span className="profile-value">{user.id}</span>
        </div>
        
        <div className="profile-item">
          <span className="profile-label">Email:</span>
          <span className="profile-value">{user.email}</span>
        </div>
        
        {user.firstName && (
          <div className="profile-item">
            <span className="profile-label">First Name:</span>
            <span className="profile-value">{user.firstName}</span>
          </div>
        )}
        
        {user.lastName && (
          <div className="profile-item">
            <span className="profile-label">Last Name:</span>
            <span className="profile-value">{user.lastName}</span>
          </div>
        )}
        
        <div className="profile-item">
          <span className="profile-label">Status:</span>
          <span className="profile-value">
            {user.status ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 