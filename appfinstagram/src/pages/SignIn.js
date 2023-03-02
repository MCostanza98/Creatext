import React, { useRef , useCallback } from 'react';
import{ Link } from 'react-router-dom';
import * as Yup from 'yup'; //para validar mi formulario.

import getValidationErrors from '../utils/getValidationErrors';


import Input from "../componentes/input";

import{  Container, FromContainer, Form, Footer } from './stylesSingUp';



const SignIn = () => {

   const formRef = useRef(null);

   const handLeSubmit = useCallback( async (data) =>{
       try{
         formRef.current.setErrors({});

         const schema = Yup.object().shape({
         
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
      

        <FromContainer>
         <Form ref={formRef} onSubmit={handLeSubmit}>

            <h2>FINSTAGRAM</h2>
            <span>Inicia sesión para ver fotos.</span>

            <hr />


          
            <Input name="username" placeholder="Escoja algun usuario" />
            <Input type="password" name="password" placeholder="Contraseña" />

            <button type="submit">Ingresar</button>

            <hr />

            <span className="footer">
                Explora las galerias de fotos de tus amigos.
                </span>
         </Form>

         <Footer>
            <p>
                ¿No tienes una cuenta?<Link to = "signup">Registrarme</Link>
            </p>
         </Footer>
       </FromContainer>
    </Container>
   )
}

export default SignIn;