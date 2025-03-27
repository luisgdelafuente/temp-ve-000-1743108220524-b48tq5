import { Helmet } from 'react-helmet-async';
import { PenTool } from 'lucide-react';

export default function VideosWhiteboard() {
  return (
    <>
      <Helmet>
        <title>Videos Whiteboard - Definición y Usos - Video Empresas</title>
        <meta name="description" content="Explora los videos whiteboard: qué son, cómo funcionan y cómo pueden mejorar tu comunicación empresarial." />
      </Helmet>

      <article className="max-w-3xl mx-auto prose prose-invert">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 bg-gray-900/30 rounded-lg flex items-center justify-center">
            <PenTool className="h-6 w-6 text-gray-400" />
          </div>
          <h1 className="text-4xl font-bold text-white m-0">Videos Whiteboard</h1>
        </div>

        <div className="text-gray-300">
          <p className="lead">
            Los videos whiteboard son una técnica de animación que simula el dibujo a mano sobre una pizarra blanca, combinando narración visual con explicación verbal para crear contenido educativo y atractivo.
          </p>

          <h2>Características Principales</h2>
          <ul>
            <li>Dibujos simples y claros</li>
            <li>Narración sincronizada</li>
            <li>Progresión visual fluida</li>
            <li>Estilo minimalista</li>
            <li>Enfoque en la historia</li>
          </ul>

          <h2>Aplicaciones Comunes</h2>
          <ul>
            <li>Explicación de productos o servicios</li>
            <li>Tutoriales y formación</li>
            <li>Presentaciones empresariales</li>
            <li>Marketing educativo</li>
            <li>Storytelling corporativo</li>
          </ul>

          <h2>Elementos de un Video Whiteboard Efectivo</h2>
          <ol>
            <li>
              <strong>Guión claro y conciso</strong>
              <p>Historia bien estructurada que guía la narración visual.</p>
            </li>
            <li>
              <strong>Ilustraciones relevantes</strong>
              <p>Dibujos que complementan y refuerzan el mensaje.</p>
            </li>
            <li>
              <strong>Timing perfecto</strong>
              <p>Sincronización entre dibujos y narración.</p>
            </li>
          </ol>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 my-8">
            <h3 className="text-gray-300 mb-4">Consejo Profesional</h3>
            <p className="m-0">
              La simplicidad es tu aliada en los videos whiteboard. Mantén los dibujos sencillos y enfócate en contar una historia clara y convincente. No necesitas ser un artista experto; la claridad del mensaje es más importante que la complejidad del arte.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}