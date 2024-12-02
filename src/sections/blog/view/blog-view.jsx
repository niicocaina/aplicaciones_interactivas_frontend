import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from 'src/context/authContext';
import config from 'src/config.json'; 


const BlogView = () => {
  const { user } = useContext(AuthContext);  
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const checkoutUrl = config.apiBaseUrl + config.endpoints.checkout;
        const response = await fetch(checkoutUrl, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener el historial de compras');
        }

        let data = await response.json();
        console.log("esto es data, ", data);

        const simulatedPurchases = data.map((purchase) => ({
          ...purchase,
          items: purchase.items.map(item => ({
            ...item,
            product: {
              name: item.name,
              description: item.description,
              price: item.price,
              promotionalPrice: item.promotionalPrice,
              img1: item.img1,
              stock: item.stock,
            },
            quantity: item.quantity
          })),
        }));

        // Filtrar las compras de este usuario
        const userPurchases = simulatedPurchases.filter((purchase) => String(purchase.userId) === String(user?.id));
        setPurchases(userPurchases);
        setIsLoading(false);  
      } catch (error) {
        console.error('Error al obtener el historial de compras:', error);
        setIsLoading(false); 
      }
    };

    if (user) {
      fetchPurchases();  
    }
  }, [user]);  

  useEffect(() => {
    if (!user) {
      navigate('/login');  
    }
  }, [user, navigate]);  

  if (isLoading) {
    return <div>Cargando...</div>;  
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

      {/* Historial de compras - Solo si el rol es 'USER' */}
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
                {purchases.map((purchase) => (
                  <li key={purchase.id} style={{ marginBottom: '20px', borderBottom: '1px solid #f1f1f1', paddingBottom: '15px' }}>
                    {purchase.items.map((item) => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={item.product.img1}
                          alt={item.product.name}
                          style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px' }}
                        />
                        <div>
                          <h5 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>
                            {item.product.name}
                          </h5>
                          <p style={{ margin: '5px 0', fontSize: '14px' }}>
                            <strong>Descripción:</strong> {item.product.description}
                          </p>
                          <p style={{ margin: '5px 0', fontSize: '14px' }}>
                            <strong>Precio:</strong> ${item.product.promotionalPrice || item.product.price}
                          </p>
                          <p style={{ margin: '5px 0', fontSize: '14px' }}>
                            <strong>Cantidad:</strong> {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogView;


/*
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from 'src/context/authContext';

const BlogView = () => {
  const { user } = useContext(AuthContext);  
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch('http://localhost:3000/checkOut');
        let data = await response.json();
        console.log("esto es data, ", data);

        const simulatedPurchases = data.map((purchase) => ({
          ...purchase,
          items: purchase.items.map(item => ({
            ...item,
            product: {
              name: item.name,
              description: item.description,
              price: item.price,
              promotionalPrice: item.promotionalPrice,
              img1: item.img1,
              stock: item.stock,
            },
            quantity: item.quantity
          })),
        }));

        // Filtrar las compras de este usuario
        const userPurchases = simulatedPurchases.filter((purchase) => String(purchase.userId) === String(user?.id));
        setPurchases(userPurchases);
        setIsLoading(false);  
      } catch (error) {
        console.error('Error al obtener el historial de compras:', error);
        setIsLoading(false); 
      }
    };

    if (user) {
      fetchPurchases();  
    }
  }, [user]);  

  // Redirigir al login si no hay usuario
  useEffect(() => {
    if (!user) {
      navigate('/login');  
    }
  }, [user, navigate]);  

  if (isLoading) {
    return <div>Cargando...</div>;  
  }
*//*
  return (
    <div className="container" style={{ marginTop: '20px', maxWidth: '800px' }}>
      {}
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
          {}
          {user?.role === 'ADMIN' && (
            <p><strong>Rol:</strong> Admin</p>
          )}
        </div>
      </div>

      {}
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
                {purchases.map((purchase) => (
                  <li key={purchase.id} style={{ marginBottom: '20px', borderBottom: '1px solid #f1f1f1', paddingBottom: '15px' }}>
                    {purchase.items.map((item) => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={item.product.img1}
                          alt={item.product.name}
                          style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px' }}
                        />
                        <div>
                          <h5 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>
                            {item.product.name}
                          </h5>
                          <p style={{ margin: '5px 0', fontSize: '14px' }}>
                            <strong>Descripción:</strong> {item.product.description}
                          </p>
                          <p style={{ margin: '5px 0', fontSize: '14px' }}>
                            <strong>Precio:</strong> ${item.product.promotionalPrice || item.product.price}
                          </p>
                          <p style={{ margin: '5px 0', fontSize: '14px' }}>
                            <strong>Cantidad:</strong> {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogView;
*/