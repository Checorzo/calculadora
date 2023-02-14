   let lastValue =  null;
   let newValue = null;
   let result = null;
   let temp = '';
   let operators = /-/;
   let operator = '';
   let digit = '';
   let lastDigit = '';
   let stringNumber = '';
     
   /*Variables centinelas o banderas*/
   let dotFlag = false;
   let operatorFlag = false;
   let numberFlag = false;
   let minusFlag = true;
   let operationStatue = false;
   let newNumberStatus = false;
   let operationFlag = false;
   let operationAcumalte = false;
   let calculateStatus = false;
   let counterOperator = 0;

   /*Variables para avstraer los botones*/
   const screenOperation = document.querySelector('#operation');
   const screenResult = document.querySelector("#result");
   
   
   const key = document.querySelector('.keyboard-number');
    //----------------------------------------------------------
   //Capturar botones e imprimir 
   const calcular = ()=>{
  //Agregar listener a la  calculadora 
      key.addEventListener('click', e=>{
         const t = e.target, 
            d = t.name

         if(d === 'number'){
            digit = t.textContent;
            if( operationFlag === true ){
               screenOperation.value = '';
               operationFlag = false;
               newValue = 0;
               console.log("operationFlag");
            }
            numberFlag = true;
            operatorFlag = true;
            printValues(screenOperation,digit);
           if(operationStatue === true){
               newValue = parseFloat(screenOperation.value);
               operationStatue = true;
            }
            else{
               counterOperator = 0;
            }
         }
         if(d === 'operator' && numberFlag === true && operatorFlag === true){
            operator = t.textContent;
            newNumberStatus = true;
            operationFlag = true;
            counterOperator++;
            operationStatue = true;

            if(operationStatue === true ){
               operationAcumalte = true;
               newNumberStatus = true;
               console.log(lastValue);
               if( counterOperator > 1 ){
               lastValue = result;
               operationStatue = true;
               counterOperator = 1;
               }
               else{
               lastValue = parseFloat(screenOperation.value);
               }
            }
           
            screenOperation.value = screenOperation.value + operator;

            console.log(lastValue,operator);
            if( operator)minusFlag = false;
            if(operator === 'x' || operator === '÷')minusFlag = true;
            dotFlag = false;
            operatorFlag = false;
            
         }
         if(d === 'operation'){
            if(t.textContent === 'C'){
               clear();
            }

            if(t.classList[0] === "erase"){
               erase();
               if(operationStatue === false)lastValue = parseFloat(screenOperation.value);
               else{
                  newValue = parseFloat(screenOperation.value);
               }
               if(operator){
                  operatorFlag = true;
                  numberFlag = true;
                  counterOperator = 0;
               }

         }

         if(t.textContent === '='){
               console.log(lastValue, newValue)
               calculate(operator);
               printResult(result);
               screenOperation.value = '';
               operationFlag = true;
               operationStatue = false;
               dotFlag = false;
            }
         }
         if(d ==='dot' && dotFlag === false){
         //   console.log(`dot: ${t.textContent}`);
            printValues(screenOperation,t.textContent);
            dotFlag = true;
         }
      }//fin del listener de la calculadora
   )}//fin de captura de botones
   /*--------------------------------------------------------*/

   function printValues( out, value ){
      out.value = out.value + value;      
   }
   function printResult(out){
      screenResult.value = out;
      // screenOperation.value = '';
   }


   function clear(){

      screenOperation.value = '';
      screenResult.value = '';
      lastValue = 0;
      firstNumber = true;
      newValue = 0;
      result = 0;
      lastDigit = '';
      operatorFlag = false;
      operationStatue = false;
      stringNumber = '';
      operationAcumalte = true;

        }

   function erase(){
      screenOperation.value = screenOperation.value.slice( 0,-1 );
      //console.log('borrar digito');
   }
   function plus(operandA, operandB){
      return operandA + operandB;
   }
   function minus( operandA, operandB ){
      return operandA - operandB;
   }
   function multiply( operandA, operandB ){
      return operandA * operandB;
   }
   function divition( operandA, operandB ){
      return operandA / operandB;
   }


   function calculate(value){
      calculateStatus = true;
      switch(value){
         
         case '+': 
            lastValue = plus(lastValue, newValue);
            result = lastValue;
            console.log(lastValue,newValue,result);
            break;
         
         case '-': 
            result = minus(lastValue, newValue);
            break;
         
         case 'x': 
            lastValue = multiply(lastValue, newValue);
            result = lastValue;
            break;
         
         case '÷': 
            lastValue = divition(lastValue, newValue);
            result = lastValue;
            break;

         default:
            calculateStatus === false;
            console.log("No se encontrado operación ", );
            break;
      }
   }//fin de funcion calcular
   calcular();
