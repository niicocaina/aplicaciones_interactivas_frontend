import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from 'src/context/authContext';
import config from 'src/config.json'; 
import axios from 'axios';
import { useNotification } from 'src/context/notificationContext';


const BlogView = () => {
  const { user, token } = useContext(AuthContext);  
  const showNotification = useNotification();
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchPurchases = async () => {
      
      try {
        const response = await axios.get('http://localhost:8080/api/v1/checkouts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
  
        });
        
        if (response.ok) {
          throw new Error('Error al obtener el historial de compras');
        }

        let data = await response.data;

        const simulatedPurchases = data.map((purchase) => ({
          ...purchase,
          products: purchase.products.map(productItem => ({
            ...productItem.product, 
            quantity: productItem.quantity
          })),
        }));
      
      setPurchases(simulatedPurchases);
      setIsLoading(false); 
      } catch (error) {
        console.error('Error al obtener el historial de compras:', error);
        showNotification('Error al obtener el historial de compras:', 'error');
        setIsLoading(false); 
      }
    };

    if (user) {
      fetchPurchases();  
    }
  }, [user, token]);  


  useEffect(() => {
    if (!user) {
      navigate('/login');  
    }
  }, [user, navigate]);  

  
  if (isLoading) {
    return <div> </div>;  
  }

  return (
    <div className="container" style={{ marginTop: '20px', maxWidth: '800px' }}>
      {/* Perfil del usuario */}
      <div className="card" style={{ padding: '20px', marginBottom: '30px' }}>
        <div className="card-header" style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
          <h3>Perfil de {user?.firstName} {user?.lastName}</h3>
        </div>
        <div className="card-body" style={{ padding: '20px' }}>
          <p><strong>Nombre de usuario:</strong> {user?.userName}</p>
          <p><strong>Nombre:</strong> {user?.firstName}</p>
          <p><strong>Apellido:</strong> {user?.lastName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p>
          <strong>Fecha de nacimiento:</strong>{" "}
          {user?.birthDate && 
            new Date(user.birthDate).toLocaleDateString('es-AR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).replace(/\//g, '-')} 
        </p>          
          {/*  */}
          {user?.role === 'ADMIN' && (
            <p><strong>Rol:</strong> Admin</p>
          )}
        </div>
      </div>

      {user?.role === 'USER' && (
        <div className="card" style={{ padding: '20px' }}>
          <div className="card-header" style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
            <h3>Historial de Compras</h3>
          </div>
          <div className="card-body" style={{ padding: '20px' }}>
            {purchases.length === 0 ? (
              <p>No has realizado ninguna compra.</p>
            ) : (
              <ul>
          {purchases.map((purchase) => {
            const purchaseTotal = purchase.products.reduce((acc, product) => {
              const price = product.promotionalPrice || product.price;
              return acc + (price * product.quantity);
            }, 0);

            return ( 
            <li key={purchase.checkOutId} style={{ marginBottom: '20px', borderBottom: '1px solid #f1f1f1', paddingBottom: '15px' }}>
               <p><strong>Número de compra: </strong> #{purchase.checkOutId}</p>
              <p><strong>Total:</strong> ${purchaseTotal}</p>
              <p>
                <strong>Fecha:</strong>{" "}
                {purchase.transactionDate && 
                  new Date(purchase.transactionDate).toLocaleDateString('es-AR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  }).replace(/\//g, '-')} 
              </p>
              
              <ul> {/* Agregar una lista para los productos */}
                {purchase.products.map((product) => (
                  <li key={product.productId} style={{ display: 'flex', alignItems: 'center' }}> {/*  */}
                    <img
                      src={product.img1}
                      alt={product.name}
                      style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px' }}
                    />
                    <div>
                      <h5 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>
                        {product.name}
                      </h5>
                      <p style={{ margin: '5px 0', fontSize: '14px' }}>
                        <strong>Descripción:</strong> {product.description}
                      </p>
                      <p style={{ margin: '5px 0', fontSize: '14px' }}>
                        <strong>Precio:</strong> ${product.promotionalPrice || product.price}
                      </p>
                      <p style={{ margin: '5px 0', fontSize: '14px' }}>
                        <strong>Cantidad:</strong> {product.quantity}
                      </p>
                    </div>
                  </li>
                ))}
                <br></br>
                <br></br>
              </ul>
              </li>
        );
      })} 
    </ul> 
  )} 
</div> 
  </div>
)}
    </div>
  );
};

export default BlogView;

