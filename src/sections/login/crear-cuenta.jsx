import axios from 'axios';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useNavigate } from 'react-router-dom';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import {useNotification} from 'src/context/notificationContext';

// ----------------------------------------------------------------------

const CrearCuenta = () => {
    const showNotification = useNotification();
    const Navigate = useNavigate();
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [apellido, setApellido] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [fechaNacimiento, setFechaNacimiento] = useState(null);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
    };

    const handleApellidoChange = (e) => {
        setApellido(e.target.value);
    };

    const handleUsuarioChange = (e) => {
        setUsuario(e.target.value);
    };

    const handleFechaNacimientoChange = (e) => {
        setFechaNacimiento(e.target.value);
    };

    const handleClick = async () => {
        try {
            await axios.post('http://localhost:3000/user', {
                firstName: nombre,
                lastName: apellido,
                userName: usuario,
                email,
                password,
                rol: 'USER',
                birthDate: fechaNacimiento
            });
            showNotification('Cuenta creada exitosamente', 'success');
            Navigate('/login');
        } catch {
            showNotification('Error al crear la cuenta', 'error');
            console.error('Error de inicio de sesión');
        }
    };

    const renderForm = (
        <>
            <Stack spacing={3} sx={{ mb: 3, mt: 3 }}>
                <TextField name="nombre" label="Nombre" onChange={handleNombreChange}/>
                <TextField name="apellido" label="Apellido" onChange={handleApellidoChange} />
                <TextField name="usuario" label="Usuario" onChange={handleUsuarioChange} />
                <TextField name="email" label="Email" onChange={handleEmailChange} />
                <TextField
                    name="password"
                    label="Contraseña"
                    onChange={handlePasswordChange}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Typography>fecha de nacimiento</Typography>
                <TextField name="fechaNacimiento" type="date" onChange={handleFechaNacimientoChange} />
            </Stack>

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                disabled={!email || !password || !nombre || !apellido || !usuario || !fechaNacimiento}
                onClick={handleClick}
            >
                Crear Cuenta
            </LoadingButton>
        </>
    );

    return (
        <Box
            sx={{
                ...bgGradient({
                    color: alpha(theme.palette.background.default, 0.9),
                    imgUrl: '/assets/background/overlay_4.jpg',
                }),
                height: 1,
            }}
        >
            <Logo
                sx={{
                    position: 'fixed',
                    top: { xs: 16, md: 24 },
                    left: { xs: 16, md: 24 },
                }}
            />

            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}
                >
                    <Typography variant="h4">Crear Cuenta</Typography>

                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
};

export default CrearCuenta;
