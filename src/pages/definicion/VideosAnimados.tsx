import { Helmet } from 'react-helmet-async';
import { Sparkles } from 'lucide-react';

export default function VideosAnimados() {
  return (
    <>
      <Helmet>
        <title>Videos Animados - Definición y Tipos - Video Empresas</title>
        <meta name="description" content="Descubre los diferentes tipos de videos animados, sus beneficios y cómo utilizarlos efectivamente en tu estrategia de marketing." />
      </Helmet>

      <article className="max-w-3xl mx-auto prose prose-invert">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-white m-0">Videos Animados</h1>
        </div>

        <div className="text-gray-300">
          <p className="lead">
            Los videos animados son una forma versátil y atractiva de comunicar mensajes complejos de manera simple y memorable, combinando movimiento, narración y diseño visual.
          </p>

          <h2>Tipos de Videos Animados</h2>
          <ul>
            <li>Animación 2D tradicional</li>
            <li>Motion graphics</li>
            <li>Animación 3D</li>
            <li>Stop motion</li>
            <li>Animación tipográfica</li>
          </ul>

          <h2>Ventajas de los Videos Animados</h2>
          <ul>
            <li>Explicación clara de conceptos complejos</li>
            <li>Mayor retención del mensaje</li>
            <li>Flexibilidad creativa</li>
            <li>Costos controlables</li>
            <li>Fácil actualización</li>
          </ul>

          <h2>Proceso de Creación</h2>
          <ol>
            <li>
              <strong>Guión y storyboard</strong>
              <p>Desarrollo del concepto y planificación visual.</p>
            </li>
            <li>
              <strong>Diseño de assets</strong>
              <p>Creación de elementos visuales y personajes.</p>
            </li>
            <li>
              <strong>Animación</strong>
              <p>Dar vida a los elementos mediante movimiento.</p>
            </li>
            <li>
              <strong>Sonido y música</strong>
              <p>Incorporación de elementos auditivos.</p>
            </li>
          </ol>

          <div className="bg-purple-900/20 border border-purple-800 rounded-lg p-6 my-8">
            <h3 className="text-purple-400 mb-4">Consejo Profesional</h3>
            <p className="m-0">
              La simplicidad es clave en la animación. No sobrecargues tu video con demasiados elementos o movimientos. Un mensaje claro con animación limpia es más efectivo que uno visualmente complejo.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}