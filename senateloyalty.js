const senateData=data.results[0].members

//console.log(senateData)

let statistic={
    Number_of_Republican:numberOfReps(senateData,"R"),
    Number_of_Democrat:numberOfReps(senateData,"D"),
    Number_of_Independent:numberOfReps(senateData,"ID"),
    Votes_with_party_pct_Republican:votesOfReps(senateData,"R"),
    Votes_with_party_pct_Democrate:votesOfReps(senateData,"D"),
    Votes_with_party_pct_Independent:votesOfReps(senateData,"ID"),
    least_loyal:leastLoyal(senateData),
    most_loyal:mostLoyal(senateData),
    total_votes:null
}

function numberOfReps(array,partyCodeStr){
    return array.filter(member=>(member.party)===partyCodeStr).length
    
    //console.log(myResult)

}
function votesOfReps(array,partyCodeStr){
    let myResult=array.filter(votes=>votes.party===partyCodeStr).map(votes=>votes.votes_with_party_pct)
    myResult=(myResult.reduce((a,b)=>a+b)/myResult.length)
    //console.log(myResult)
    return myResult
}

function leastLoyal(array){
    let percentAmount=Math.floor((array.length*10)/100)
    //console.log(percentAmount)
    let pctArray=array.map(member=>member.votes_against_party_pct).sort((a,b)=>b-a).slice(0,percentAmount)
   //console.log(pctArray)
   let myArray=Math.min(...pctArray)
   console.log(myArray)
   return array.filter(member=>member.votes_against_party_pct>=myArray)
}


function mostLoyal(array){
    let pAmount=Math.floor((array.length*10)/100)
    let pArray=array.map(member=>member.votes_against_party_pct).sort((a,b)=>a-b).slice(0,pAmount)
    console.log(pArray)
    let mArray=Math.max(...pArray)
    console.log(mArray)
    return array.filter(member=>member.votes_against_party_pct<=mArray)

}







function createSmallTable(object){

    let row1=document.getElementById("row1")
    row1.insertCell().innerHTML=object.Number_of_Republican
    row1.insertCell().innerHTML=object.Votes_with_party_pct_Republican.toFixed(2)
    let row2=document.getElementById("row2")
    row2.insertCell().innerHTML=object.Number_of_Democrat
    row2.insertCell().innerHTML=object.Votes_with_party_pct_Democrate.toFixed(2)
    let row3=document.getElementById("row3")
    row3.insertCell().innerHTML=object.Number_of_Independent
    row3.insertCell().innerHTML=object.Votes_with_party_pct_Independent.toFixed(2)
    let row4=document.getElementById("row4")
    row4.insertCell().innerHTML=object.Number_of_Republican+object.Number_of_Democrat+object.Number_of_Independent
    let totalPercentage=(object.Votes_with_party_pct_Republican+object.Votes_with_party_pct_Democrate+object.Votes_with_party_pct_Independent)/3
    row4.insertCell().innerHTML=totalPercentage.toFixed(2)
}
createSmallTable(statistic)

function createTable(array,tableIdStr){
    let lm_Table=document.getElementById(tableIdStr)
    array.forEach(member=>{
       let row=document.createElement("tr")
       if(member.middle_name){
          row.insertCell().innerHTML=member.first_name+" "+ member.middle_name+ " "+member.last_name
       }
       else{
          row.insertCell().innerHTML=member.first_name +" "+member.last_name
       }
       let totalPartyVotes=(member.total_votes/100)*member.votes_with_party_pct
       console.log(totalPartyVotes)
       
       row.insertCell().innerHTML=member.party
       row.insertCell().innerHTML=totalPartyVotes.toFixed(0)
       
       row.insertCell().innerHTML=member.votes_with_party_pct
       console.log(row)
       lm_Table.appendChild(row)
    })
    
 
 }
 createTable(statistic.least_loyal,"Least-Loyal")
 createTable(statistic.most_loyal,"Most-Loyal")