import styled from 'styled-components';
import { Form as UnformWeb} from '@unform/web';

export const Container = styled.div`
height: 100vh;
display: flex;
justify-content: center;

@media (max-width:450px){
    align-items: flex-start;
}



`

export const FromContainer = styled.div`
  width: 100%;
  height: auto;
  @media (min-width: 450px){
    max-width: 350px;
  }
`
export const Form = styled(UnformWeb)`
background-color: #fff;
width: 100%;
border: 1px solid #e6e6e6;
border-radius: 4px;
padding: 20px 40px;
display: flex;
flex-direction: column;
align-items: center;

>img {
    width: 230px;
   
}
 @media (max-width: 450px){
    background: transparent;
    border: 0;
 }

hr{
    width: 100%;
    color: #e6e6e6;
    margin: 30px 0;
}
 span{
    text-align: center;
    color: #999;
    font-size: 20px;
    margin: 15px;
 }
 

 button {

  width: 100%;
  padding: 9px 9px;
  background-color: #3897f0;
  border: 1px solid #3897f0;
  border-radius: 4px;
  margin-top: 20px;
  color:#fff;
  cursor: pointer;
  outline: 0px;
}
p{
    color:#999;
}
h2{
  color:#ff0080;
}
`

export const Footer = styled.div`
`