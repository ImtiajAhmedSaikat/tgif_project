const congressData=houseData.results[0].members


function creteTable(array){
    let myTable=document.getElementById("congress-table")
    array.forEach(member=>{
        
       let row=document.createElement("tr")
       if(member.middle_name){
        row.insertCell().innerHTML=member.first_name+" "+ member.middle_name+ " "+member.last_name
     }
     else{
        row.insertCell().innerHTML=member.first_name +" "+member.last_name
     }
        row.insertCell().innerHTML=member.party
        row.insertCell().innerHTML=member.state
        row.insertCell().innerHTML=member.seniority
        row.insertCell().innerHTML=member.votes_with_party_pct

        myTable.appendChild(row)

        
    })
}

creteTable(congressData)