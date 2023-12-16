var siteNameInput =document.getElementById("sitename");
var siteLinkInput= document.getElementById("sitelink");

//array for books
var booklist=[]
if(localStorage.getItem('products') !== null)  {
    // JSON
    
    booklist = JSON.parse( localStorage.getItem('products')  )
    displaylist();
}


//function to add new book
function addNewBook () {
//validate input values
if(validateName()===true)
    {
        if(validateURL()===true){
            //creating new object
            var book={
                name:siteNameInput.value,
                url:siteLinkInput.value
            };
            //push book object to booklist array
            booklist.push(book)
            //Set booklist at localStorage
            SetbooklistatlocalStorage()
            //clear inputs
            clearInputs();
            displaylist()
        }
        else{
            alert('Site URL must be a valid one')
        }
    }
    else{
        alert('Site name must contain at least 3 characters'+'\n'+'Site URL must be a valid one')
    }
}




function SetbooklistatlocalStorage(){
    localStorage.setItem('products' , JSON.stringify(booklist))
    displaylist();
}


function displaylist(){
    var table=``;
    for(var i=0; i<booklist.length; i++){
        table +=`<tr>
            <td>${i+1}</td>
            <td>${booklist[i].name}</td>
            <td><button class="btn btn-success" onclick="visit(${i})">
            <i class="fa-regular fa-eye"></i>
            Visit
            </button></td>
            
            <td><button type="button" class="btn btn-danger" onclick="deletebokmark(${i})">
            <i class="fa-solid fa-trash"></i>
            Delete
            </button></td>
        </tr>`
    }
    console.log(table);
    document.getElementById('tableContent').innerHTML=table
}

function clearInputs() {
    
    siteNameInput.value="";
    siteLinkInput.value="";
}

function deletebokmark(index) {
    //delete from book object
    booklist.splice(index , 1);
    console.log(booklist);
    //delete from list
    displaylist()
    //local storage
    SetbooklistatlocalStorage()
    
}

function visit(index){
    var httpsRegex= /^https?:\/\//;
    if(httpsRegex.test(booklist[index].url)){
        open(booklist[index].url);
    }
    else{
        open(`https://${booklist[index].url}.com`);
    }
}


//validate site name
function validateName(){
var sitenameREGEX=/^[a-zA-Z]{3,}$/;
if(sitenameREGEX.test(siteNameInput.value)===true){
    return true;
}
else{
    return false;
}
}

//validate url
function validateURL(){
    var siteurlREGRX=/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    if(siteurlREGRX.test(siteLinkInput.value)===true){
        return true;
    }
    else{
        return false;
    }
    
}