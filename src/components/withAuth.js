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
          const response = await postToken();
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
    }, [isLoggedIn]);

    if (loading) {
      return <div>로딩</div>;
    }
    return (
      <>
        <ComponentToProtect />
      </>
    );
  };
}

export default withAuth;
