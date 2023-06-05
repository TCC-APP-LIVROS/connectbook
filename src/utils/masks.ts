export function applyPriceMask(text : string){
    // Remove todos os caracteres que não sejam números ou ponto
   let cleanedText = text.replace(/[^0-9.]/g, '');
 
   // Verifica a posição do ponto e remove os extras
   const dotIndex = cleanedText.indexOf('.');
   if (dotIndex !== -1) {
     let beforeDot = cleanedText.slice(0, dotIndex);
     let afterDot = cleanedText.slice(dotIndex + 1).replace(/\./g, '');
 
     // Limita a dois dígitos à direita do ponto
     if (afterDot.length > 2) {
       cleanedText.replace(/\./, '')
     }
 
     cleanedText = `${beforeDot}.${afterDot}`;
   }
 
   return cleanedText;
     }