const sureler = { 
    pomodoro: 25,
    kisa: 5,
    uzun: 15
};
let calisiyorMu = false;
let sayacDongusu = null;
let kalanSure = sureler.pomodoro * 60;
let toplamSure = sureler.pomodoro * 60;
const modBtn = document.querySelectorAll(".mod-btn");
const sure = document.getElementById("sure-goster");
const baslaBtn = document.querySelector("#basla-btn");
let aktifMod = "pomodoro";
const ilerleme = document.getElementById("ilerleme");
let tamamlanan = 0;

modBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        modBtn.forEach(aktifBtn => {
            aktifBtn.classList.remove("aktif");
        })
        btn.classList.add("aktif");
        ilerleme.style.strokeDashoffset = 0;
        const secilenMod = btn.dataset.mod;
        aktifMod = secilenMod;
        kalanSure = sureler[secilenMod] * 60;
        toplamSure = sureler[secilenMod] * 60;
        clearInterval(sayacDongusu);
        calisiyorMu = false;
        baslaBtn.textContent = "▶ Başla";
        sure.innerText = saat(kalanSure);
    });
});

function baslatDurdur() {
    if(!calisiyorMu){
        calisiyorMu = true;
        baslaBtn.textContent = "⏸ Durdur";
        sayacDongusu = setInterval(() => {
            kalanSure--;
            const offset = 553 * (1 - kalanSure / toplamSure);
            ilerleme.style.strokeDashoffset = offset;
            sure.innerText = saat(kalanSure);
            if ( kalanSure === 0){
                tamamlanan++;
                document.getElementById("pomodoro-sayac").innerText = "🍅".repeat(tamamlanan);
                clearInterval(sayacDongusu);
                aktifMod = (aktifMod === "pomodoro") ? "kisa" : "pomodoro"
                kalanSure = sureler[aktifMod] * 60;
                toplamSure = sureler[aktifMod] * 60;
                sure.innerText = saat(kalanSure);
                ilerleme.style.strokeDashoffset = 0;
                modBtn.forEach(buton => {
                    buton.classList.remove("aktif");
                    if(buton.dataset.mod === aktifMod) buton.classList.add("aktif");
                })
                calisiyorMu = false;
                baslaBtn.textContent = "▶ Başla";
            }
        }, 1000);
    } else {
        calisiyorMu = false;
        baslaBtn.textContent = "▶ Başla";
        clearInterval(sayacDongusu);
    }
};

function sifirla() {
    calisiyorMu = false;
    clearInterval(sayacDongusu);
    kalanSure= sureler[aktifMod] * 60;
    ilerleme.style.strokeDashoffset = 0;
    sure.innerText = saat(kalanSure);
    baslaBtn.textContent = "▶ Başla";
    document.getElementById("pomodoro-sayac").innerText = "";
    tamamlanan = 0;

};

function saat(sure) {
    const dakika = Math.floor(sure / 60);
    const sn = sure % 60;
    const sonuc = (dakika < 10 ? "0" + dakika : dakika) +  ":" + (sn < 10 ? "0" + sn : sn);
    return sonuc;
};

function sureyiKaydet() {
    sureler.pomodoro = Number(document.getElementById("pomodoro-sure").value);
    sureler.uzun = Number(document.getElementById("uzun-sure").value);
    sureler.kisa = Number(document.getElementById("kisa-sure").value);
    kalanSure = sureler[aktifMod] * 60;
    toplamSure = sureler[aktifMod] * 60;
    sure.innerText = saat(kalanSure);
};