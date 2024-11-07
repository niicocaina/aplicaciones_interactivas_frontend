import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Iconify from 'src/components/iconify';

import ImageUploader from './image-uploader';

export default function AlertDialog() {
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setImages([]);
        setOpen(false);
    };

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [categoria, setCategoria] = useState('');

    const getNombre = (event) => {
        setNombre(event.target.value);
    }

    const getDescripcion = (event) => {
        setDescripcion(event.target.value);
    }

    const getPrecio = (event) => {
        setPrecio(event.target.value);
    }

    const getStock = (event) => {
        setStock(event.target.value);
    }

    const getCategoria = (event) => {
        setCategoria(capitalizeFirstLetter(event.target.value));
    }

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }      

    const createProduct = async () => {
        try {
            let id = 0;
            if (categoria === 'Running') {
                id = 1;
            } else if (categoria === 'Casual') {
                id = 2;
            } else if (categoria === 'Deportiva') {
                id = 3;
            }
            await axios.post('http://localhost:3000/products', {
                name: nombre,
                description: descripcion,
                price: precio,
                stock,
                category:{
                    id,
                    name:categoria
                },
                img1:images[0],
                img2:images[1],
                img3:images[2],
                img4:images[3],
                img5:images[4],
            });
        } catch (error) {
            console.log("Error al crear producto");
        }
    }

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                Nuevo Producto
                <Iconify icon="bi:plus" />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Nuevo producto
                </DialogTitle>
                <DialogContent>
                    <TextField placeholder='Nombre' sx={{ mb: 2 }} onChange={getNombre} fullWidth />
                    <TextField placeholder='Descripcion' sx={{ mb: 2 }} onChange={getDescripcion} fullWidth />
                    <TextField placeholder='Precio' sx={{ mb: 2 }} onChange={getPrecio} fullWidth />
                    <TextField placeholder='Stock' sx={{ mb: 2 }} onChange={getStock} fullWidth />
                    <TextField placeholder='Categoria' sx={{ mb: 2 }} onChange={getCategoria} fullWidth />
                    <ImageUploader images={images} setImages={setImages}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={() => { createProduct(); handleClose(); }} autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}