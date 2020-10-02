const senateData=data.results[0].members
let statistic={
Number_of_Republican:numberOfReps(senateData,"R"),
Number_of_Democrate:numberOfReps(senateData,"D"),
Number_of_Independent:numberOfReps(senateData,"ID"),
Votes_with_party_pct_Republican:votesOfReps(senateData,"R"),
Votes_with_party_pct_Democrate:votesOfReps(senateData,"D"),
Votes_with_party_pct_Independent:votesOfReps(senateData,"ID"),
least_engaged:leastEngaged(senateData),
most_engaged:mostEngaged(senateData)
}
function mostEngaged(array){
let pAmount=Math.floor((array.length*10))/100
//console.log(pAmount)
let pArray=array.map(member=>member.missed_votes_pct).sort((a,b)=>a-b).slice(0,pAmount)
//console.log(pArray)
let mArray=Math.max(...pArray)
//console.log(mArray)
return array.filter(member=>member.missed_votes_pct<=mArray)

}


function leastEngaged(array){
   let percentaAmount=Math.floor((array.length*10)/100)
   let pctArray=array.map(member=>member.missed_votes_pct).sort((a,b)=> b-a).slice(0,percentaAmount)
   
   //console.log(pctarray)
   let myArray=Math.min(...pctArray)
  // console.log(myArray)
 return array.filter(member=>member.missed_votes_pct >=myArray)
  

}
console.log(statistic)

function votesOfReps(array,partyCodeStr){
    //array.filter(votes=>votes.party===partyCodeStr)
    let myResult=array.filter(votes=>votes.party===partyCodeStr).map(votes=>votes.votes_with_party_pct)
    
   myResult=(myResult.reduce((a,b)=>a+b)/myResult.length)
 console.log(typeof(myResult))

  return myResult
   
    

}



//console.log(statistic)

function numberOfReps(array,partyCodeStr){
    
return array.filter(member=>(member.party===partyCodeStr)).length

}
//console.log(statistic)



function createSmallTable(object){
   let row1=document.getElementById("row-1")
   row1.insertCell().innerHTML=object.Number_of_Republican
   row1.insertCell().innerHTML=object.Votes_with_party_pct_Republican.toFixed(2)
   let row2=document.getElementById("row-2")
   row2.insertCell().innerHTML=object.Number_of_Democrate
   row2.insertCell().innerHTML=object.Votes_with_party_pct_Democrate.toFixed(2)
   let row3=document.getElementById("row-3")
   row3.insertCell().innerHTML=object.Number_of_Independent
   row3.insertCell().innerHTML=object.Votes_with_party_pct_Independent.toFixed(2)
   let row4=document.getElementById("row-4")
   row4.insertCell().innerHTML=object.Number_of_Democrate+object.Number_of_Republican+object.Number_of_Independent
   let toTalPercentage=(object.Votes_with_party_pct_Democrate+object.Votes_with_party_pct_Republican+object.Votes_with_party_pct_Independent)/3
   row4.insertCell().innerHTML=toTalPercentage.toFixed(2)
   
}
createSmallTable(statistic)

function createTable(array,tableIdStr){
   let leastEngaged_Table=document.getElementById(tableIdStr)
   array.forEach(member=>{
      let row=document.createElement("tr")
      if(member.middle_name){
         row.insertCell().innerHTML=member.first_name+" "+ member.middle_name+ " "+member.last_name
      }
      else{
         row.insertCell().innerHTML=member.first_name +" "+member.last_name
      }
      
      row.insertCell().innerHTML=member.party
      row.insertCell().innerHTML=member.missed_votes
      row.insertCell().innerHTML=member.missed_votes_pct
      //console.log(row)
      leastEngaged_Table.appendChild(row)
   })
   

}

createTable(statistic.least_engaged,"Least-Engaged")
createTable(statistic.most_engaged,"Most-Engaged")





