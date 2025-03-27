import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState, useMemo } from 'react';
import { Book } from 'lucide-react';
import { getGlossaryTerms, type GlossaryTerm } from '../../lib/supabase';

type AlphabetIndex = {
  [key: string]: GlossaryTerm[];
};

export default function GlossaryIndex() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const alphabetIndex = useMemo(() => {
    const index: AlphabetIndex = {};
    terms
      .filter(term => term.status === 'published')
      .forEach(term => {
        const firstLetter = term.title.charAt(0).toUpperCase();
        if (!index[firstLetter]) {
          index[firstLetter] = [];
        }
        index[firstLetter].push(term);
      });
    return index;
  }, [terms]);

  const availableLetters = useMemo(() => 
    Object.keys(alphabetIndex).sort()
  , [alphabetIndex]);

  useEffect(() => {
    const loadTerms = async () => {
      try {
        const data = await getGlossaryTerms();
        setTerms(data);
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
  
  const filteredTerms = selectedLetter 
    ? alphabetIndex[selectedLetter] || []
    : terms.filter(term => term.status === 'published');

  return (
    <>
      <Helmet>
        <title>Glosario de Video Marketing - Video Empresas</title>
        <meta name="description" content="Glosario completo de términos y métricas esenciales en video marketing. Aprende sobre tasas de conversión, engagement, SEO y más." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": terms.map((term, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "TechArticle",
                "headline": term.title,
                "description": term.description,
                "url": `https://videoempresas.com/glosario/${term.slug}/`,
                "datePublished": term.published_at,
                "dateModified": term.updated_at,
                "author": {
                  "@type": "Organization",
                  "name": "Video Empresas",
                  "url": "https://videoempresas.com"
                }
              }
            })),
            "numberOfItems": terms.length,
            "itemListOrder": "Unordered",
            "name": "Glosario de Video Marketing",
            "description": "Términos y conceptos esenciales en video marketing y producción audiovisual"
          })}
        </script>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">Glosario de Video Marketing</h1>
        <p className="text-gray-300 mb-12">
          Explora nuestro glosario completo de términos y métricas esenciales en video marketing. 
          Cada definición incluye ejemplos prácticos y consejos de implementación.
        </p>

        {/* Alphabet Index */}
        <div className="mb-8 flex flex-wrap gap-2">
          {availableLetters.map(letter => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter === selectedLetter ? null : letter)}
              className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                letter === selectedLetter
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {letter}
            </button>
          ))}
          {selectedLetter && (
            <button
              onClick={() => setSelectedLetter(null)}
              className="px-4 h-8 sm:h-10 flex items-center justify-center rounded-lg font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
            >
              Mostrar todos
            </button>
          )}
        </div>

        <div className="grid gap-6 mb-8">
          {filteredTerms.map((term) => (
            <Link
              key={term.slug}
              to={`/glosario/${term.slug}/`}
              className={`bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-${term.color}-500 transition-all group`}
            >
              <div>
                <div className="h-10 w-10 bg-indigo-900/50 rounded-lg flex items-center justify-center mb-4">
                  <Book className="h-5 w-5 text-indigo-400" />
                </div>
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