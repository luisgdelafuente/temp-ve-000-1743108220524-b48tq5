import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Create a separate client with service role key for admin operations
const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Auth functions
export const loginWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    console.error('Login error:', error);
    throw error;
  }
  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const onAuthChange = (callback: (session: any) => void) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
};

// Contact functions
export interface Contact {
  id?: string;
  type: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
  status?: string;
}

export const addContact = async (contactData: Omit<Contact, 'created_at' | 'status'>) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert([{
        ...contactData,
        status: 'new'
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};

export const getContacts = async (): Promise<Contact[]> => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateContact = async (id: string, data: Partial<Contact>) => {
  try {
    const { data: updatedContact, error } = await supabase
      .from('leads')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return updatedContact;
  } catch (error) {
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
  created_at: string;
  updated_at: string;
  published_at: string | null;
  status: 'draft' | 'published' | 'archived';
  seo_title: string;
  seo_description: string;
}

export const getGlossaryTerms = async (): Promise<GlossaryTerm[]> => {
  try {
    console.log('Attempting to fetch glossary terms...');
    console.log('Using Supabase URL:', supabaseUrl);

    const { data, error } = await supabase
      .from('glossary')
      .select('*')
      .order('title', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Glossary terms fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in getGlossaryTerms:', error);
    // Try a direct fetch to debug the connection
    try {
      console.log('Attempting direct fetch...');
      const response = await fetch(`${supabaseUrl}/rest/v1/glossary?select=*`, {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
      });

      if (!response.ok) {
        console.error('Direct fetch failed with status:', response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Direct fetch successful:', data);
      return data;
    } catch (fetchError) {
      console.error('Direct fetch error:', fetchError);
      throw fetchError;
    }
  }
};

export const getGlossaryTermBySlug = async (slug: string): Promise<GlossaryTerm | null> => {
  try {
    const { data, error } = await supabase
      .from('glossary')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching glossary term by slug:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error in getGlossaryTermBySlug:', error);
    throw error;
  }
};

export const updateGlossaryTerm = async (id: string, data: Partial<GlossaryTerm>) => {
  try {
    console.log('Updating glossary term with data:', { id, data });
    const { data: updatedTerm, error } = await supabase
      .from('glossary')
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating glossary term:', error);
      throw error;
    }

    console.log('Glossary term updated successfully:', updatedTerm);
    return updatedTerm;
  } catch (error) {
    console.error('Unexpected error in updateGlossaryTerm:', error);
    throw error;
  }
};