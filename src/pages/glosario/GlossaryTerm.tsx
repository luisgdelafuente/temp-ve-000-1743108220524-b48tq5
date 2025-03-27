import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Book } from 'lucide-react';
import { getGlossaryTermBySlug, type GlossaryTerm } from '../../lib/supabase'; 

export default function GlossaryTerm() {
  const { slug } = useParams<{ slug: string }>();
  const [term, setTerm] = useState<GlossaryTerm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTerm = async () => {
      if (!slug) return;
      
      try {
        const data = await getGlossaryTermBySlug(slug);
        setTerm(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading term');
      } finally {
        setLoading(false);
      }
    };

    loadTerm();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !term) {
    return (
      <div className="text-center text-red-400 py-8">
        <p>Error: {error || 'Term not found'}</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{term.seo_title || `${term.title} - Video Empresas`}</title>
        <meta name="description" content={term.seo_description || term.description} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": term.title,
            "description": term.description,
            "datePublished": term.published_at,
            "dateModified": term.updated_at,
            "author": {
              "@type": "Organization",
              "name": "Video Empresas",
              "url": "https://videoempresas.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Video Empresas",
              "url": "https://videoempresas.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://epicaworks.com/public_html/wp-content/images/logovideoempresas.webp"
              }
            },
            "inLanguage": "es",
            "articleSection": "Glosario",
            "keywords": "video marketing, términos de video, glosario audiovisual"
          })}
        </script>
      </Helmet>

      <article className="max-w-3xl mx-auto prose prose-invert">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 bg-indigo-900/50 rounded-xl flex items-center justify-center shrink-0">
            <Book className="h-6 w-6 text-indigo-400" />
          </div>
          <div className="h-[1px] bg-gradient-to-r from-indigo-500/50 to-transparent flex-1" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-8">{term.title}</h1>

        <div 
          className="text-gray-300"
          dangerouslySetInnerHTML={{ __html: term.content }}
        />
      </article>
    </>
  );
}