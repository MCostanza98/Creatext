
import React, { useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

import { Container, Gif, FromContainer, Form,Footer } from "./stylesSingUp";
import gif from '../assets/mobilegif.gif';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import{ toast } from 'react-toastify';
import api from "../services/api";

import getValidationErrors from '../utils/getValidationErrors';
import Input from "../componentes/Input";

const SignUp = () => {
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

    await api.post('/users', data);

    toast.success('Te registraste con exito')
    history.pushState('/signin');

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
          <Gif src={gif} alt="gif" />
  
          <FromContainer>
           <Form ref={formRef} onSubmit={handleSubmit}>
  
              <h2>FINSTAGRAM</h2>
              <span>Registrate para ver fotos</span>
  
              <hr />
  
  
              <Input name="name" placeholder="Ingrese su nombre" />
              <Input name="email" placeholder="Ingrese su email" />
              <Input name = "username" placeholder="Ingrese un nombre"/>
              <Input type="password" name="password" placeholder="Ingrese alguna contraseña" />
            
  
              <button type="submit">Registrate</button>
  
              <hr />
  
              <span className="footer">Aceptar condiciones de política de datos.</span>
           </Form>
  
           <Footer>
              <p>
                  ¿Tienes una cuenta?<Link to = "signin">Entrar</Link>
              </p>
           </Footer>
         </FromContainer>
      </Container>
     )
  }

export  default SignUp;