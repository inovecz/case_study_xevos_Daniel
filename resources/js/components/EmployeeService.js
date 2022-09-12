import { variables } from "../variables";

let refreshFunc;
export let orderCol;
export let order;

export function getData(setData){
    fetch(variables.apiUrl + 'getEmployees',{
        method:'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then((result)=>{
        getDataFromDb(setData);
    },(error)=>{
        console.log(error);
    })
}

export function getDataFromDb(setData, orderColumn){
    if(order === '' || order === undefined){
        
        order = true;
    } 
    if(orderColumn === orderCol){

        order = !order;
    }
    if(orderColumn !== orderCol){

        order = true;
    }

    orderCol = orderColumn;
    refreshFunc = setData;
    fetch(variables.apiUrl + 'getEmployeesFromDb',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            orderColumn: orderColumn,
            order: order
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        setData(result.employees);
    },(error)=>{
        console.log(error);
    })
}

export function updateData(data){
    fetch(variables.apiUrl+ 'updateEmployee',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then((result)=>{
        if(result){
            console.log(result);
            getDataFromDb(refreshFunc);
        }
    },(error)=>{
        alert('Failed');
    }) 
}

export function deleteData(data){
    fetch(variables.apiUrl+ 'deleteEmployee',{
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then((result)=>{
        if(result){
            console.log(result);
            getDataFromDb(refreshFunc);
        }
    },(error)=>{
        alert('Failed');
    }) 
}

export function compareData(setData){
    fetch(variables.apiUrl+ 'compareEmployees',{
        method:'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
    })
    .then(res=>res.json())
    .then((result)=>{
        if(result){
            console.log(result);
            getDataFromDb(refreshFunc);
        }
    },(error)=>{
        alert('Failed');
    }) 
}