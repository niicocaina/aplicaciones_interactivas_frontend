import axios from 'axios';
import * as React from 'react';
import { useState} from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, IconButton } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Iconify from 'src/components/iconify';

export default function AlertDialog({id}) {
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState({});
    const [nombre, setNombre] = useState('Nombre');
    const [descripcion, setDescripcion] = useState('Descripción');
    const [precio, setPrecio] = useState('Precio');
    const [stock, setStock] = useState('stock');
    const [categoria, setCategoria] = useState('Categoria');

    const handleClickOpen = () => {
        getProducts();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/products/${id}`);
            const producto = response.data;
            console.log(producto);
            setProducts(producto);
            setNombre(producto.name || 'Nombre'); 
            setDescripcion(producto.description || 'Descripción');
            setPrecio(producto.price || 'Precio');  
            setStock(producto.stock || 'Stock'); 
            setCategoria(producto.category.name || 'Categoria');
        } catch (error) {
            console.log("Error al obtener productos");
        }
    };

    const updateProducts = async () => {
        try{
            const response = await axios.patch(`http://localhost:3001/products/${id}`, {
                name: nombre,
                description: descripcion,
                price: precio,
                stock,
                category: categoria
            });
            console.log(response);
        }catch(error){
            console.log("Error al actualizar producto");
        }
    };

    const handleChangeNombre = (event) => {
        setNombre(event.target.value);
    };

    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
    };

    const handleChangePrecio = (event) => {
        setPrecio(event.target.value);
    };

    const handleChangeStock = (event) => {
        setStock(event.target.value);
    };

    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value);
    };

    return (
        <>
            <IconButton variant="outlined" onClick={handleClickOpen} sx={{ top: 16, left: 40, ml: 1, background: "white", position: 'absolute', zIndex: 10 }}>
                <Iconify icon="mdi:pencil" />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Editar producto
                </DialogTitle>
                <DialogContent>
                    <TextField value={nombre} sx={{ mb: 2 }} onChange={handleChangeNombre} fullWidth />
                    <TextField value={descripcion} sx={{ mb: 2 }} onChange={handleChangeDescripcion} fullWidth />
                    <TextField value={precio} sx={{ mb: 2 }} onChange={handleChangePrecio} fullWidth />
                    <TextField value={stock} sx={{ mb: 2 }} onChange={handleChangeStock} fullWidth />
                    <TextField value={categoria} sx={{ mb: 2 }} onChange={handleChangeCategoria} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={() => { updateProducts(); handleClose(); }} autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

AlertDialog.propTypes = {
    id: PropTypes.string
};
