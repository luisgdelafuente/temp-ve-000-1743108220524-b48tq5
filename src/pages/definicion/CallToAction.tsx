import { Helmet } from 'react-helmet-async';
import { MousePointerClick } from 'lucide-react';

export default function CallToAction() {
  return (
    <>
      <Helmet>
        <title>Call-to-Action (CTA) en Video Marketing - Video Empresas</title>
        <meta name="description" content="Aprende a crear CTAs efectivos en tus videos: tipos, mejores prácticas y estrategias de implementación." />
      </Helmet>

      <article className="max-w-3xl mx-auto prose prose-invert">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 bg-green-900/30 rounded-lg flex items-center justify-center">
            <MousePointerClick className="h-6 w-6 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-white m-0">Call-to-Action (CTA) en Video Marketing</h1>
        </div>

        <div className="text-gray-300">
          <p className="lead">
            Un Call-to-Action (CTA) efectivo es el puente entre el contenido de tu video y la acción que deseas que tome tu audiencia, siendo crucial para el éxito de tu estrategia de video marketing.
          </p>

          <h2>Tipos de CTAs en Video</h2>
          <ul>
            <li>CTAs verbales durante el video</li>
            <li>Botones y enlaces superpuestos</li>
            <li>Pantallas finales interactivas</li>
            <li>Tarjetas y anotaciones</li>
            <li>Enlaces en la descripción</li>
          </ul>

          <h2>Elementos de un CTA Efectivo</h2>
          <ul>
            <li>Claridad en la acción requerida</li>
            <li>Urgencia o incentivo para actuar</li>
            <li>Beneficio claro para el usuario</li>
            <li>Ubicación estratégica en el video</li>
            <li>Diseño visual atractivo</li>
          </ul>

          <h2>Mejores Prácticas</h2>
          <ol>
            <li>
              <strong>Sé específico y directo</strong>
              <p>Usa verbos de acción claros que indiquen exactamente qué hacer.</p>
            </li>
            <li>
              <strong>Crea urgencia</strong>
              <p>Incorpora elementos que motiven la acción inmediata.</p>
            </li>
            <li>
              <strong>Prueba diferentes ubicaciones</strong>
              <p>Experimenta con la colocación del CTA para encontrar el momento óptimo.</p>
            </li>
          </ol>

          <div className="bg-green-900/20 border border-green-800 rounded-lg p-6 my-8">
            <h3 className="text-green-400 mb-4">Consejo Profesional</h3>
            <p className="m-0">
              Un CTA efectivo debe sentirse como una extensión natural del contenido, no como una interrupción. Asegúrate de que tu llamada a la acción agregue valor a la experiencia del espectador.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}