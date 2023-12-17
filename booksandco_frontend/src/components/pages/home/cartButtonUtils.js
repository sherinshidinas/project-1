
export const addToCartButtonHandling = (item, buttonTexts, setButtonTexts,deleteHandlerOfCartProductItems) => {
    setButtonTexts((prevButtonTexts)=>{
     const updatedButtonTexts={...prevButtonTexts}

     if(!updatedButtonTexts[item.id] || updatedButtonTexts[item.id] === 'Add to Cart'){
       updatedButtonTexts[item.id]='Added Cart'
     }else{
      // deleteHandlerOfCartProductItems()
       updatedButtonTexts[item.id]='Add to Cart'
     }

     

      // Save updated buttonTexts to localStorage
      localStorage.setItem('buttonTexts',JSON.stringify(updatedButtonTexts))

     return updatedButtonTexts

    })
       
      
 }