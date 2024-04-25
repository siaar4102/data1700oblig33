$(function (){
    hentAlleFilmer();
});

function hentAlleFilmer() {
    $.get("/hentFilmer", function (filmer) {
        formaterFilmer(filmer);
    });
}

    function formaterFilmer(filmer) {
    let ut = "<select id = 'valgtFilm'>"
    let forrigeFilm = "";
    ut += "<option >Velg film</option>";

    for (const film of filmer) {
        if(filmer.velgFilm !== forrigeFilm) {
            ut += `<option>${film.velgFilm}</option>`;
        }
        forrigeFilm = film.velgFilm;
    }
    ut += "</select>";
    $("#velgFilm").html(ut);
}


function kjop() {
    if(!validateInputs()){
        return;
    }

    const kinoReservasjon = {
        velgFilm: $("#valgtFilm").val(), //henter inn fra input-feltene ved hjelp av jquery
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val(),
    }

    $.post("/lagre", kinoReservasjon, function () { //sender til server
        hentAlle();
    });

    $("#valgtFilm").val(""); //tømmer alle feltene
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#telefonnr").val("");
    $("#epost").val("");
}

function hentAlle() {
    $.get("/hentAlle", function(billetter) {
        formaterData(billetter);
    });
}

function formaterData(billetter) {
    let ut =
        "<table class='table table-striped'><tr>" +
        "<th>Film: </th><th>Antall: </th>" +
        "<th>Fornavn: </th><th>Etternavn: </th><th>Telefonnr: </th><th>Epost: </th>" +
        "</tr>";
    for (const i of billetter) {
        ut += "<tr>";
        ut += "<td>" + i.velgFilm + "</td><td>" + i.antall + "</td>";
        ut += "<td>" + i.fornavn + "</td><td>" + i.etternavn + "</td><td>" + i.telefonnr + "</td><td>" + i.epost + "</td>";
        ut += "</tr>";
    }
    ut += "</table";
    $("#utInformasjon").html(ut);
}

function slett() {
    $.get("/slett", function() {
        hentAlle();
    });
}


function validatePhoneNumber(phoneNumber)
{
    let phoneRegex=/^\d{8}$/;
    return phoneRegex.test(phoneNumber);
}

function validateEmail(email)
{
    let emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateInputs()
{
    let fornavn=document.getElementById("fornavn").value.trim();
    let etternavn=document.getElementById("etternavn").value.trim();
    let telefonnr=document.getElementById("telefonnr").value.trim();
    let epost=document.getElementById("epost").value.trim();
    let antall=document.getElementById("antall").value.trim();

    let fornavnError=document.getElementById("fornavnError");
    let etternavnError=document.getElementById("etternavnError");
    let telefonnrError=document.getElementById("telefonnrError");
    let epostError=document.getElementById("epostError");
    let antallError=document.getElementById("antallError");

    let isValid=true;

    if(fornavn===""){
        fornavnError.textContent="Fornavn må fylles ut";
        isValid=false;
    }else{
        fornavnError.textContent="";
    }

    if(etternavn===""){
        etternavnError.textContent="Etternavn må fylles ut";
        isValid=false;
    }else{
        etternavnError.textContent="";
    }

    if(!validatePhoneNumber(telefonnr)){
        telefonnrError.textContent="Telefonnummer må være 8 siffer";
        isValid=false;
    }else{
        telefonnrError.textContent="";
    }

    if(!validateEmail(epost)){
        epostError.textContent="Epostadresse må være i riktig format";
        isValid=false;
    }else{
        epostError.textContent="";
    }
    if(antall===""||isNaN(antall)||parseInt(antall)<1){
        antallError.textContent="Skriv inn noe antall";
        isValid=false;
    }else{
        antallError.textContent="";
    }

    return isValid;
}
/*
function slett(){
    while(utInformasjon.length!=0){
        utInformasjon.pop()
    }

    let utInformasjonElement=document.getElementById("utInformasjon");
    utInformasjonElement.innerHTML="";
}

 */