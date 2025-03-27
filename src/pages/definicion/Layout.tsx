import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Book, ArrowLeft } from 'lucide-react';

export default function DefinicionLayout() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            Inicio
          </Link>
          <span className="text-gray-600">/</span>
          <Link to="/glosario/" className="text-blue-400 hover:text-blue-300 transition-colors">
            Glosario
          </Link>
        </div>
        <Outlet />
        <div className="max-w-3xl mx-auto mt-16">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>
        </div>
      </div>
    </div>
  );
}