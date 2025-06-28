import { useAuth0 } from '@auth0/auth0-react';

export const AuthButtons = ({ className = '' }) => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div>
      {!isAuthenticated ? (
        <button className={className} onClick={() => loginWithRedirect()}>Login / Sign Up</button>
      ) : (
        <>
          <button className={className} onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </>
      )}
    </div>
  );
}; 