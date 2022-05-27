export const updateItem =(id, whichvalue, newvalue,array,setarray)=> {
    let index = array.findIndex(x=> x.id === id); 
    console.log(index,'index')
    if (index !== -1){
        let temporaryarray = array.slice();
        temporaryarray[index][whichvalue] = newvalue;
        console.log('nice',newvalue);
        setarray(temporaryarray);
    }
    else {
        console.log('no match');
    }
}