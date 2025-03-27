import React, { useState, useEffect } from 'react';
import { X, Send, Star, Video, Film, Clapperboard } from 'lucide-react';
import { addContact } from '../lib/supabase';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    type: '',
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setShowSuccess(false);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#4F46E5', '#7C3AED', '#EC4899'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const validateForm = () => {
    const newErrors = {
      type: !formData.type ? 'Por favor, selecciona una opción' : '',
      name: !formData.name ? 'Por favor, introduce tu nombre' : '',
      email: validateEmail(formData.email),
      message: !formData.message ? 'Por favor, escribe un mensaje' : ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      return 'Por favor, introduce tu correo electrónico';
    }
    if (!emailRegex.test(email)) {
      return 'Por favor, introduce un correo electrónico válido';
    }
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ ...formData, email });
    setErrors({ ...errors, email: validateEmail(email) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await addContact({
        type: formData.type,
        name: formData.name,
        email: formData.email,
        message: formData.message
      });
      setShowSuccess(true);
      triggerConfetti();
      await new Promise(resolve => setTimeout(resolve, 3000));
      onClose();
      // Reset form
      setFormData({
        type: '',
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al enviar el formulario';
      toast.error(errorMessage);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const contactOptions = [
    'Registrar mi agencia en Video Empresas',
    'Recibir una oferta para mi negocio',
    'Contactar con vosotros'
  ];

  if (isLoading || isSubmitting || showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="relative flex flex-col items-center justify-center gap-6">
          <div className="flex items-center justify-center gap-6">
            <Video className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 animate-spin" />
            <Film className="w-12 h-12 sm:w-16 sm:h-16 text-purple-500 animate-bounce" />
            <Clapperboard className="w-12 h-12 sm:w-16 sm:h-16 text-pink-500 animate-pulse" />
          </div>
          <div className="text-center">
            <p className="text-white text-xl sm:text-2xl font-medium bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
              {showSuccess ? '¡Gracias, estaremos en contacto!' : isSubmitting ? 'Enviando tu mensaje...' : 'Cargando...'}
            </p>
            {showSuccess && (
              <p className="text-gray-300 text-base sm:text-lg animate-fade-in">
                Tu mensaje ha sido enviado correctamente
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-2xl shadow-xl my-4">
        {/* Background floating icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top left icon */}
          <div className="absolute -top-12 -left-12 animate-float-slow opacity-30">
            <Video className="w-24 h-24 sm:w-32 sm:h-32 text-blue-500 transform -rotate-12" />
          </div>
          
          {/* Center right icon */}
          <div className="absolute top-1/2 -right-16 -translate-y-1/2 animate-float-medium opacity-30">
            <Film className="w-24 h-24 sm:w-32 sm:h-32 text-purple-500 transform rotate-12" />
          </div>
          
          {/* Bottom left icon */}
          <div className="absolute -bottom-12 -left-16 animate-float-fast opacity-30">
            <Clapperboard className="w-24 h-24 sm:w-32 sm:h-32 text-pink-500 transform -rotate-6" />
          </div>
          
          {/* Additional decorative icons */}
          <div className="absolute top-1/4 right-1/4 animate-float-slow opacity-20">
            <Video className="w-16 h-16 text-blue-400 transform rotate-45" />
          </div>
          
          <div className="absolute bottom-1/3 left-1/3 animate-float-medium opacity-20">
            <Film className="w-16 h-16 text-purple-400 transform -rotate-12" />
          </div>
        </div>

        {/* Modal content */}
        <div className="p-4 sm:p-6 md:p-8 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Contactar</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-200 mb-1 sm:mb-2">
                Me gustaría
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => {
                  setFormData({ ...formData, type: e.target.value });
                  setErrors({ ...errors, type: '' });
                }}
                className={`w-full px-3 sm:px-4 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 appearance-none text-sm sm:text-base ${
                  errors.type ? 'border-red-500' : 'border-gray-700'
                }`}
                required
              >
                <option value="">Selecciona una opción</option>
                {contactOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.type}</p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1 sm:mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrors({ ...errors, name: '' });
                }}
                className={`w-full px-3 sm:px-4 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm sm:text-base ${
                  errors.name ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="Tu nombre"
                required
              />
              {errors.name && (
                <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1 sm:mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleEmailChange}
                className={`w-full px-3 sm:px-4 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm sm:text-base ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="tu@email.com"
                required
              />
              {errors.email && (
                <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1 sm:mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  setErrors({ ...errors, message: '' });
                }}
                rows={4}
                className={`w-full px-3 sm:px-4 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 resize-none text-sm sm:text-base ${
                  errors.message ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="Cuéntanos más sobre tu proyecto..."
                required
              />
              {errors.message && (
                <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <span>Enviar</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}