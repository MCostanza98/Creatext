import React, { useRef , useCallback } from 'react';
import{ Link } from 'react-router-dom';
import * as Yup from 'yup'; //para validar mi formulario.

import getValidationErrors from '../utils/getValidationErrors';

import gif from '../assets/mobilegif.gif';
import Input from "../componentes/input";

import{  Container, Gif, FromContainer, Form, Footer } from './stylesSingUp';



const SignUp = () => {

   const formRef = useRef(null);

   const handLeSubmit = useCallback( async (data) =>{
       try{
         formRef.current.setErrors({});

         const schema = Yup.object().shape({
            name: Yup.string().required('Nombre obligatorio'),
            email: Yup.string().required('Correo obligatorio').email('Correo inválido'),
            username: Yup.string().required('Username obligatorio'),
            password:Yup.string().required('Password obligatorio'),
         })
            await schema.validate(data, { abortEarly: false });//para que nos traiga todas las validaciones.

       }catch (error){
 
        if(error instanceof Yup.ValidationError) {
         const errors = getValidationErrors(error);
         formRef.current.setErrors(errors);
         return;
        }

       }
   } ,[] )
   return(
    <Container>
        <Gif src={gif} alt="gif" />

        <FromContainer>
         <Form ref={formRef} onSubmit={handLeSubmit}>

            <h2>FINSTAGRAM</h2>
            <span>Registrate para ver fotos</span>

            <hr />


            <Input name="name" placeholder="Ingrese su nombre" />
            <Input name="email" placeholder="correo electrónico" />
            <Input name="username" placeholder="Escoja algun usuario" />
            <Input type="password" name="password" placeholder="Contraseña" />

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

export default SignUp;