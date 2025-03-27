import { supabase } from './supabase';

const BUCKET_NAME = 'images';
const isDevelopment = import.meta.env.DEV;

export async function uploadImage(file: File, path: string) {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export function getPublicUrl(path: string) {
  // In development, use Supabase storage URL
  if (isDevelopment) {
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path);
  
  return publicUrl;
  }
  
  // In production, use relative path
  return `/images/${path}`;
}