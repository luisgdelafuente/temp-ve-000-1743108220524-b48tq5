/*
  # Create glossary collection
  
  1. New Tables
    - `glossary`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `title` (text)
      - `description` (text)
      - `content` (text)
      - `icon` (text)
      - `color` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `published_at` (timestamp)
      - `status` (text)
      - `seo_title` (text)
      - `seo_description` (text)

  2. Security
    - Enable RLS on `glossary` table
    - Add policies for public read access
    - Add policies for authenticated users to manage terms
*/

-- Create glossary table
CREATE TABLE IF NOT EXISTS glossary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  icon text NOT NULL,
  color text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz,
  status text NOT NULL DEFAULT 'draft',
  seo_title text,
  seo_description text
);

-- Enable RLS
ALTER TABLE glossary ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" 
  ON glossary
  FOR SELECT 
  TO PUBLIC
  USING (status = 'published');

CREATE POLICY "Allow authenticated users full access" 
  ON glossary
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial terms
INSERT INTO glossary (
  slug,
  title,
  description,
  content,
  icon,
  color,
  status,
  published_at,
  seo_title,
  seo_description
) VALUES
(
  'tasa-de-conversion',
  'Tasa de Conversión',
  'Porcentaje de espectadores que realizan la acción deseada después de ver tu video.',
  '<p class="lead">La tasa de conversión es una métrica fundamental que mide el porcentaje de espectadores que realizan una acción específica después de ver tu video.</p><h2>¿Qué es la Tasa de Conversión?</h2><p>En el contexto del video marketing, la tasa de conversión representa el porcentaje de personas que completan una acción deseada después de ver tu video. Estas acciones pueden incluir:</p><ul><li>Realizar una compra</li><li>Suscribirse a un newsletter</li><li>Registrarse para una prueba gratuita</li><li>Descargar un recurso</li><li>Contactar con ventas</li></ul>',
  'BarChart2',
  'blue',
  'published',
  now(),
  'Tasa de Conversión en Video Marketing - Video Empresas',
  'Aprende todo sobre la tasa de conversión en video marketing: cómo calcularla, mejorarla y utilizarla para optimizar tus campañas.'
),
(
  'tasa-de-engagement',
  'Tasa de Engagement',
  'Medida de interacción del espectador con tu contenido de video.',
  '<p class="lead">La tasa de engagement es una métrica crucial que mide el nivel de interacción y conexión que los espectadores tienen con tu contenido de video.</p><h2>¿Qué es la Tasa de Engagement?</h2><p>La tasa de engagement en video marketing representa el nivel de interacción que los usuarios tienen con tu contenido. Esta métrica va más allá de las simples visualizaciones, midiendo acciones como:</p><ul><li>Likes y reacciones</li><li>Comentarios y respuestas</li><li>Compartidos</li><li>Tiempo de visualización</li><li>Clics en elementos interactivos</li></ul>',
  'Heart',
  'purple',
  'published',
  now(),
  'Tasa de Engagement en Video Marketing - Video Empresas',
  'Descubre cómo medir y mejorar la tasa de engagement en tus videos: métricas clave, estrategias y mejores prácticas.'
),
(
  'tasa-de-rebote',
  'Tasa de Rebote',
  'Porcentaje de visitantes que abandonan tu video en los primeros segundos.',
  '<p class="lead">La tasa de rebote en video marketing mide el porcentaje de espectadores que abandonan tu video en los primeros segundos, un indicador crucial de la efectividad de tu contenido.</p><h2>Comprendiendo la Tasa de Rebote</h2><p>La tasa de rebote es un indicador importante que señala problemas potenciales en tu contenido de video, incluyendo:</p><ul><li>Desajuste entre contenido y expectativas</li><li>Problemas técnicos de reproducción</li><li>Falta de engagement inicial</li><li>Contenido irrelevante para la audiencia</li></ul>',
  'ArrowLeft',
  'red',
  'published',
  now(),
  'Tasa de Rebote en Video Marketing - Video Empresas',
  'Comprende y optimiza la tasa de rebote en tus videos: causas comunes, soluciones y estrategias de retención.'
),
(
  'call-to-action',
  'Call-to-Action (CTA)',
  'Elemento que guía al espectador hacia la acción deseada.',
  '<p class="lead">Un Call-to-Action (CTA) efectivo es el puente entre el contenido de tu video y la acción que deseas que tome tu audiencia.</p><h2>Elementos de un CTA Efectivo</h2><ul><li>Claridad en la acción requerida</li><li>Urgencia o incentivo para actuar</li><li>Beneficio claro para el usuario</li><li>Ubicación estratégica en el video</li><li>Diseño visual atractivo</li></ul>',
  'MousePointerClick',
  'green',
  'published',
  now(),
  'Call-to-Action (CTA) en Video Marketing - Video Empresas',
  'Aprende a crear CTAs efectivos en tus videos: tipos, mejores prácticas y estrategias de implementación.'
),
(
  'video-seo',
  'Video SEO',
  'Optimización de videos para mejorar su visibilidad en buscadores.',
  '<p class="lead">El Video SEO es el proceso de optimizar tu contenido de video para maximizar su visibilidad en motores de búsqueda y plataformas de video.</p><h2>Elementos Clave del Video SEO</h2><ul><li>Títulos optimizados</li><li>Descripciones detalladas</li><li>Tags y palabras clave relevantes</li><li>Miniaturas personalizadas</li><li>Transcripciones y subtítulos</li></ul>',
  'Search',
  'yellow',
  'published',
  now(),
  'Video SEO - Optimización para Motores de Búsqueda - Video Empresas',
  'Guía completa de Video SEO: optimización de títulos, descripciones, miniaturas y más para maximizar la visibilidad de tus videos.'
),
(
  'video-corporativo',
  'Video Corporativo',
  'Herramienta audiovisual para presentar la identidad y valores de una empresa.',
  '<p class="lead">El video corporativo es una herramienta de comunicación audiovisual diseñada para presentar la identidad, valores y mensajes clave de una empresa.</p><h2>Tipos de Videos Corporativos</h2><ul><li>Videos institucionales</li><li>Videos de producto o servicio</li><li>Videos de formación</li><li>Videos de cultura empresarial</li><li>Videos de responsabilidad social</li></ul>',
  'Building',
  'blue',
  'published',
  now(),
  'Video Corporativo - Definición y Mejores Prácticas - Video Empresas',
  'Aprende todo sobre videos corporativos: tipos, beneficios, proceso de producción y mejores prácticas para tu empresa.'
),
(
  'videos-animados',
  'Videos Animados',
  'Contenido que utiliza animación para comunicar mensajes de forma atractiva.',
  '<p class="lead">Los videos animados son una forma versátil y atractiva de comunicar mensajes complejos de manera simple y memorable.</p><h2>Tipos de Videos Animados</h2><ul><li>Animación 2D tradicional</li><li>Motion graphics</li><li>Animación 3D</li><li>Stop motion</li><li>Animación tipográfica</li></ul>',
  'Sparkles',
  'purple',
  'published',
  now(),
  'Videos Animados - Definición y Tipos - Video Empresas',
  'Descubre los diferentes tipos de videos animados, sus beneficios y cómo utilizarlos efectivamente en tu estrategia de marketing.'
),
(
  'videos-whiteboard',
  'Videos Whiteboard',
  'Técnica que simula dibujos en pizarra para explicaciones visuales.',
  '<p class="lead">Los videos whiteboard son una técnica de animación que simula el dibujo a mano sobre una pizarra blanca, combinando narración visual con explicación verbal.</p><h2>Características Principales</h2><ul><li>Dibujos simples y claros</li><li>Narración sincronizada</li><li>Progresión visual fluida</li><li>Estilo minimalista</li><li>Enfoque en la historia</li></ul>',
  'PenTool',
  'gray',
  'published',
  now(),
  'Videos Whiteboard - Definición y Usos - Video Empresas',
  'Explora los videos whiteboard: qué son, cómo funcionan y cómo pueden mejorar tu comunicación empresarial.'
),
(
  'tasa-de-retencion',
  'Tasa de Retención',
  'Medida del tiempo que los espectadores permanecen viendo el video.',
  '<p class="lead">La tasa de retención es una métrica crucial que mide cuánto tiempo los espectadores permanecen viendo tu video.</p><h2>Factores que Afectan la Retención</h2><ul><li>Calidad del contenido inicial</li><li>Duración del video</li><li>Ritmo y estructura</li><li>Relevancia para la audiencia</li><li>Calidad técnica</li></ul>',
  'Timer',
  'green',
  'published',
  now(),
  'Tasa de Retención - Métricas de Video Marketing - Video Empresas',
  'Comprende la tasa de retención en videos: qué es, cómo medirla y estrategias para mejorarla.'
);