//const array=data.results[0].members

function getData(){
    fetch("https://api.propublica.org/congress/v1/113/senate/members.json",{
        method:"GET",
        headers:{
            "x-API-Key":"ZcztdsvLE37notfpgbM7cro3IZk6k3jscP20bchF"
        }
    })
.then(responce=>responce.json())
.then(res=>{
    //console.log(res.results[0].members)
    main(res.results[0].members)
})
.catch(err=>console.log(err.message));

}
getData()

function main(array){
    stateSenator(array)
    eventList(array)
    creatTable(array)

}


function stateSenator(array){
    let myState=array.map(member=>member.state).sort()
    //console.log(myState)
    let myNewState=[...new Set(myState)]
    //console.log(myNewState)
    let select=document.getElementById("select")
    
    myNewState.forEach(state=>{
        let option=document.createElement("option")
        option.innerHTML=state
        select.appendChild(option)
    })
}






function eventList(array){
 Array.from(document.querySelectorAll("input")).forEach(el=>el.addEventListener("change",()=>filterTable(array)))
 document.getElementById("select").addEventListener("change",()=>filterTable(array))
 }


function filterTable(array){
   let result= Array.from(document.querySelectorAll("input:checked")).map(el=>el.value)
   //console.log(result)
   let myTable=document.getElementById("senate-table")
   let state=document.getElementById("select").value
   console.log(state)

   
   if(result.length>0 && state==="All"){
       myTable.innerHTML=""
   let filteredArray=(array.filter(senator=>result.includes(senator.party)))
     creatTable(filteredArray)
     }
     if(result.length===0 && state!=="All"){
        myTable.innerHTML=""
        let filteredArray=(array.filter(member=>member.state===state))
        creatTable(filteredArray)
    }
    if(result.length>0 && state!=="All"){
        myTable.innerHTML=""
        let filteredArray=(array.filter(member=>result.includes(member.party)&& member.state===state))
        creatTable(filteredArray)

    }
   if(result.length===0 && state==="All"){ 
       myTable.innerHTML=""

       creatTable(array)
   }

   
}



function creatTable (array){ 
    
    let myTable=document.getElementById("senate-table")
    for(let i=0;i<array.length;i++){

        let row=document.createElement("tr")
        if(array[i].middle_name){
            
            row.insertCell().innerHTML=array[i].first_name+" "+array[i].middle_name+" "+array[i].last_name
        }
        else{
           
            row.insertCell().innerHTML=array[i].first_name+" "+array[i].last_name
        }
        
        row.insertCell().innerHTML=array[i].party
        row.insertCell().innerHTML=array[i].state
        row.insertCell().innerHTML=array[i].seniority
        row.insertCell().innerHTML=array[i].votes_with_party_pct
        
        myTable.appendChild(row)

    }

}
