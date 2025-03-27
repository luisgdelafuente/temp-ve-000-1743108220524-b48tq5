import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { getPublicUrl } from './lib/storage';
import { Play, Building2, Film, Video, Gift, Newspaper, Presentation, Book, ArrowRight, Clapperboard } from 'lucide-react';
import { ContactModal } from './components/ContactModal';
import { getGlossaryTerms, type GlossaryTerm } from './lib/supabase';

function App() {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGlossaryTerms = async () => {
      try {
        console.log('Loading glossary terms...');
        const data = await getGlossaryTerms();
        console.log('Raw glossary terms:', data);
        
        // Filter for published terms and limit to 6
        const filteredTerms = data
          .filter(term => term.status === 'published')
          .slice(0, 6);
        
        console.log('Filtered glossary terms:', filteredTerms);
        setGlossaryTerms(filteredTerms);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar los términos del glosario';
        console.error('Error in loadGlossaryTerms:', err);
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadGlossaryTerms();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        {/* Open Graph Tags */}
        <meta property="og:title" content="Empresas de Video Marketing y Producción Audiovisual" />
        <meta property="og:description" content="Video Empresas, lugar de encuentro para agencias de video, producción de videos corporativos y negocios que buscan potenciar su estrategia audiovisual." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://videoempresas.com" />
        <meta property="og:image" content="/images/logos/logovideoempresas1200.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Video Empresas - Directorio de Marketing en Video" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:site_name" content="Video Empresas" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Empresas de Video Marketing y Producción Audiovisual" />
        <meta name="twitter:description" content="Video Empresas, lugar de encuentro para agencias de video, producción de videos corporativos y negocios que buscan potenciar su estrategia audiovisual." />
        <meta name="twitter:image" content={getPublicUrl('logos/logovideoempresas1200.png')} />
        <meta name="twitter:site" content="@videoempresases" />
      </Helmet>
      <div className="min-h-screen bg-gray-900 mx-auto max-w-[100rem]">
        {/* Floating Background Icons */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-12 -left-12 animate-float-slow opacity-30">
            <Video className="w-24 h-24 sm:w-32 sm:h-32 text-blue-500 transform -rotate-12" />
          </div>
          
          <div className="absolute top-1/2 -right-16 -translate-y-1/2 animate-float-medium opacity-30">
            <Film className="w-24 h-24 sm:w-32 sm:h-32 text-purple-500 transform rotate-12" />
          </div>
          
          <div className="absolute -bottom-12 -left-16 animate-float-fast opacity-30">
            <Clapperboard className="w-24 h-24 sm:w-32 sm:h-32 text-pink-500 transform -rotate-6" />
          </div>
          
          <div className="absolute top-1/4 right-1/4 animate-float-slow opacity-20">
            <Video className="w-16 h-16 text-blue-400 transform rotate-45" />
          </div>
          
          <div className="absolute bottom-1/3 left-1/3 animate-float-medium opacity-20">
            <Film className="w-16 h-16 text-purple-400 transform -rotate-12" />
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-12 sm:pt-16 md:pt-20 pb-24 px-4 relative overflow-hidden">
          <div className="container mx-auto relative">
            <div className="text-center">
              <div className="flex items-center justify-center mb-8 relative z-10">
                <img
                  src={getPublicUrl('logos/logovideoempresas.webp')}
                  width="160"
                  height="40"
                  alt="Logo de Video Empresas"
                  title="logo de video empresas"
                  className="h-12 sm:h-16 md:h-14 lg:h-16 w-auto object-contain"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-sky-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-8 pb-4 mx-auto w-full md:w-[90%] mt-8 sm:mt-10 md:mt-12">
                <span className="leading-[1.2]">{t('hero.title')}</span>
              </h1>
              <h2 className="mt-6 mb-2 sm:mb-4 text-lg sm:text-xl md:text-2xl text-gray-300 w-[98%] sm:w-[95%] mx-auto px-2 leading-relaxed">
                {t('hero.subtitle')}
              </h2>
            </div>

            {/* Features */}
            <div className="mt-12 md:mt-24 grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-gray-700">
                <div className="h-12 w-12 bg-blue-900/50 rounded-xl flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{t('features.creators.title')}</h3>
                <p className="mt-2 text-gray-300">{t('features.creators.desc')}</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-gray-700">
                <div className="h-12 w-12 bg-purple-900/50 rounded-xl flex items-center justify-center">
                  <Gift className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{t('features.hub.title')}</h3>
                <p className="mt-2 text-gray-300">{t('features.hub.desc')}</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-gray-700">
                <div className="h-12 w-12 bg-pink-900/50 rounded-xl flex items-center justify-center">
                  <Newspaper className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{t('features.analytics.title')}</h3>
                <p className="mt-2 text-gray-300">{t('features.analytics.desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Marketing Terms Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
              Términos Clave en Video Marketing
            </h2>
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              Comprende los conceptos fundamentales que impulsan el éxito en el marketing de video
            </p>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-400 py-8">
                <p>Error al cargar los términos del glosario: {error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {glossaryTerms.map((term) => (
                  <Link
                    key={term.id}
                    to={`/glosario/${term.slug}/`}
                    className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-all group block"
                  >
                    <div>
                      <div className="h-10 w-10 bg-indigo-900/50 rounded-lg flex items-center justify-center mb-4">
                        <Book className="h-5 w-5 text-indigo-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{term.title}</h3>
                      <p className="text-gray-300">{term.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/glosario/"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Ver todos los términos del glosario</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
      
      {/* White Section - Full Width */}
      <div className="w-full bg-white">
        <section className="py-24 px-4 max-w-[100rem] mx-auto">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {t('cta.title')}
            </h2>
            <h2 className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed font-medium">
              {t('cta.subtitle')}
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-8 inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              {t('cta.button')}
            </button>
          </div>
        </section>
      </div>

      {/* Footer - Full Width */}
      <div className="w-full bg-gray-900 border-t border-gray-800">
        <footer className="py-6 px-4 max-w-[100rem] mx-auto">
          <div className="flex justify-center items-center gap-2">
            <span className="text-gray-400 text-sm">©</span>
            <span className="text-gray-400 text-sm">2025</span>
            <a
              href="https://epicaworks.com"
              className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Epica Works
            </a>
            <span className="text-gray-400 text-sm">|</span>
            <Link to="/nosotros/" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
              Nosotros
            </Link>
          </div>
        </footer>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default App;