import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc,
  updateDoc,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp,
  type Firestore,
  enableIndexedDbPersistence,
} from "firebase/firestore";
import { 
  getAuth, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type Auth,
  type User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZZ-vtd7qNFuFWtcgJM6oW-UsAU835jEM",
  authDomain: "vecom-39f06.firebaseapp.com",
  projectId: "vecom-39f06",
  storageBucket: "vecom-39f06.firebasestorage.app",
  messagingSenderId: "269614606802",
  appId: "1:269614606802:web:5b75aefa92722ce7c6800b",
  measurementId: "G-BXHFYDY52C"
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);
let db = getFirestore(app);
let auth = getAuth(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support persistence.');
  }
});

// Auth functions
export const loginWithEmail = async (email: string, password: string) => {
  if (!auth) throw new Error("Firebase Auth not initialized");
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  if (!auth) throw new Error("Firebase Auth not initialized");
  return signOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  if (!auth) throw new Error("Firebase Auth not initialized");
  return onAuthStateChanged(auth, callback);
};

// Contact functions
export interface Contact {
  id?: string;
  type: string;
  name: string;
  email: string;
  message: string;
  createdAt: Timestamp;
  status: string;
}

export const addContact = async (contactData: Omit<Contact, 'createdAt' | 'status'>) => {
  if (!db) throw new Error("Firestore not initialized");
  try {
    const docRef = await addDoc(collection(db, "contacts"), {
      ...contactData,
      createdAt: Timestamp.now(),
      status: "new"
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding contact: ", error);
    throw error;
  }
};

export const getContacts = async (): Promise<Contact[]> => {
  if (!db) throw new Error("Firestore not initialized");
  if (!auth.currentUser) throw new Error("User not authenticated");
  
  try {
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Contact));
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw new Error(error instanceof Error ? error.message : "Error fetching contacts");
  }
};

export const updateContact = async (id: string, data: Partial<Contact>) => {
  if (!db) throw new Error("Firestore not initialized");
  if (!auth.currentUser) throw new Error("User not authenticated");
  
  try {
    const contactRef = doc(db, "contacts", id);
    await updateDoc(contactRef, data);
    const updatedDoc = await getDoc(contactRef);
    return { id: updatedDoc.id, ...updatedDoc.data() } as Contact;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};

// Glossary functions
export interface GlossaryTerm {
  id?: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  icon: string;
  color: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt: Timestamp;
  status: 'draft' | 'published' | 'archived';
  seo: {
    title: string;
    description: string;
  };
}

export const addGlossaryTerm = async (termData: Omit<GlossaryTerm, 'id' | 'createdAt' | 'updatedAt'>) => {
  if (!db) throw new Error("Firestore not initialized");
  if (!auth.currentUser) throw new Error("User not authenticated");

  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, "glossary"), {
      ...termData,
      createdAt: now,
      updatedAt: now
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding glossary term:", error);
    throw error;
  }
};

export const getGlossaryTerms = async (): Promise<GlossaryTerm[]> => {
  if (!db) throw new Error("Firestore not initialized");
  if (!auth.currentUser) throw new Error("User not authenticated");
  
  try {
    const q = query(collection(db, "glossary"), orderBy("title", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as GlossaryTerm));
  } catch (error) {
    console.error("Error fetching glossary terms:", error);
    throw new Error(error instanceof Error ? error.message : "Error fetching glossary terms");
  }
};

export const getGlossaryTermBySlug = async (slug: string): Promise<GlossaryTerm | null> => {
  if (!db) throw new Error("Firestore not initialized");
  
  try {
    const q = query(collection(db, "glossary"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as GlossaryTerm;
  } catch (error) {
    console.error("Error fetching glossary term:", error);
    throw error;
  }
};

export const updateGlossaryTerm = async (id: string, data: Partial<GlossaryTerm>) => {
  if (!db) throw new Error("Firestore not initialized");
  if (!auth.currentUser) throw new Error("User not authenticated");
  
  try {
    const termRef = doc(db, "glossary", id);
    await updateDoc(termRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
    const updatedDoc = await getDoc(termRef);
    return { id: updatedDoc.id, ...updatedDoc.data() } as GlossaryTerm;
  } catch (error) {
    console.error("Error updating glossary term:", error);
    throw error;
  }
};

// Populate glossary terms
export const populateGlossaryTerms = async () => {
  if (!db) throw new Error("Firestore not initialized");
  if (!auth.currentUser) throw new Error("User not authenticated");

  const terms = [
    {
      slug: 'tasa-de-conversion',
      title: 'Tasa de Conversión',
      description: 'Porcentaje de espectadores que realizan la acción deseada después de ver tu video.',
      content: `
        <p class="lead">La tasa de conversión es una métrica fundamental que mide el porcentaje de espectadores que realizan una acción específica después de ver tu video.</p>
        
        <h2>¿Qué es la Tasa de Conversión?</h2>
        <p>En el contexto del video marketing, la tasa de conversión representa el porcentaje de personas que completan una acción deseada después de ver tu video. Estas acciones pueden incluir:</p>
        <ul>
          <li>Realizar una compra</li>
          <li>Suscribirse a un newsletter</li>
          <li>Registrarse para una prueba gratuita</li>
          <li>Descargar un recurso</li>
          <li>Contactar con ventas</li>
        </ul>
      `,
      icon: 'BarChart2',
      color: 'blue',
      status: 'published',
      seo: {
        title: 'Tasa de Conversión en Video Marketing - Video Empresas',
        description: 'Aprende todo sobre la tasa de conversión en video marketing: cómo calcularla, mejorarla y utilizarla para optimizar tus campañas.'
      }
    },
    {
      slug: 'tasa-de-engagement',
      title: 'Tasa de Engagement',
      description: 'Medida de interacción del espectador con tu contenido de video.',
      content: `
        <p class="lead">La tasa de engagement es una métrica crucial que mide el nivel de interacción y conexión que los espectadores tienen con tu contenido de video.</p>
        
        <h2>¿Qué es la Tasa de Engagement?</h2>
        <p>La tasa de engagement en video marketing representa el nivel de interacción que los usuarios tienen con tu contenido. Esta métrica va más allá de las simples visualizaciones, midiendo acciones como:</p>
        <ul>
          <li>Likes y reacciones</li>
          <li>Comentarios y respuestas</li>
          <li>Compartidos</li>
          <li>Tiempo de visualización</li>
          <li>Clics en elementos interactivos</li>
        </ul>
      `,
      icon: 'Heart',
      color: 'purple',
      status: 'published',
      seo: {
        title: 'Tasa de Engagement en Video Marketing - Video Empresas',
        description: 'Descubre cómo medir y mejorar la tasa de engagement en tus videos: métricas clave, estrategias y mejores prácticas.'
      }
    },
    {
      slug: 'tasa-de-rebote',
      title: 'Tasa de Rebote',
      description: 'Porcentaje de visitantes que abandonan tu video en los primeros segundos.',
      content: `
        <p class="lead">La tasa de rebote en video marketing mide el porcentaje de espectadores que abandonan tu video en los primeros segundos, un indicador crucial de la efectividad de tu contenido.</p>
        
        <h2>Comprendiendo la Tasa de Rebote</h2>
        <p>La tasa de rebote es un indicador importante que señala problemas potenciales en tu contenido de video, incluyendo:</p>
        <ul>
          <li>Desajuste entre contenido y expectativas</li>
          <li>Problemas técnicos de reproducción</li>
          <li>Falta de engagement inicial</li>
          <li>Contenido irrelevante para la audiencia</li>
        </ul>
      `,
      icon: 'ArrowLeft',
      color: 'red',
      status: 'published',
      seo: {
        title: 'Tasa de Rebote en Video Marketing - Video Empresas',
        description: 'Comprende y optimiza la tasa de rebote en tus videos: causas comunes, soluciones y estrategias de retención.'
      }
    },
    {
      slug: 'call-to-action',
      title: 'Call-to-Action (CTA)',
      description: 'Elemento que guía al espectador hacia la acción deseada.',
      content: `
        <p class="lead">Un Call-to-Action (CTA) efectivo es el puente entre el contenido de tu video y la acción que deseas que tome tu audiencia.</p>
        
        <h2>Elementos de un CTA Efectivo</h2>
        <ul>
          <li>Claridad en la acción requerida</li>
          <li>Urgencia o incentivo para actuar</li>
          <li>Beneficio claro para el usuario</li>
          <li>Ubicación estratégica en el video</li>
          <li>Diseño visual atractivo</li>
        </ul>
      `,
      icon: 'MousePointerClick',
      color: 'green',
      status: 'published',
      seo: {
        title: 'Call-to-Action (CTA) en Video Marketing - Video Empresas',
        description: 'Aprende a crear CTAs efectivos en tus videos: tipos, mejores prácticas y estrategias de implementación.'
      }
    },
    {
      slug: 'video-seo',
      title: 'Video SEO',
      description: 'Optimización de videos para mejorar su visibilidad en buscadores.',
      content: `
        <p class="lead">El Video SEO es el proceso de optimizar tu contenido de video para maximizar su visibilidad en motores de búsqueda y plataformas de video.</p>
        
        <h2>Elementos Clave del Video SEO</h2>
        <ul>
          <li>Títulos optimizados</li>
          <li>Descripciones detalladas</li>
          <li>Tags y palabras clave relevantes</li>
          <li>Miniaturas personalizadas</li>
          <li>Transcripciones y subtítulos</li>
        </ul>
      `,
      icon: 'Search',
      color: 'yellow',
      status: 'published',
      seo: {
        title: 'Video SEO - Optimización para Motores de Búsqueda - Video Empresas',
        description: 'Guía completa de Video SEO: optimización de títulos, descripciones, miniaturas y más para maximizar la visibilidad de tus videos.'
      }
    },
    {
      slug: 'video-corporativo',
      title: 'Video Corporativo',
      description: 'Herramienta audiovisual para presentar la identidad y valores de una empresa.',
      content: `
        <p class="lead">El video corporativo es una herramienta de comunicación audiovisual diseñada para presentar la identidad, valores y mensajes clave de una empresa.</p>
        
        <h2>Tipos de Videos Corporativos</h2>
        <ul>
          <li>Videos institucionales</li>
          <li>Videos de producto o servicio</li>
          <li>Videos de formación</li>
          <li>Videos de cultura empresarial</li>
          <li>Videos de responsabilidad social</li>
        </ul>
      `,
      icon: 'Building',
      color: 'blue',
      status: 'published',
      seo: {
        title: 'Video Corporativo - Definición y Mejores Prácticas - Video Empresas',
        description: 'Aprende todo sobre videos corporativos: tipos, beneficios, proceso de producción y mejores prácticas para tu empresa.'
      }
    },
    {
      slug: 'videos-animados',
      title: 'Videos Animados',
      description: 'Contenido que utiliza animación para comunicar mensajes de forma atractiva.',
      content: `
        <p class="lead">Los videos animados son una forma versátil y atractiva de comunicar mensajes complejos de manera simple y memorable.</p>
        
        <h2>Tipos de Videos Animados</h2>
        <ul>
          <li>Animación 2D tradicional</li>
          <li>Motion graphics</li>
          <li>Animación 3D</li>
          <li>Stop motion</li>
          <li>Animación tipográfica</li>
        </ul>
      `,
      icon: 'Sparkles',
      color: 'purple',
      status: 'published',
      seo: {
        title: 'Videos Animados - Definición y Tipos - Video Empresas',
        description: 'Descubre los diferentes tipos de videos animados, sus beneficios y cómo utilizarlos efectivamente en tu estrategia de marketing.'
      }
    },
    {
      slug: 'videos-whiteboard',
      title: 'Videos Whiteboard',
      description: 'Técnica que simula dibujos en pizarra para explicaciones visuales.',
      content: `
        <p class="lead">Los videos whiteboard son una técnica de animación que simula el dibujo a mano sobre una pizarra blanca, combinando narración visual con explicación verbal.</p>
        
        <h2>Características Principales</h2>
        <ul>
          <li>Dibujos simples y claros</li>
          <li>Narración sincronizada</li>
          <li>Progresión visual fluida</li>
          <li>Estilo minimalista</li>
          <li>Enfoque en la historia</li>
        </ul>
      `,
      icon: 'PenTool',
      color: 'gray',
      status: 'published',
      seo: {
        title: 'Videos Whiteboard - Definición y Usos - Video Empresas',
        description: 'Explora los videos whiteboard: qué son, cómo funcionan y cómo pueden mejorar tu comunicación empresarial.'
      }
    },
    {
      slug: 'tasa-de-retencion',
      title: 'Tasa de Retención',
      description: 'Medida del tiempo que los espectadores permanecen viendo el video.',
      content: `
        <p class="lead">La tasa de retención es una métrica crucial que mide cuánto tiempo los espectadores permanecen viendo tu video.</p>
        
        <h2>Factores que Afectan la Retención</h2>
        <ul>
          <li>Calidad del contenido inicial</li>
          <li>Duración del video</li>
          <li>Ritmo y estructura</li>
          <li>Relevancia para la audiencia</li>
          <li>Calidad técnica</li>
        </ul>
      `,
      icon: 'Timer',
      color: 'green',
      status: 'published',
      seo: {
        title: 'Tasa de Retención - Métricas de Video Marketing - Video Empresas',
        description: 'Comprende la tasa de retención en videos: qué es, cómo medirla y estrategias para mejorarla.'
      }
    }
  ];

  try {
    for (const term of terms) {
      const now = Timestamp.now();
      await addDoc(collection(db, "glossary"), {
        ...term,
        createdAt: now,
        updatedAt: now,
        publishedAt: now
      });
    }
    console.log('Successfully populated glossary terms');
  } catch (error) {
    console.error('Error populating glossary terms:', error);
    throw error;
  }
};