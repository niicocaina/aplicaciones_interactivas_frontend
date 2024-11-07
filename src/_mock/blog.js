import axios from 'axios';
import { sample } from 'lodash';
import { faker } from '@faker-js/faker';
import { Email } from '@mui/icons-material';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export const userProfile = {
  id: 'user_id',
  cover: '/assets/images/covers/cover_profile.jpg',
  title: 'Mi Perfil',
  createdAt: new Date(),
  Email: '',

  author: {
    name: 'Nombre Usuario', 
    avatarUrl: '/assets/images/avatars/avatar_user.jpg',
  },
};

// Corregido: Asegúrate de retornar los datos
export const fetchUserProfile = async () => {
  try {
    const response = await axios.get('http://localhost:3030/perfil'); 
    return response.data[0]; // Devuelve el primer objeto del array (tu perfil)
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    return null; // Si hay un error, retorna null
  }
};

export const posts = [...Array(23)].map((_, index) => ({
  id: faker.string.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  createdAt: faker.date.past(),
  view: faker.number.int(99999),
  comment: faker.number.int(99999),
  share: faker.number.int(99999),
  favorite: faker.number.int(99999),
  author: {
    name: faker.person.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));
