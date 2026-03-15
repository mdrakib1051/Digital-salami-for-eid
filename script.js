const showPage = (id) => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
};

document.getElementById('startBtn').onclick = () => showPage('page2');

document.getElementById('infoNextBtn').onclick = () => {
    const name = document.getElementById('nameInput').value;
    if(!name) return alert("নাম লিখুন!");
    
    // লোডার দেখানো
    document.getElementById('loaderOverlay').classList.remove('hidden');
    
    setTimeout(() => {
        document.getElementById('loaderOverlay').classList.add('hidden');
        document.getElementById('resName').innerText = name;
        document.getElementById('resAmt').innerText = Math.floor(Math.random() * 900) + 100;
        showPage('page3');
    }, 2000);
};
