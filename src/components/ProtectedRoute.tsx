import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthChange } from '../lib/supabase';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = onAuthChange((session) => {
      if (!session && initialized) {
        navigate('/admin/login');
      }
      setLoading(false);
      setInitialized(true);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [navigate, initialized]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
}