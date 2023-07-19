var websites = [];

var siteNameInput = document.getElementById('siteNameInput');
var siteUrlInput = document.getElementById('siteUrlInput');
var submitButton = document.getElementById('submitButton');
var visitBtn = document.getElementById('visitBtn');
var existModal = new bootstrap.Modal(document.getElementById('exampleModal'));
var rulesModal = new bootstrap.Modal(document.getElementById('myModal'));
nameRegex = /^\w{3,}$/ig;
urlRegex = /(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?/ig;



checkWebsitesInLocalStorage()



siteNameInput.addEventListener("keyup", function () {
    if (siteNameInput.value.match(nameRegex)) {
        siteNameInput.classList.add("is-valid")
        siteNameInput.classList.remove("is-invalid")
    } else {
        siteNameInput.classList.add("is-invalid")
      

        
    }
})
siteUrlInput.addEventListener("keyup", function () {
    if (siteUrlInput.value.match(urlRegex)) {
        siteUrlInput.classList.add("is-valid")
        siteUrlInput.classList.remove("is-invalid")
    } else {
        siteUrlInput.classList.add("is-invalid")
        

    }
})


function addWebsite() {
    var name = siteNameInput.value
    var url = siteUrlInput.value
    var existWebsite = websites.find(website => website.name === name);
    var existWebsiteUrl = websites.find(website => website.url === url);

    if (existWebsite || existWebsiteUrl) { // No repeated Bookmark name or Bookmark URL
        existModal.show();
        return;
    }
    if (name.match(nameRegex) && url.match(urlRegex)) {
        websites.push({name,url})
        clearForm()
        updateData()
    } else {
        rulesModal.show();
    }
    
 
    
}
submitButton.addEventListener("click", addWebsite)


function clearForm() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
    siteNameInput.classList.remove("is-valid")
    siteUrlInput.classList.remove("is-valid")
}


function displayWebsite() {
    var trs = "";

    for (i = 0; i < websites.length; i++){
        trs += `
    <tr>
        <td>${i+1}</td>
        <td>${websites[i].name}</td>
        <td> <a href="${websites[i].url}"  target="_blank" id="visitBtn"><button class="btn btn-outline-success" ><i class="fa-solid fa-eye"></i> Visit</button></a></td>
        <td><button class="btn btn-outline-danger delete" id="deleteBtn" onclick="deleteWebsite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>
        `
    }
    document.getElementById("tbody").innerHTML = trs;
     
}

function deleteWebsite(index) {
    websites.splice(index, 1);

    updateData()
}



function updateData() {
    displayWebsite();
    localStorage.setItem("websites", JSON.stringify(websites));
}


function checkWebsitesInLocalStorage() {
    if (localStorage.getItem("websites") != null) {
        websites = JSON.parse(localStorage.getItem("websites"));
        displayWebsite()
    }
}
