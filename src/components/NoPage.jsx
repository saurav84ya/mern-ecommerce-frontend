import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NoPage() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("/auth/login"); // React Router redirect
  // }, [navigate]);

  return (
    <div>
      Did not find the page.
    </div>
  );
}
