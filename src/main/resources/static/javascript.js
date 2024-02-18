const utInformasjon= [];

function visPersonRegister() {
    let ut =
        "<table><tr" +
        "<th>Filmer</th><th>Antall</th>" +
        "<th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>" +
        "</tr>";

    for (let i of utInformasjon) {
        ut += "<tr>";
        ut += "<td>" + i.velgFilm + "</td><td>" + i.antall + "</td>";
        ut += "<td>" + i.fornavn + "</td><td>" + i.etternavn + "</td><td>" + i.telefonnr + "</td><td>" + i.epost + "</td>";
        ut += "</tr>";
    }
    document.getElementById("utInformasjon").innerHTML = ut;
}

function kjop(){
    if(!validateInputs()){
        return;
    }

    let fornavn=document.getElementById("fornavn").value.trim();
    let etternavn=document.getElementById("etternavn").value;
    let telefonnrS=document.getElementById("telefonnr").value;
    let epost=document.getElementById("epost").value;
    let velgFilm=document.getElementById("velgFilm").value;
    let antall=document.getElementById("antall").value;
    let telefonnr=Number(telefonnrS);

    const person={
        fornavn:fornavn,
        etternavn:etternavn,
        telefonnr:telefonnr,
        epost:epost,
        velgFilm:velgFilm,
        antall:antall
    };

    utInformasjon.push(person);
    document.getElementById("fornavn").value="";
    document.getElementById("etternavn").value="";
    document.getElementById("telefonnr").value="";
    document.getElementById("epost").value="";
    document.getElementById("velgFilm").value="";
    document.getElementById("antall").value="";

    visPersonRegister();
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

function slett(){
    while(utInformasjon.length!=0){
        utInformasjon.pop()
    }

    let utInformasjonElement=document.getElementById("utInformasjon");
    utInformasjonElement.innerHTML="";
}