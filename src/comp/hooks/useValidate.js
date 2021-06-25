import {useReducer} from "react";
const initialstate={value:'',IsTouchedx:false};
const reducer=(state,action)=>{
    if(action.type==="touched"){
        return({value:state.value,IsTouched:true});
    }
    else if(action.type==="reset"){
        return (initialstate);
    }
    else if(action.type==="input"){
        return({value:action.value,IsTouched:state.IsTouched});

    }
    return(initialstate);
}
const useValidate=(type="name",value="")=>{
    // const [Field , setField]=useState("");
    // const [FieldISTouched,setFieldISTouched]=useState(false);
    const[Field,dispatch]=useReducer(reducer,{value:value,IsTouchedx:false});
    let FieldIsValid;
    if(type==="name"){FieldIsValid=Field.value.trim()!=='';}
    else if(type==="email"){ FieldIsValid=(Field.value.trim()!=='')&&(Field.value.includes('@'))&&(Field.value.includes('.com'));}
    else if(type==="password"){ FieldIsValid=(Field.value.trim()!=='')&&(Field.value.length>8);}
    else if(type==="cardno"){ FieldIsValid=(Field.value.length===12)}
    else if(type==="cvv"){ FieldIsValid=(Field.value.length===3)}



    const FieldValidation=(FieldIsValid||!Field.IsTouched);

    return([dispatch,FieldValidation,FieldIsValid,Field.value]);
}

export default useValidate;