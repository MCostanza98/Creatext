
import React, { useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

import { Container,FromContainer, Form,Footer } from "./stylesSingUp";

import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import{ toast } from 'react-toastify';


import getValidationErrors from '../utils/getValidationErrors';
import Input from "../componentes/Input";
import api from "../services/api";


const SignIn = () => {
   const history = useNavigate();

const formRef = useRef(null);

   const handleSubmit = useCallback (async(data) =>{
try {
    formRef.current.setErrors({});

    const schema = Yup.object().shape({
      name: Yup.string().required('Nombre obligatorio'),
      email: Yup.string().required('Correo obligatorio').email('Correo inválido'),
      username: Yup.string().required('username obligatorio'),
      password: Yup.string().required('password obligatorio'),
    })

    await schema.validate(data, {abortEarly: false});
      
    await api.post('/users', data)
   
    



    //toast.success('Te registraste con exito')
    history.pushState('/');

} catch (error) {
   if(error instanceof Yup.ValidationError) {
      const errors = getValidationErrors(error);
      formRef.current.setErrors(errors);
      return;
   }
   toast.success('Ocurrio un error');
}
   }, [history]);

   return(
      <Container>
        
  
          <FromContainer>
           <Form ref={formRef} onSubmit={handleSubmit}>
  
              <h2>FINSTAGRAM</h2>
              <span>Inicia sesión para ver fotos.</span>
  
              <hr />
  
  
             
              <Input name = "username" placeholder="Ingrese un nombre"/>
              <Input type="password" name="password" placeholder="Ingrese alguna contraseña" />
            
  
              <button type="submit">Registrate</button>
  
              <hr />
  
              <span className="footer">Mira las fotos de tus amigos.</span>
           </Form>
  
           <Footer>
              <p>
                  ¿Tienes una cuenta?<Link to = "signup">Registrate</Link>
              </p>
           </Footer>
         </FromContainer>
      </Container>
     )
  }

export  default SignIn;