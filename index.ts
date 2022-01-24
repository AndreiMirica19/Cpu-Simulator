
let source=process.argv.slice(2);
var ss:string[]=new Array
if(source[0]==null){
   console.log("USAGE: node index.js filename.asm")   
}
else
if(source[0].includes(".asm")){
let memlength=0
let memArray:number[]=new Array;
if(source[1]!=null)
memlength=parseInt(source[1]);
for(let i=0;i<memlength;i++)
memArray[i]=0
var fileInput = require('fs')
let s=""
s = fileInput.readFileSync(source[0],'utf8');
ss= s.split(/\n\r?/);

let stack:number[]=new Array;
let i=-1
let jumpInd=-1;
let n=ss.length
let R:number | undefined;
while(i<n){
    i++;
    if(ss[i]!=undefined){
    ss[i]=deleteFirstSpaces(ss[i])
  //console.log(stack+"-----"+ss[i]+"----------"+memArray+"----------"+R)
   if(ss[i].includes("nop")||ss[i]=="")
   continue
   else
   if((ss[i]=="push "+findNumberRaw(ss[i]))||(ss[i]==containsLabel(ss[i])+"push "+findNumberRaw(ss[i])))
   stack.push(findNumber(ss[i]))
   else
   if(ss[i]=="pop"&&stack.length>0||(ss[i]==containsLabel(ss[i])+"pop")&&stack.length>0)
   stack.pop();
   else
   if(ss[i]=="pop"&&stack.length==0||(ss[i]==containsLabel(ss[i])+"pop")&&stack.length==0){
       console.log("ERROR (pop): stack underflow")
   }
   else
   if(ss[i]=="load"){
       R=stack.pop();
     
   }
   else
   if(ss[i]=="store"&&R!=null||(ss[i]==containsLabel(ss[i])+"store")&&R!=null){

   stack.push(R)
   R=0;
   }
   else
   if(ss[i]=="add"&&stack.length>1||(ss[i]==containsLabel(ss[i])+"add")&&stack.length>1){
      let x=stack.pop();
      let y=stack.pop();
      if(x!=null&&y!=null)
      stack.push(x+y) 
   }
   else
   if(ss[i]=="sub"&&stack.length>1||(ss[i]==containsLabel(ss[i])+"sub")&&stack.length>1){
    let x=stack.pop();
    let y=stack.pop();
    if(x!=null&&y!=null)
    stack.push(y-x) 
 }
 else
 if(ss[i]=="mul"&&stack.length>1||(ss[i]==containsLabel(ss[i])+"mul")&&stack.length>1){
    let x=stack.pop();
    let y=stack.pop();
    if(x!=null&&y!=null)
    stack.push(x*y) 
 }
 else
 if(ss[i]=="div"&&stack.length>1||(ss[i]==containsLabel(ss[i])+"div")&&stack.length>1){
    let x=stack.pop();
    let y=stack.pop();
    if(x!=null&&y!=null)
    stack.push(Math.floor(y/x)) 
 }
 else
 if(ss[i]=="mod"&&stack.length>1||(ss[i]==containsLabel(ss[i])+"mod")&&stack.length>1){
    let x=stack.pop();
    let y=stack.pop();
    if(x!=null&&y!=null)
    stack.push(y%x) 
 }
 else if(ss[i]=="mod"||ss[i]=="div"||ss[i]=="mul"||ss[i]=="sub"||ss[i]=="add")
 console.log("ERROR ("+ss[i]+"): stack underflow");
 else 
  if(ss[i]=="jump "+jumpNr(ss[i])||(ss[i]==containsLabel(ss[i])+"jump"+jumpNr)){
      let x=jumpNr(ss[i]);
      if(typeof x=="number"){
        if(x-1>=ss.length){
        console.log("ERROR (jump): invalid jump address "+x);
      
        }
        else
        i=x-2;    
      
      }
      if(typeof x=="string"){
      if(searchJumpAdress(x,ss,i)!=-1){
       i=(searchJumpAdress(x,ss,i))-1
    
        
      }
      else
      console.log("ERROR (jump): undefined label "+x)
      }
  }
  else
  if((ss[i]=="jumpz "+jumpNr(ss[i])&&stack[stack.length-1]==0)||(ss[i].includes("jumpz")&&ss[i].includes(containsLabel(ss[i]))&&stack[stack.length-1]==0))
 {
    let x=jumpNr(ss[i]);
    if(typeof x=="number"){
      if(x-1>=ss.length){
      console.log("ERROR (jump): invalid jump address "+x);
    
      }
      else
      i=x-2;    
    
    }
    if(typeof x=="string"){
    if(searchJumpAdress(x,ss,i)!=-1){
     i=(searchJumpAdress(x,ss,i))-1
  
      
    }
    else
    console.log("ERROR (jump): undefined label "+x)
    }
}
  else
  if(ss[i].includes("jumpz")&&stack[stack.length-1]!=0
  ||(ss[i].includes("jumpz")&&ss[i].includes(containsLabel(ss[i]))&&stack[stack.length-1]!=0)){
   continue;
  }
  else
  if(ss[i].includes("jumpnz")&&stack[stack.length-1]!=0 
  ||(ss[i].includes("jumpnz")&&ss[i].includes(containsLabel(ss[i]))&&stack[stack.length-1]!=0)){
    let x=jumpNr(ss[i]);
    if(typeof x=="number"){
      if(x-1>=ss.length){
      console.log("ERROR (jump):invalid jump adress "+x);
    
      }
      else
      i=x-2;    
    
    }
    if(typeof x=="string"){
    
     i=(searchJumpAdress(x,ss,i))-1
  
   
    }
  }
  else
  if(ss[i]=="print"&&stack.length>0||(ss[i]==containsLabel(ss[i])+"print"&&stack.length>0))
  console.log(stack[stack.length-1])
  else
  if(ss[i]=="print"&&stack.length==0||(ss[i]==containsLabel(ss[i])+" print"&&stack.length==0))
  console.log("ERROR (print): stack underflow")
  else
  if(ss[i].includes("stack")){
      if(stack.length==0)
      console.log("[ ]")
      else{
    var str = "[ "+stack.join(' ')+" ]";
  console.log(str);
      }
  }
  else
  if(ss[i]=="read"||ss[i]==containsLabel(ss[i])+"read"){
    if(stack.length>0){
      if((stack[stack.length-1]!=null&&memlength!=undefined)){
        if(memlength<stack[stack.length-1]||stack[stack.length-1]<0){
         console.log("ERROR (read): wrong address " +stack[stack.length-1])
        }
      
        else{
          let b=stack.pop()
          if(b!=undefined)
         stack.push(memArray[b])
        }
      }
    }
    else
    console.log("ERROR (read): stack underflow")
  }
  else
   if(ss[i]=="write"||ss[i]==containsLabel(ss[i])+"write"){
    if(stack.length>1){
     if(stack[stack.length-2]!=null&&memlength!=undefined){
      if(memlength<stack[stack.length-1]||stack[stack.length-1]<0){
        console.log("ERROR (write): wrong address " +stack[stack.length-1])
       }
       else{
        let a=stack.pop();
       let b=stack.pop();
       if(b!=undefined&&a!=undefined)
        memArray[a]=b;
        }
       
   }
 
  }
  else
  console.log ("ERROR (write): stack underflow") 
}
  
  else{
    if(first_word(ss[i],ss,i)==false)
      console.log("ERROR ("+ss[i]+"): unknown instruction");
      
  }

  
    }
   
 
}


}

function containsLabel(s:string):string{
  let labels=""
  for(let i=0;i<s.length;i++){
    labels+=s[i]
    if(s[i]==" ")
    break
  }
  return labels;
}
function findNumber(s:string):number{
    let nr="";
    let index=0
    for(let i=0;i<s.length;i++){
      if(s[i]==" ")
      index=i
    }
    for(let i=index;i<s.length;i++)
    if(s[i]>='0'&&s[i]<='9'||s[i]=="."||s[i]=="-")
    nr+=s[i]
    let nrr = parseFloat(nr)
    nrr=Math.floor(nrr)
    return nrr;
}
function findNumberRaw(s:string):number{
    let nr="";let index=0
    for(let i=0;i<s.length;i++){
      if(s[i]=="p")
      index=i
    }
    for(let i=index;i<s.length;i++)
    if(s[i]>='0'&&s[i]<='9'||s[i]=="."||s[i]=="-")
    nr+=s[i]
    let nrr = parseFloat(nr)
    return nrr;
}

function jumpNr(s:string):number|string{
    let nr="";
    let ss="";
    let b=false;
    if(s.includes("jump")&&!s.includes("jumpz")&&!s.includes("jumpnz")){
   
      let index=5
      let space=0
      for(let i=0;i<s.length;i++){
        if(s[i]==" ")
        space++;
        if(space==2){
        index=i+1;
        break;
        }
      }
     for(let i=index;i<s.length;i++){
         if(s[i]>='0'&&s[i]<='9'&&b==false)
         nr+=s[i]
         else{
         ss+=s[i];
         b=true;
         }
     }
    }
  
   else
   if(s.includes("jumpz")&&!s.includes("jumpnz")){
     let index=6
     let space=0
     for(let i=0;i<s.length;i++){
       if(s[i]==" ")
       space++;
       if(space==2){
       index=i+1;
       break;
       }
     }
    for(let i=index;i<s.length;i++){
        if(s[i]>='0'&&s[i]<='9'&&b==false)
        nr+=s[i]
        else{
          ss+=s[i];
          b=true;
          }
    }
   }
   else{
    let index=7
     let space=0
     for(let i=0;i<s.length;i++){
       if(s[i]==" ")
       space++;
       if(space==2){
       index=i+1;
       break;
       }
     }
    for(let i=index;i<s.length;i++){
        if(s[i]>='0'&&s[i]<='9'&&b==false)
        nr+=s[i]
        else{
          ss+=s[i];
          b=true;
          }
    }

   
}
    
    if(nr!=""&&ss=="")
    return parseInt(nr);
    else return ss;
}



function deleteFirstSpaces(s:string):string{
    let ss=s;let c=0

    for(let i=0;i<s.length;i++){
        if(s[i]!=" "){
        c=i;
        break;
        }
    }
    ss=s.substr(c,s.length)
    let h=undefined
    let sss=""
    for(let i=0;i<ss.length;i++){
        if(ss[i]!=":"){
        h=i;
        sss+=ss[i]
        }
    }
   if(h!=undefined){
    return sss
   }
    return ss;
}
 function searchJumpAdress(s:string,ss:string[],d:number):number{
    let x=-1
  for(let i=0;i<ss.length;i++){
     if(ss[i].includes(s)&&i!=d){
     x=i
     break
     }
  }
    return x;
 }
 function first_word(s:string,ss:string[],d:number):boolean{
  let x=-1
  let c=0
  let sss=""
  for(let i=0;i<s.length;i++){
    if(s[i]==" "){
    c=i;
    break;
    }
}
sss=s.substr(0,c-1)
for(let i=0;i<ss.length;i++){
   if(ss[i].includes(sss)&&i!=d&&ss[i].includes("jump")||ss[i].includes("jumpz")||ss[i].includes("jumpnz")){
   x=i
   break
   }
}
  if(x==-1)
  return false
  return true
}