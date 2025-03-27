import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';

export default function VideoSEO() {
  return (
    <>
      <Helmet>
        <title>Video SEO - Optimización para Motores de Búsqueda - Video Empresas</title>
        <meta name="description" content="Guía completa de Video SEO: optimización de títulos, descripciones, miniaturas y más para maximizar la visibilidad de tus videos." />
      </Helmet>

      <article className="max-w-3xl mx-auto prose prose-invert">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 bg-yellow-900/30 rounded-lg flex items-center justify-center">
            <Search className="h-6 w-6 text-yellow-400" />
          </div>
          <h1 className="text-4xl font-bold text-white m-0">Video SEO: Optimización para Motores de Búsqueda</h1>
        </div>

        <div className="text-gray-300">
          <p className="lead">
            El Video SEO es el proceso de optimizar tu contenido de video para maximizar su visibilidad en motores de búsqueda y plataformas de video, aumentando su alcance orgánico.
          </p>

          <h2>Elementos Clave del Video SEO</h2>
          <ul>
            <li>Títulos optimizados</li>
            <li>Descripciones detalladas</li>
            <li>Tags y palabras clave relevantes</li>
            <li>Miniaturas personalizadas</li>
            <li>Transcripciones y subtítulos</li>
          </ul>

          <h2>Estrategias de Optimización</h2>
          <ol>
            <li>
              <strong>Investigación de palabras clave</strong>
              <p>Identifica términos relevantes que tu audiencia busca activamente.</p>
            </li>
            <li>
              <strong>Optimización de metadatos</strong>
              <p>Crea títulos y descripciones que incluyan palabras clave naturalmente.</p>
            </li>
            <li>
              <strong>Creación de miniaturas</strong>
              <p>Diseña miniaturas atractivas que aumenten los clics.</p>
            </li>
          </ol>

          <h2>Factores Técnicos</h2>
          <ul>
            <li>Velocidad de carga</li>
            <li>Responsividad móvil</li>
            <li>Estructura del sitemap</li>
            <li>Schema markup</li>
            <li>Optimización de archivos</li>
          </ul>

          <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-6 my-8">
            <h3 className="text-yellow-400 mb-4">Consejo Profesional</h3>
            <p className="m-0">
              El Video SEO es un proceso continuo. Monitorea regularmente el rendimiento de tus videos y ajusta tu estrategia basándote en los datos de análisis.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}