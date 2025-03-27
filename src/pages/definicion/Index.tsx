import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { getGlossaryTerms, type GlossaryTerm } from '../../lib/supabase';

export default function DefinicionIndex() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTerms = async () => {
      try {
        const data = await getGlossaryTerms();
        setTerms(data.filter(term => term.status === 'published'));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading terms');
      } finally {
        setLoading(false);
      }
    };

    loadTerms();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 py-8">
        <p>Error loading glossary terms: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Glosario de Video Marketing - Video Empresas</title>
        <meta name="description" content="Glosario completo de términos y métricas esenciales en video marketing. Aprende sobre tasas de conversión, engagement, SEO y más." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">Glosario de Video Marketing</h1>
        <p className="text-gray-300 mb-12">
          Explora nuestro glosario completo de términos y métricas esenciales en video marketing. 
          Cada definición incluye ejemplos prácticos y consejos de implementación.
        </p>

        <div className="grid gap-6">
          {terms.map((term) => (
            <Link
              key={term.slug}
              to={`/glosario/${term.slug}/`}
              className={`bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-${term.color}-500 transition-all group`}
            >
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">{term.title}</h2>
                <p className="text-gray-300">{term.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}