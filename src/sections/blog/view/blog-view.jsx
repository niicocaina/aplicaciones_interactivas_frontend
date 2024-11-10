import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../post-card'; 

export default function BlogView() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/perfil'); 
        setUser(response.data[0]); // Establecemos el usuario con la respuesta de la API
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    };

    getUserProfile();
  }, []);

  if (!user) {
    return <div>Cargando...</div>; // Cargando si no hay datos del usuario
  }

  // Aquí pasamos los datos reales del usuario al objeto userProfile
  const userProfile = {
    id: user.userName,
    cover: '/assets/images/avatars/avatar_25.jpg', // Mantienes la portada si deseas
    title: '',
    createdAt: new Date(),
    author: {
      name: `${user.firstName} ${user.lastName}`, // Nombre completo
      avatarUrl: `/assets/images/avatars/avatar_${user.id}.jpg`, // Usamos la ruta relativa aquí
    },
    email: user.email, // Agregar el email
  };

  console.log(user); // Verificación de los datos que estás recibiendo

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Perfil</Typography>
      </Stack>

      <Stack spacing={3}>
        <PostCard key={userProfile.id} post={userProfile} /> {/* Pasamos el objeto completo */}
      </Stack>
    </Container>
  );
}
