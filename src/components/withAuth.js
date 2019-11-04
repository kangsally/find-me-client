import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { postToken } from '../api';

function withAuth(ComponentToProtect) {
  return function({ history }) {
    const [loading, setLoading] = useState(true);
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    useEffect(() => {
      const checkToken = async () => {
        try {
          const response = postToken();
          if (response.status === 200 && isLoggedIn.check) {
            setLoading(false);
          } else {
            throw new Error('not LoggedIn');
          }
        } catch {
          history.push('/login');
        }
      };
      checkToken();
    }, []);

    if (loading) {
      return null;
    }
    return (
      <>
        <ComponentToProtect />
      </>
    );
  };
}

export default withAuth;
