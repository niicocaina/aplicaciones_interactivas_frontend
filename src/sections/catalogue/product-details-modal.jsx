import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';

import Iconify from 'src/components/iconify';


export default function ProductDetailsModal({product}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
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
        setCategoria(event.target.value);
    }
    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                Descubrir  
                <Iconify icon="iconoir:eye-solid" />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >   
            <Grid container>
            <Grid size={8}>
            <DialogTitle id="alert-dialog-title">
            {product ? product.name : "Name"}       
                
                </DialogTitle>
                
            </Grid>
            <Grid size={4}>
            <div style={{padding:"20px"}}>
            <Iconify icon="icon-park:close-small" onClick={handleClose}/>
            </div>
            </Grid>
            </Grid>
                
                <DialogContent>
                Hola
                
                Hola
                </DialogContent>
            </Dialog>
        </>
    );
}