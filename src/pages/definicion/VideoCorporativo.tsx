import { Helmet } from 'react-helmet-async';
import { Building } from 'lucide-react';

export default function VideoCorporativo() {
  return (
    <>
      <Helmet>
        <title>Video Corporativo - Definición y Mejores Prácticas - Video Empresas</title>
        <meta name="description" content="Aprende todo sobre videos corporativos: tipos, beneficios, proceso de producción y mejores prácticas para tu empresa." />
      </Helmet>

      <article className="max-w-3xl mx-auto prose prose-invert">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 bg-blue-900/30 rounded-lg flex items-center justify-center">
            <Building className="h-6 w-6 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white m-0">Video Corporativo</h1>
        </div>

        <div className="text-gray-300">
          <p className="lead">
            El video corporativo es una herramienta de comunicación audiovisual diseñada para presentar la identidad, valores y mensajes clave de una empresa de manera profesional y efectiva.
          </p>

          <h2>¿Qué es un Video Corporativo?</h2>
          <p>
            Un video corporativo es una producción audiovisual profesional que representa la imagen y mensaje de una empresa. Puede servir para múltiples propósitos:
          </p>
          <ul>
            <li>Presentación de la empresa</li>
            <li>Comunicación interna</li>
            <li>Formación de empleados</li>
            <li>Marketing y ventas</li>
            <li>Relaciones públicas</li>
          </ul>

          <h2>Tipos de Videos Corporativos</h2>
          <ul>
            <li>Videos institucionales</li>
            <li>Videos de producto o servicio</li>
            <li>Videos de formación</li>
            <li>Videos de cultura empresarial</li>
            <li>Videos de responsabilidad social</li>
          </ul>

          <h2>Elementos Clave</h2>
          <ol>
            <li>
              <strong>Mensaje claro y conciso</strong>
              <p>Define el objetivo principal y mantén un mensaje coherente.</p>
            </li>
            <li>
              <strong>Calidad profesional</strong>
              <p>Invierte en producción de alta calidad que refleje la profesionalidad de tu empresa.</p>
            </li>
            <li>
              <strong>Identidad de marca</strong>
              <p>Mantén consistencia con los elementos visuales y el tono de tu marca.</p>
            </li>
          </ol>

          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-6 my-8">
            <h3 className="text-blue-400 mb-4">Consejo Profesional</h3>
            <p className="m-0">
              Un video corporativo efectivo debe encontrar el equilibrio entre profesionalidad y autenticidad. No temas mostrar el lado humano de tu empresa mientras mantienes un tono profesional.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}