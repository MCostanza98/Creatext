import React, { useState}  from "react";
import{ Link } from 'react-router-dom';

import gif from '../assets/mobilegif.gif';


import{  Container, Gif, FromContainer, Form, Footer } from './stylesSingUp';



const SignUp = () => {
    const [input, setInput] = useState('');
   return(
    <Container>
        <Gif src={gif} alt="gif" />

        <FromContainer>
         <Form>

            
            <span>Registrate para ver fotos</span>

            <hr />
            <input value={input} name="name" onChange={(e)=> setInput(e.target.value)} />

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