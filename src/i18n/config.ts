import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    debug: false,
    lng: 'es',
    interpolation: {
      escapeValue: false
    },
    resources: {
      es: {
        translation: {
          'meta.title': 'Empresas de Video Marketing y Producción Audiovisual',
          'meta.description': 'Punto de encuentro para agencias de video marketing, producción de videos corporativos y negocios que buscan potenciar su estrategia audiovisual.',
          'nav.about': 'Sobre Nosotros',
          'nav.features': 'Características',
          'nav.contact': 'Contacto',
          'nav.getStarted': 'Comenzar',
          'hero.title': 'Empresas de Video Marketing y Producción Audiovisual',
          'hero.subtitle': 'Directorio en construcción con las mejores agencias, profesionales y plataformas. La herramienta definitiva para la excelencia creativa de tu negocio.',
          'features.creators.title': 'Directorio de Agencias',
          'features.creators.desc': 'Conecta con las plataformas IA y agencias que están transformando la industria del vídeo.',
          'features.hub.title': 'Ofertas para Empresas',
          'features.hub.desc': 'Accede a descuentos exclusivos y promociones en herramientas y servicios para potenciar tu estrategia de video marketing.',
          'features.analytics.title': 'Leads y Oportunidades',
          'features.analytics.desc': 'Conectamos a agencias de video marketing con negocios que buscan sus servicios.',
          'cta.title': 'Colaborar con Video Empresas',
          'cta.subtitle': 'Contáctanos para formar parte del proyecto con tu negocio, o con cualquier tipo de colaboración para seguir impulsando el video marketing juntos 🚀',
          'cta.button': 'CONTACTAR',
          'footer.rights': '© 2025 Epica Works.',
          'footer.about': 'Nosotros',
        }
      }
    },
    fallbackLng: false
  });