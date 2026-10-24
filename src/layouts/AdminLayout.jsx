import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('pff_admin_demo')) {
      navigate('/admin');
    }
  }, [navigate]);

  return <Outlet />;
}
