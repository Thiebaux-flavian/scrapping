let countPages = 0;
let countCand = 0;
let candidatValid = 0;
let candidat = 0;
let dataCand = new Array();
let doublepage = 0;
let pages = 0;
let validInfo = 0;
//GoogleSheet Outil => editeur le script => publier => en tant qu'application web  | récuperer l'addresse url //
let url = '#YOUR_SHEET_URL';


$('<div id="scrapperN"><label for="categorie"></label><input type="text" name="categorie" id="categorie"> <button id="btnScrap"> scrapping </button> </div>').appendTo('body');



$("#btnScrap").click(function(){
  $('#scrapperN').empty();
  $('#scrapperN').removeAttr('id');  
  
  getData();
});



//Fonction clique sur DOM//
function eventFire(el, etype){
  
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

function getData(){
  //Recupereration du nombre de candidat//
  pages = document.getElementsByClassName('search-heading')[0].children[0].children[0].innerHTML; // Total candidature
  pages = pages.replace(new RegExp("[^(0-9)]", "g"), '');
  pages = eval(pages);
  //clique sur le premier CV 
  let btn = document.getElementById('zoneAfficherTrancheCv1').children[0].children[0].children[0].children[0].children[0];
  eventFire(btn, 'click');
  let timer = setInterval(function(){
  let stop = infoPerso();
    if (stop == true){
      console.log('timer stop');
      clearInterval(timer);
    }
  }, 1000); 
}


function infoPerso(){

  if (document.querySelector('#zoneAfficherDetailProfil .description-aside .icon-group')){ //If volet droit 
    let domData = document.querySelector("#zoneAfficherDetailProfil .description-aside .icon-group"); //Info volet droit
    let mail = null;
    let tel = null;
    //Get Mail Data
      if (domData.querySelector('.icon-mail')){    
        let domMail = domData.querySelector(' .text-link'); //mail
        domMail = domMail.getAttribute('href');
        const regex = /mailto:/gi;
        mail = domMail.replace(regex, '');
      }
    //Get Tel Data
      if (document.querySelector('#zoneAfficherDetailProfil .description-aside .icon-phone')){ 
        let domMail = document.querySelector('#zoneAfficherDetailProfil .description-aside >.icon-group dd:last-child').innerHTML;
        const regexTel = /(?:\r\n|\r|\n)(?:\r\n|\r|\n)+/g;
        tel = domMail.replace(regexTel, '');
      } 
      dataCand[candidatValid] = new Array(),dataCand[candidatValid]['tel'] = tel, dataCand[candidatValid]['mail'] = mail;
      console.log(dataCand[candidatValid]['mail']);
      candidatValid++;
  }
  countPages++; //Compte la page même si pas d'info
  console.log(countPages + 'et ' + pages);
  if (countPages == pages){
    clearInterval(myTimer);
  }
  //Cherche le bouton suivant
  let btnSuivant = document.querySelector('#zoneAfficherDetailProfil .btn-actions-details .btn-group .next');
  eventFire(btnSuivant, 'click'); //Change fiche//
  console.log(dataCand);


  //Check les possibles doublons//
  if (validInfo > 0 && (dataCand[dataCand.length-1]['tel'] == dataCand[dataCand.length-2]['tel']) ||  (dataCand[dataCand.length-1]['mail'] == dataCand[dataCand.length-2]['mail'])){
    doublepage++;
    console.log('double page');
    candidatValid--;
    console.log(doublepage);
    if (doublepage >= 10){
      console.log('boucle infini stop ');
      return stopp = true;
    }
  }
  //Si la donnée n'est pas en doublon
  if (validInfo > 0 && (dataCand[dataCand.length-1]['tel'] != dataCand[dataCand.length-2]['tel']) ||  (dataCand[dataCand.length-1]['mail'] != dataCand[dataCand.length-2]['mail'])){
    doublepage = 0;
    console.log('reset double page');
    //Ajax les informations au GoogleSheet
    var jqxhr=$.ajax({
      url:url,
      method:"GET",
      dataType:"json",
      data: "mail="+dataCand[validInfo]['mail']+"&tel="+dataCand[validInfo]['tel'],
    }).done(function(){
      console.log('tes');});

  }
  validInfo++;
  }
