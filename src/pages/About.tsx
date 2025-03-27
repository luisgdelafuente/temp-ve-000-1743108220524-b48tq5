import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function About() {
  return (
    <>
      <Helmet>
        <title>Nosotros - Video Empresas</title>
        <meta name="description" content="Conoce más sobre Video Empresas, tu directorio especializado en video marketing" />
        {/* Primary Open Graph Tags */}
        <meta property="og:title" content="Nosotros - Video Empresas" />
        <meta property="og:description" content="Conoce más sobre Video Empresas, tu directorio especializado en video marketing" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://videoempresas.com/nosotros" />
        <meta property="og:image" content="https://epicaworks.com/public_html/wp-content/images/vecomlogo1200.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Video Empresas - Directorio de Marketing en Video" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:site_name" content="Video Empresas" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nosotros - Video Empresas" />
        <meta name="twitter:description" content="Conoce más sobre Video Empresas, tu directorio especializado en video marketing" />
        <meta name="twitter:site" content="@videoempresases" />
        {/* Additional WhatsApp Optimization */}
        <meta property="og:title:alt" content="Video Empresas - Directorio de Marketing en Video" />
        <meta property="og:see_also" content="https://epicaworks.com" />
      </Helmet>
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <Link to="/" className="inline-block">
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
            </Link>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-8 mt-12">
              Sobre nosotros
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-8 text-gray-300">
            <p className="text-lg leading-relaxed">
              Video Empresas es un directorio especializado en el mundo del video marketing. 
              Aquí encontrarás una selección de empresas líderes en la industria, plataformas 
              de inteligencia artificial para la creación de videos, noticias y artículos de 
              actualidad, además de ofertas especiales y recursos exclusivos para potenciar 
              tu estrategia audiovisual.
            </p>

            <p className="text-lg leading-relaxed">
              En el pasado, Video Empresas operaba como una agencia de video marketing. 
              Sin embargo, esa labor ahora la desempeña Epicaworks, dedicada a realizar 
              vídeos "short-form" y campañas en YouTube Shorts.
            </p>

            <p className="text-lg leading-relaxed">
              Si necesitas más información o servicios de video marketing, no dudes en 
              contactarnos a través de{' '}
              <a 
                href="https://epicaworks.com" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Epicaworks.com
              </a>.
            </p>
          </div>

          <div className="text-center mt-16">
            <Link
              to="/"
              className="inline-block bg-gray-800 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;