document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', (e) => {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key))) {
    e.preventDefault();
  }
});

// ==========================================
// 1. DONNÉES ET CONFIGURATION DES CORPS
// ==========================================
const ENSG_DATA = {
  Prim: ['----', 'معلم مدرسة ابتدائية', 'أستاذ التعليم الابتدائي', 'أستاذ التعليم الابتدائي قسم 1', 'أستاذ التعليم الابتدائي قسم 2', 'أستاذ مميز في التعليم الابتدائي'],
  Moy: ['----', 'أستاذ التعليم الأساسي', 'أستاذ التعليم المتوسط', 'أستاذ للتعليم المتوسط قسم 1', 'أستاذ للتعليم المتوسط قسم 2', 'أستاذ مميز في التعليم المتوسط '],
  Lycee: ['----', 'أستاذ التعليم الثانوي', 'أستاذ للتعليم الثانوي قسم 1', 'أستاذ للتعليم الثانوي قسم 2', 'أستاذ مميز في التعليم الثانوي'],
  Adm: ['----', 'ناظر في التعليم الابتدائي', 'ناظر في التعليم المتوسط', 'ناظر في التعليم الثانوي', 'مدير مدرسة ابتدائية', 'مدير متوسطة', 'مدير ثانوية'],
  Insp: ['----', 'مفتش التعليم الابتدائي', 'مفتش التعليم المتوسط', 'مفتش التعليم الثانوي'],
  Mch: ['----', 'مساعد التربية', 'مساعد رئيسي للتربية', 'مشرف التربية', 'مشرف رئيسي للتربية' , 'مشرف رئيس للتربية', 'مشرف عام للتربية', 'مربي متخصص', 'مربي متخصص رئيسي', 'مربي متخصص رئيس', 'مربي متخصص عام'],
};

// ==========================================
// 2. BASE DE DONNÉES DES GRADES
// ==========================================
// ==========================================
// 2. BASE DE DONNÉES COMPLÈTE ET CORRIGÉE DES GRADES
// ==========================================
const GRADES_CONFIG = {
  // --- 1. ENSEIGNEMENT PRIMAIRE ---
  'معلم مدرسة ابتدائية': {
    x: 10, tawthik: 2000, jouzafia: 2000, salbase: 653 * 45, gestion: 0,
    eche: [0, 33, 65, 98, 131, 163, 196, 229, 261, 294, 327, 359, 392]
  },
  'أستاذ التعليم الابتدائي': {
    x: 12, tawthik: 2500, jouzafia: 1500, salbase: 737 * 45, gestion: 0,
    eche: [0, 37, 74, 111, 147, 184, 221, 258, 295, 332, 369, 405, 442]
  },
  'أستاذ التعليم الابتدائي قسم 1': {
    x: 13, tawthik: 3000, jouzafia: 1500, salbase: 778 * 45, gestion: 0,
    eche: [0, 39, 78, 117, 156, 195, 233, 272.31, 350, 389, 428, 467] // Correction du point
  },
  'أستاذ التعليم الابتدائي قسم 2': {
    x: 14, tawthik: 3000, jouzafia: 1500, salbase: 821 * 45, gestion: 0,
    eche: [0, 41, 82, 123, 164, 205, 246, 287, 328, 369, 411, 452, 493]
  },
  'أستاذ مميز في التعليم الابتدائي': {
    x: 15, tawthik: 3000, jouzafia: 1500, salbase: 866 * 45, gestion: 0,
    eche: [0, 43, 87, 130, 173, 217, 260, 303, 346, 390, 433, 476, 520]
  },

  // --- 2. ENSEIGNEMENT MOYEN ---
  'أستاذ التعليم الأساسي': {
    x: 11, tawthik: 2500, jouzafia: 1500, salbase: 698 * 45, gestion: 0,
    eche: [0, 35, 70, 105, 140, 175, 209, 244, 279, 314, 349, 384, 419]
  },
  'أستاذ التعليم المتوسط': {
    x: 12, tawthik: 2500, jouzafia: 1500, salbase: 737 * 45, gestion: 0,
    eche: [0, 37, 74, 111, 147, 184, 221, 258, 295, 332, 369, 405, 442]
  },
  'أستاذ للتعليم المتوسط قسم 1': {
    x: 13, tawthik: 3000, jouzafia: 1500, salbase: 778 * 45, gestion: 0,
    eche: [0, 39, 78, 117, 156, 195, 233, 272.31, 350, 389, 428, 467] // Correction du point
  },
  'أستاذ للتعليم المتوسط قسم 2': {
    x: 15, tawthik: 3000, jouzafia: 1500, salbase: 866 * 45, gestion: 0,
    eche: [0, 43, 87, 130, 173, 217, 260, 303, 346, 390, 433, 476, 520]
  },
  'أستاذ مميز في التعليم المتوسط': {
    x: 16, tawthik: 3000, jouzafia: 1500, salbase: 913 * 45, gestion: 0,
    eche: [0, 46, 91, 137, 183, 228, 274, 320, 265, 411, 457, 502, 548]
  },

  // --- 3. ENSEIGNEMENT LYCÉE ---
  'أستاذ التعليم الثانوي': {
    x: 13, tawthik: 3000, jouzafia: 1500, salbase: 778 * 45, gestion: 0,
    eche: [0, 39, 78, 117, 156, 195, 233, 272.31, 350, 389, 428, 467] // Correction du point
  },
  'أستاذ للتعليم الثانوي قسم 1': {
    x: 14, tawthik: 3000, jouzafia: 1500, salbase: 821 * 45, gestion: 0,
    eche: [0, 41, 82, 123, 164, 205, 246, 287, 328, 369, 411, 452, 493]
  },
  'أستاذ للتعليم الثانوي قسم 2': {
    x: 16, tawthik: 3000, jouzafia: 1500, salbase: 913 * 45, gestion: 0,
    eche: [0, 46, 91, 137, 183, 228, 274, 320, 265, 411, 457, 502, 548]
  },
  'أستاذ مميز في التعليم الثانوي': {
    x: 17, tawthik: 3000, jouzafia: 1500, salbase: 962 * 45, gestion: 0,
    eche: [0, 48, 96, 144, 192, 241, 289, 337, 385, 433, 481, 529, 577]
  },

  // --- 4. PERSONNEL ADMINISTRATIF (NAZIR & DIRECTEURS) ---
  'ناظر في التعليم الابتدائي': {
    x: 14, tawthik: 3000, jouzafia: 1500, salbase: 821 * 45, gestion: 0,
    eche: [0, 41, 82, 123, 164, 205, 246, 287, 328, 369, 411, 452, 493]
  },
  'ناظر في التعليم المتوسط': {
    x: 15, tawthik: 3000, jouzafia: 1500, salbase: 866 * 45, gestion: 0,
    eche: [0, 43, 87, 130, 173, 217, 260, 303, 346, 390, 433, 476, 520]
  },
  'ناظر في التعليم الثانوي': {
    x: 16, tawthik: 3000, jouzafia: 1500, salbase: 913 * 45, gestion: 0,
    eche: [0, 46, 91, 137, 183, 228, 274, 320, 265, 411, 457, 502, 548]
  },
  'مدير مدرسة ابتدائية': {
    x: 15, tawthik: 3000, jouzafia: 1500, salbase: 866 * 45, gestion: 3000,
    eche: [0, 43, 87, 130, 173, 217, 260, 303, 346, 390, 433, 476, 520]
  },
  'مدير متوسطة': {
    x: 16, tawthik: 3000, jouzafia: 1500, salbase: 913 * 45, gestion: 4000,
    eche: [0, 43, 87, 130, 173, 217, 260, 303, 346, 390, 433, 476, 520]
  },
  'مدير ثانوية': {
    x: 17, tawthik: 3000, jouzafia: 1500, salbase: 962 * 45, gestion: 5000,
    eche: [0, 48, 96, 144, 192, 241, 289, 337, 385, 433, 481, 529, 577]
  },

  // --- 5. CORPS D'INSPECTION ---
  'مفتش التعليم الابتدائي': {
    x: 17, tawthik: 3000, jouzafia: 1500, salbase: 962 * 45, gestion: 0,
    eche: [0, 48, 96, 144, 192, 241, 289, 337, 385, 433, 481, 529, 577]
  },
  'مفتش التعليم المتوسط': {
    x: 17, tawthik: 3000, jouzafia: 1500, salbase: 962 * 45, gestion: 0,
    eche: [0, 48, 96, 144, 192, 241, 289, 337, 385, 433, 481, 529, 577]
  },
  'مفتش التعليم الثانوي': {
    x: 18, tawthik: 3000, jouzafia: 1500, salbase: 1130 * 45, gestion: 0,
    eche: [0, 57, 113, 170, 226, 283, 339, 396, 452, 509, 565, 622, 678]
  },
// --- 5. CORPS D'Conseille ---
 'مساعد التربية': {
    x: 7, tawthik: 2000, jouzafia: 2500, salbase: 548 * 45, gestion: 0,
    eche: [0, 27, 55, 82, 110, 137, 164, 192, 219, 247, 274, 301, 329]
  },


 'مساعد رئيسي للتربية': {
    x: 8, tawthik: 2000, jouzafia: 2500, salbase: 579 * 45, gestion: 0,
    eche: [0, 29, 58, 87, 116, 145, 174, 203, 232, 261, 290, 318, 347]
  },

  'مشرف التربية': {
    x: 10, tawthik: 2000, jouzafia: 2000, salbase: 653 * 45, gestion: 0,
    eche: [0, 33, 65, 98, 131, 163, 196, 229, 261, 294, 327, 359, 392]
  },
  'مشرف رئيسي للتربية': {
    x: 11, tawthik: 2500, jouzafia: 1500, salbase: 698 * 45, gestion: 0,
    eche: [0, 35, 70, 105, 140, 175, 209, 244, 279, 314, 349, 384, 419]
  },

  'مشرف رئيس للتربية': {
    x: 12, tawthik: 2500, jouzafia: 1500, salbase: 737 * 45, gestion: 0,
    eche: [0, 37, 74, 111, 147, 184, 221, 258, 295, 332, 369, 405, 442]
  },
   'مشرف عام للتربية': {
    x: 13, tawthik: 3000, jouzafia: 1500, salbase: 778 * 45, gestion: 0,
    eche: [0, 39, 78, 117, 156, 195, 233, 272.31, 350, 389, 428, 467]
  },
 'مربي متخصص': {
    x: 10, tawthik: 2000, jouzafia: 2000, salbase: 653 * 45, gestion: 0,
    eche: [0, 33, 65, 98, 131, 163, 196, 229, 261, 294, 327, 359, 392]
  },
  'مربي متخصص رئيسي':{
   x: 11, tawthik: 2500, jouzafia: 1500, salbase: 698 * 45, gestion: 0,
    eche: [0, 35, 70, 105, 140, 175, 209, 244, 279, 314, 349, 384, 419]
  },
   'مربي متخصص رئيس':{
   x: 12, tawthik: 2500, jouzafia: 1500, salbase: 737 * 45, gestion: 0,
    eche: [0, 37, 74, 111, 147, 184, 221, 258, 295, 332, 369, 405, 442]
  },

  'مربي متخصص عام':{
    x: 13, tawthik: 3000, jouzafia: 1500, salbase: 778 * 45, gestion: 0,
    eche: [0, 39, 78, 117, 156, 195, 233, 272.31, 350, 389, 428, 467]
  },
};


// ==========================================
// 3. VARIABLES D'ÉTAT GLOBALES
// ==========================================
let currentGradeData = null; 
let glob = 0;
let res3 = 0;
let resultat = 0;
let iss = 0;
let impo = 0;
let imposable = 0;
let Irg = "0.00";
let munat = 0;
let munatec = 0;
let tout = 0;
let jou = 90;
let nott = 40;
let Rndf = 0;
let Abscen = 30;
let abscmoins = 0;
let Netpay = 0;

// Variables de calcul spécifiques
let salaire = 0;
let Mehania = 0;
let terbaouia = 0;
let daam = 0;
let taehil = 0;
let Minha = 0;
let imtiyaz = 0;
let sakan = 0;
let zone = 0;
let gestion = 0;

// ==========================================
// 4. FONCTIONS D'INTERACTION UI
// ==========================================

function ChangeCorps() {
  const corpList = document.getElementById("choix");
  const modelList = document.getElementById("choix1");
  const selcorp = corpList.options[corpList.selectedIndex].value;

  // 1. Réinitialiser proprement le menu des grades
  modelList.options.length = 0; 
  modelList.options.add(new Option("- الرتبة -", ""));

  // 2. Si l'utilisateur clique sur le choix vide "- السلك -", on s'arrête là sans bloquer
 if (!selcorp) return;

  const anasir = ENSG_DATA[selcorp];
  if (anasir) {
    anasir.forEach((text) => {
      // On ignore la ligne de tirets '----' du tableau pour ne garder que les vrais grades
      if(text !== '----') {
         modelList.options.add(new Option(text, text));
      }
    });
  }
}


function changesous() {
  const objet = document.getElementById("choix1");
  const nomGrade = objet.options[objet.selectedIndex].text;

  if (GRADES_CONFIG[nomGrade]) {
    currentGradeData = GRADES_CONFIG[nomGrade];
  } else {
    currentGradeData = null;
  }
}

function visi() {
  const vis = parseInt(document.getElementById("Famillial").value, 10) || 0;
  const isDisabled = (vis === 0);

  document.getElementById("Nombre").disabled = isDisabled;
  document.getElementById("Conjt").disabled = isDisabled;

  if (isDisabled) {
    document.getElementById("Nombre").value = 0;
    document.getElementById("Conjt").value = 0;
  }
}

function notechange() {
  jou = parseFloat(document.getElementById("Jour").value) || 0;
  nott = parseFloat(document.getElementById("Note").value) || 0;
  Abscen = parseFloat(document.getElementById("jourT").value) || 0;
}

// ==========================================
// 5. FONCTIONS DE CALCULS FINANCIERS
// ==========================================

function myFunct() {
 if (!currentGradeData) return;


  // Récupération dynamique de la prime de gestion selon le grade (0 par défaut)
  gestion = currentGradeData.gestion !== undefined ? currentGradeData.gestion : 0;

   const mriRaw = document.getElementById("Conjt").value;

  res3 = parseFloat(mriRaw) || 0;
  const enfant = parseInt(document.getElementById("Nombre").value, 10) || 0;
  
  const objetSelect = document.getElementById("Select");
  const z = parseInt(objetSelect.options[objetSelect.selectedIndex].value, 10) || 0;

  const echelonValeur = currentGradeData.eche[z] !== undefined ? currentGradeData.eche[z] : 0;
  const salbase = currentGradeData.salbase;
  const x = currentGradeData.x;

  Mehania = parseFloat((echelonValeur * 45).toFixed(2));
  terbaouia = parseFloat((((z * 4) / 100) * salbase).toFixed(2));
  salaire = salbase + Mehania;
  daam = salaire * 0.45;

  if (x > 13 ) {
    taehil = salaire * 0.45;
    Minha = enfant * 300;
  } else {
    taehil = salaire * 0.40;
    Minha = enfant * 600;
  }
 
  if (x >= 11) {
    imtiyaz = salaire * 0.30;
    sakan = 1000;
    zone = 890.4;
  } else {
    imtiyaz = 0;
    sakan = 0;
    zone = 764.4;
  }
 if (x >= 17){
  zone = 1096.2;
}
  finaliserCalculSalaire();
}

function finaliserCalculSalaire() {
  const tawthikValeur = currentGradeData.tawthik || 0;
  const jouzafiaValeur = currentGradeData.jouzafia || 0;
  
  resultat = salaire + terbaouia + daam + taehil + tawthikValeur + jouzafiaValeur + zone + sakan + imtiyaz;
  iss = resultat * 0.09;
  
  impo = Math.floor((resultat - (iss + zone)) / 10);
  imposable = impo * 10;
  glob = Minha + res3 + gestion + resultat;

  let aa = 0, bb = 0, cc = 0, tt = 0;

  // Barème officiel IRG Algérie sécurisé
  if (imposable >= 0 && imposable <= 30000) {
    Irg = "0.00";
  } 
  else if (imposable >= 30001 && imposable <= 34999) {
    aa = (imposable - 20000) * 0.23;
    bb = aa * 0.4;
    cc = aa - bb;
    if (bb < 1000) {
      tt = aa - 1000;
      cc = (tt * (137 / 51)) - (27925 / 8);
    } else if (bb > 1500) {
      tt = aa - 1500;
      cc = (tt * (137 / 51)) - (27925 / 8);
    } else if (bb > 1000 && bb < 1500) {
      cc = ((aa - bb) * (137 / 51)) - (27925 / 8);
    }
    Irg = cc.toFixed(2);
  } 
  else if (imposable >= 35000 && imposable <= 40000) {
    aa = (imposable - 20000) * 0.23;
    bb = aa * 0.4;
    if (bb < 1000) cc = aa - 1000;
    else if (bb > 1500) cc = aa - 1500;
    else cc = aa - bb;
    Irg = cc.toFixed(2);
  } 
  else if (imposable >= 40001 && imposable <= 80000) {
    aa = (imposable - 40000) * 0.27;
    Irg = (aa + 3100).toFixed(2);
  } 
  else if (imposable >= 80001 && imposable <= 160000) {
    aa = (imposable - 80000) * 0.3;
    Irg = (aa + 13900).toFixed(2);
  } 
  else if (imposable >= 160001 && imposable <= 320000) {
    aa = (imposable - 160000) * 0.33;
    Irg = (aa + 37900).toFixed(2);
  } 
  else if (imposable > 320000) {
    aa = (imposable - 320000) * 0.35;
    Irg = (aa + 90700).toFixed(2);
  }
}

function mmuna() {
  munat = parseInt(document.getElementById("muna").value, 10) || 0;
  if (munat === 1) {
    munatec = 0.00;
  } else if (munat === 2) {
    munatec = resultat * 0.01;
  }
  tout = iss + parseFloat(Irg) + munatec;
}
 
// ==========================================
// 6. EXECUTION DE L'AFFICHAGE ET NAVIGATION
// ==========================================

function afficher() {


if (!currentGradeData) {
  alert("الرجاء اختيار السلك والرتبة أولاً");
   return;
 }


  myFunct(); 
  notechange();
  mmuna();
  
  Rndf = (nott / 40) * salaire * (jou / 30) * (0.4 * 0.819);
  Netpay = glob - tout;
  
  // Correction stricte du calcul de la retenue pour absence
  abscmoins = (30 - Abscen) * (Netpay / 30);
  Netpay = Netpay - abscmoins;

  // Injection ordonnée dans votre tableau HTML
  document.getElementById("demo").innerText = currentGradeData.x;
  document.getElementById("salb").innerText = currentGradeData.salbase.toFixed(2);
  document.getElementById("mehania").innerText = Mehania.toFixed(2);
  document.getElementById("terbouia").innerText = terbaouia.toFixed(2);
  document.getElementById("daam").innerText = daam.toFixed(2);
  document.getElementById("Taw").innerText = currentGradeData.tawthik.toFixed(2);
  document.getElementById("taehil").innerText = taehil.toFixed(2);
  document.getElementById("jouz").innerText = currentGradeData.jouzafia.toFixed(2);
  document.getElementById("zone").innerText = zone.toFixed(2);
  document.getElementById("imtiyaz").innerText = imtiyaz.toFixed(2);
  document.getElementById("sakan").innerText = sakan.toFixed(2);
  document.getElementById("gestion").innerText = gestion.toFixed(2);

  document.getElementById("global").innerText = glob.toFixed(2);
  document.getElementById("Enf").innerText = Minha.toFixed(2);
  document.getElementById("conj").innerText = res3.toFixed(2);
  document.getElementById("somme").innerText = resultat.toFixed(2);
  document.getElementById("imposable").innerText = imposable.toFixed(2);
  document.getElementById("iss").innerText = iss.toFixed(2);
  document.getElementById("irgl").innerText = Irg;
  document.getElementById("munate").innerText = munatec.toFixed(2);
  document.getElementById("absc").innerText = abscmoins.toFixed(2);
  document.getElementById("tout").innerText = tout.toFixed(2);
  document.getElementById("Nett").innerText = Netpay.toFixed(2);
  document.getElementById("rendement").innerText = Rndf.toFixed(2);

const montantEnLettres = fractionnerNombreEnLettres(Netpay);
  document.getElementById("net-en-lettres").innerText = montantEnLettres;




  
  // Changements d'états d'affichage écran
  document.getElementById('container').style.display = 'none';
  document.getElementById('palier').style.display = 'flex';
  document.querySelector('.action-buttons').style.display = 'flex'; 
}

function Retour() {
  document.getElementById('container').style.display = 'block';
  document.getElementById('palier').style.display = 'none';
  location.reload();
}

function voir() {
  // 1. Masquer le formulaire principal pour faire de la place
  document.getElementById('container').style.display = 'none';
  
  // 2. S'assurer que le tableau de résultats (le bulletin) reste bien caché
  document.getElementById('palier').style.display = 'none';
  
  // 3. Afficher la carte de présentation "À propos" au milieu
 // document.getElementById('aprop').style.display = 'block';
  document.getElementById('aprop').style.display = 'flex';
}

function cache() {
  // 1. Masquer la carte de présentation "À propos"
  document.getElementById('aprop').style.display = 'none';
  
  // 2. Réafficher le formulaire de saisie principal
  document.getElementById('container').style.display = 'block';
}


// 1. Fonction de conversion des nombres en lettres (Algorithme comptable adapté au Dinar Algérien)
function fractionnerNombreEnLettres(montant) {
  if (isNaN(montant) || montant === null) return "صفر دينار جزائري";

  const entier = Math.floor(montant);
  const centimes = Math.round((montant - entier) * 100);

  if (entier === 0 && centimes === 0) return "صفر دينار جزائري";

  // Tableaux des mots en arabe
  const ones = ["", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة"];
  const teens = ["عشرة", "أحد عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر", "خمسة عشر", "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر"];
  const tens = ["", "عشرة", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون"];
  const hundreds = ["", "مائة", "مائتان", "ثلاثمائة", "أربعمائة", "خمسمائة", "ستمائة", "سبعمائة", "ثمانمائة", "تسعمائة"];

  function convertirثلاثةأرقام(num) {
    let txt = "";
    const h = Math.floor(num / 100);
    const r = num % 100;
    const d = Math.floor(r / 10);
    const o = r % 10;

    // المئات
    if (h > 0) txt += hundreds[h];

    // الآحاد والعشرات
    if (r > 0) {
      if (txt !== "") txt += " و";
      if (d === 0) {
        txt += ones[o];
      } else if (d === 1) {
        txt += teens[o];
      } else {
        if (o > 0) {
          txt += ones[o] + " و" + tens[d];
        } else {
          txt += tens[d];
        }
      }
    }
    return txt.trim();
  }

  let resultatArabe = "";

  const millions = Math.floor(entier / 1000000);
  const milliers = Math.floor((entier % 1000000) / 1000);
  const reste = entier % 1000;

  // 1. الملايين
  if (millions > 0) {
    if (millions === 1) resultatArabe += "مليون";
    else if (millions === 2) resultatArabe += "مليونان";
    else if (millions >= 3 && millions <= 10) resultatArabe += convertirثلاثةأرقام(millions) + " ملايين";
    else resultatArabe += convertirثلاثةأرقام(millions) + " مليون";
  }

  // 2. الآلاف
  if (milliers > 0) {
    if (resultatArabe !== "") resultatArabe += " و";
    if (milliers === 1) resultatArabe += "ألف";
    else if (milliers === 2) resultatArabe += "ألفان";
    else if (milliers >= 3 && milliers <= 10) resultatArabe += convertirثلاثةأرقام(milliers) + " آلاف";
    else resultatArabe += convertirثلاثةأرقام(milliers) + " ألف";
  }

  // 3. الباقي (المئات والآحاد)
  if (reste > 0) {
    if (resultatArabe !== "") resultatArabe += " و";
    resultatArabe += convertirثلاثةأرقام(reste);
  }

  // إضافة العملة الرئيسية
  if (entier > 0) {
    if (entier >= 3 && entier <= 10) resultatArabe += " دنانير جزائرية";
    else resultatArabe += " دينار جزائري";
  }

  // 4. السنتيم (الكسور)
  if (centimes > 0) {
    if (resultatArabe !== "") resultatArabe += " و";
    if (centimes === 1) resultatArabe += "سنتيم واحد";
    else if (centimes === 2) resultatArabe += "سنتيمان";
    else if (centimes >= 3 && centimes <= 10) resultatArabe += convertirثلاثةأرقام(centimes) + " سنتيمات";
    else resultatArabe += convertirثلاثةأرقام(centimes) + " سنتيم";
  }

  return "أوقف هذا الكشف عند المبلغ التالي: " + resultatArabe;
}





function imprimerBulletin() {
  const aujourdhui = new Date();
  document.getElementById("date-print").innerText = aujourdhui.toLocaleDateString('fr-FR');
  window.print();
}
function exporterExcel() {
  if (!currentGradeData) {
    alert("الرجاء إجراء الحساب أولاً قبل التصدير");
    return;
  }

  const gradeSelected = document.getElementById("choix1").value;
  const dateFormatee = new Date().toLocaleDateString('fr-FR');

  // 1. Récupération dynamique de TOUTES les valeurs calculées dans le DOM
  const values = {
    salb: document.getElementById("salb").innerText,
    mehania: document.getElementById("mehania").innerText,
    terbouia: document.getElementById("terbouia").innerText,
    daam: document.getElementById("daam").innerText,
    Taw: document.getElementById("Taw").innerText,
    taehil: document.getElementById("taehil").innerText,
    jouz: document.getElementById("jouz").innerText,
    zone: document.getElementById("zone").innerText,
    imtiyaz: document.getElementById("imtiyaz").innerText,
    sakan: document.getElementById("sakan").innerText,
    gestion: document.getElementById("gestion").innerText,
    global: document.getElementById("global").innerText,
    Enf: document.getElementById("Enf").innerText,
    conj: document.getElementById("conj").innerText,
    somme: document.getElementById("somme").innerText,
    imposable: document.getElementById("imposable").innerText,
    iss: document.getElementById("iss").innerText,
    irgl: document.getElementById("irgl").innerText,
    munate: document.getElementById("munate").innerText,
    absc: document.getElementById("absc").innerText,
    tout: document.getElementById("tout").innerText,
    Nett: document.getElementById("Nett").innerText,
    rendement: document.getElementById("rendement").innerText,
    mention: document.getElementById("net-en-lettres").innerText
  };

  // 2. Construction du fichier Excel ligne par ligne (Format Comptable Vertical)
  let csvContent = `كشف راتب تفصيلي عمال التربية 2025\n`;
  csvContent += `تاريخ الاستخراج : ;${dateFormatee}\n`;
  csvContent += `الرتبة : ;${gradeSelected}\n\n`;
  
  // En-tête du tableau Excel
  csvContent += `العنصر (Libellé);المبلغ (Montant)\n`;
  
  // Injection de TOUTES les primes et retenues
  csvContent += `الأجر القاعدي;${values.salb}\n`;
  csvContent += `الخبرة المهنية;${values.mehania}\n`;
  csvContent += `الخبرة التربوية;${values.terbouia}\n`;
  csvContent += `منحة الدعم;${values.daam}\n`;
  csvContent += `منحة التوثيق;${values.Taw}\n`;
  csvContent += `منحة التأهيل;${values.taehil}\n`;
  csvContent += `منحة جزافية;${values.jouz}\n`;
  csvContent += `منحة المنطقة;${values.zone}\n`;
  csvContent += `منحة الامتياز;${values.imtiyaz}\n`;
  csvContent += `منحة السكن;${values.sakan}\n`;
  csvContent += `منحة التسيير;${values.gestion}\n`;
  csvContent += `------------------------;------------------------\n`;
  csvContent += `المجموع الخام;${values.global}\n`;
  csvContent += `المنح العائلية;${values.Enf}\n`;
  csvContent += `الأجر الوحيد;${values.conj}\n`;
  csvContent += `الخاضع ل ض إج;${values.somme}\n`;
  csvContent += `الخاضع للضريبة;${values.imposable}\n`;
  csvContent += `اقتطاع الضمان الاجتماعي;${values.iss}\n`;
  csvContent += `الالضريبة على الأجر (IRG);${values.irgl}\n`;
  csvContent += `اقتطاع التعاضدية;${values.munate}\n`;
  csvContent += `اقتطاع الغياب;${values.absc}\n`;
  csvContent += `مجموع الاقتطاعات;${values.tout}\n`;
  csvContent += `------------------------;------------------------\n`;
  csvContent += `الصافي للدفع (Net);${values.Nett}\n`;
  csvContent += `منحة المردودية;${values.rendement}\n\n`;
  
  // Ajout de la mention légale écrite en arabe tout en bas du fichier Excel
  csvContent += `${values.mention};\n`;

  // 3. Application du BOM UTF-8 pour un affichage de l'arabe instantané et propre dans Excel
  const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: "text/csv;charset=utf-8;" });
  
  // 4. Déclenchement automatique du téléchargement du fichier .csv
  const lien = document.createElement("a");
  const nomFichier = `كشف_راتب_كامل_${gradeSelected.replace(/ /g, "_")}.csv`;
  
  lien.href = URL.createObjectURL(blob);
  lien.setAttribute("download", nomFichier);
  document.body.appendChild(lien);
  lien.click();
  document.body.removeChild(lien);
}
