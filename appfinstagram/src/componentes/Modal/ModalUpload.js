import React, { useCallback, useState } from "react";
import { FiUpload } from 'react-icons/fi';

import Upload from "../Upload";

import { StyleModal } from './styles';

const ModalUploadPhoto = () => {

    const [ isOpen, setIsOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);

//const { data, resetValues } = useUpload();

   const toogleModal = useCallback(() =>{
    setIsOpen(!isOpen)
   },[isOpen])

   const afterOpen = useCallback(() => {
      setTimeout(() => {
        setOpacity(1);
      }, 100)
   }, [])


   const beforeClose = useCallback(() => {
    return new Promise(resolve =>{
        setOpacity(0);
        setTimeout(resolve, 200);
    })
 }, [])


    return(
     <>
     <FiUpload size={30} onClick= {toogleModal} />

     <StyleModal 
        isOpen= {isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onEscapekeydown={toogleModal}
        opacity={opacity}
        backgroundProps={{opacity}}
        >
        <Upload />
     </StyleModal>
     </>

    )
}

export default ModalUploadPhoto;