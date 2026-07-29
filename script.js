document.addEventListener("DOMContentLoaded", () => {
    const salaireInput = document.getElementById("salaireRef");
    const anneesInput = document.getElementById("annees");
    const moudjahidCheckbox = document.getElementById("isMoudjahid");
    const conjointCheckbox = document.getElementById("hasConjoint");
    const calculBtn = document.getElementById("btn-calcul");
    
    const resultBox = document.getElementById("result-box");
    const resultPlaceholder = document.getElementById("result-placeholder");
    const historyDrawer = document.getElementById("history-drawer");
    const toggleHistoryBtn = document.getElementById("btn-toggle-history");
    const closeHistoryBtn = document.getElementById("btn-close-history");
    const historyUl = document.getElementById("history-ul");
    const emptyMsg = document.getElementById("empty-msg");
    
    const resTaux = document.getElementById("res-taux");
    const resBrut = document.getElementById("res-brut");
    const resMajoration = document.getElementById("res-majoration");
    const rowMajoration = document.getElementById("row-majoration");
    const resCnas = document.getElementById("res-cnas");
    const resIrg = document.getElementById("res-irg");
    const resNet = document.getElementById("res-net");
    
    const errSalaire = document.getElementById("error-salaire");
    const errAnnees = document.getElementById("error-annees");
    const btnReturn = document.getElementById("btn-toggle-Ret");


    const BAREME_IRG = [
        { min: 240000, max: 480000, taux: 0.23 },
        { min: 480000, max: 960000, taux: 0.27 },
        { min: 960000, max: 1920000, taux: 0.30 },
        { min: 1920000, max: 3840000, taux: 0.33 },
        { min: 3840000, max: Infinity, taux: 0.35 }
    ];

    const SNMG = 20000; 
    const MONTANT_MAJORATION_CONJOINT = 2500; 

    toggleHistoryBtn.addEventListener("click", () => historyDrawer.classList.toggle("open"));
    closeHistoryBtn.addEventListener("click", () => historyDrawer.classList.remove("open"));

    function calculerRetraite() {
        const salaireRef = parseFloat(salaireInput.value);
        const annees = parseInt(anneesInput.value);
        const isMoudjahid = moudjahidCheckbox.checked;
        const hasConjoint = conjointCheckbox.checked;
        let valide = true;

        if (isNaN(salaireRef) || salaireRef <= 0) {
            errSalaire.style.display = "block";
            valide = false;
        } else { errSalaire.style.display = "none"; }

        if (isNaN(annees) || annees < 1 || annees > 40) {
            errAnnees.style.display = "block";
            valide = false;
        } else { errAnnees.style.display = "none"; }

        if (!valide) {
            resultBox.style.display = "none";
            resultPlaceholder.style.display = "block";
            return;
        }

        let tauxApplique = 0;
        let plafondTaux = 80;
        let minimumPensionBrute = 15000; 

        if (isMoudjahid) {
            tauxApplique = (annees * 2) * 3.5; 
            plafondTaux = 100; 
            minimumPensionBrute = 2.5 * SNMG; 
        } else {
            tauxApplique = annees * 2.5;
            plafondTaux = 80;
        }

        if (tauxApplique > plafondTaux) tauxApplique = plafondTaux;

        let pensionBrute = salaireRef * (tauxApplique / 100);
        if (pensionBrute < minimumPensionBrute) pensionBrute = minimumPensionBrute;

        let majoration = 0;
        if (hasConjoint) {
            majoration = MONTANT_MAJORATION_CONJOINT;
            resMajoration.innerText = `+${formatCurrency(majoration)}`;
            rowMajoration.style.display = "flex";
        } else {
            rowMajoration.style.display = "none";
        }

        let totalBrutMensuel = pensionBrute + majoration;
        const retenueCnas = totalBrutMensuel * 0.02;

        let baseImposableIRG = Math.floor((totalBrutMensuel - retenueCnas) / 10) * 10;
        let montantIRG = 0;

        if (baseImposableIRG > 30000) {
            const annuel = baseImposableIRG * 12;
            let irgAnnuelBrut = 0;

            BAREME_IRG.forEach(tranche => {
                if (annuel > tranche.min) {
                    const imposableTranche = Math.min(annuel, tranche.max) - tranche.min;
                    irgAnnuelBrut += imposableTranche * tranche.taux;
                }
            });

            let irgMensuelBrut = irgAnnuelBrut / 12;
            let abattement = irgMensuelBrut * 0.40;
            if (abattement < 1000) abattement = 1000;
            if (abattement > 1500) abattement = 1500;
            
            montantIRG = irgMensuelBrut - abattement;

            if (baseImposableIRG > 30000 && baseImposableIRG < 35000) {
                montantIRG = montantIRG * (137 / 51) - (27925 / 8);
            }
            montantIRG = Math.max(0, montantIRG);
        }

        const pensionNette = totalBrutMensuel - retenueCnas - montantIRG;

        resTaux.innerText = `${tauxApplique} %`;
        resBrut.innerText = formatCurrency(pensionBrute);
        resCnas.innerText = `-${formatCurrency(retenueCnas)}`;
        resIrg.innerText = `-${formatCurrency(montantIRG)}`;
        resNet.innerText = formatCurrency(pensionNette);

        resultPlaceholder.style.display = "none";
        resultBox.style.display = "block";

        ajouterA_Historique(salaireRef, annees, pensionNette, isMoudjahid, hasConjoint);
    }

    function formatCurrency(valeur) {
        return `${valeur.toLocaleString('ar-DZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} دج`;
    }

    function ajouterA_Historique(salaire, ans, net, moudjahid, conjoint) {
        if (emptyMsg) emptyMsg.style.display = "none";

        const li = document.createElement("li");
        li.className = "history-item";
        
        let badges = '';
        if (moudjahid) badges += '<span class="badge-moudjahid">مجاهد</span>';
        if (conjoint) badges += '<span class="badge-conjoint">+كفالة الزوج</span>';

        li.innerHTML = `
            <div>
                <strong>${formatCurrency(net)}</strong>
                <div class="details">${ans} سنة اشتراكات (المرجع: ${salaire.toLocaleString('ar-DZ')} دج) ${badges}</div>
            </div>
            <span style="color: var(--text-muted); font-size: 0.7rem;">${new Date().toLocaleTimeString('ar-DZ')}</span>
        `;

        historyUl.insertBefore(li, historyUl.firstChild);
    }

    calculBtn.addEventListener("click", calculerRetraite);
    [salaireInput, anneesInput].forEach(input => {
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") calculerRetraite();
        });
    });

    // === الكود البرمجي للربط التلقائي ===
    const salaireTransfere = localStorage.getItem("salaireImposableEducation");
    
    if (salaireTransfere) {
        salaireInput.value = parseFloat(salaireTransfere).toFixed(2);
        anneesInput.value = 32; 
        calculBtn.click();
        localStorage.removeItem("salaireImposableEducation");
    }
        // événement pour le bouton Retour
    btnReturn.addEventListener("click", () => {
        // Nettoyer le localStorage par sécurité avant de quitter
        localStorage.removeItem("salaireImposableEducation");
        
        // Remplacez 'salaire.html' par le nom réel de votre fichier de salaire de l'Éducation Nationale
        window.location.href = "index.html"; 
    });

});
