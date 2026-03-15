// রাকিবের অরিজিনাল লজিক + লোডার ট্রিগার
const loaderOverlay = document.getElementById('loaderOverlay');
// ... (বাকি সব const আগের মতোই থাকবে) ...

function changePage(currentPage, nextPage) {
  currentPage.classList.remove('active');
  currentPage.classList.add('exit-left');
  setTimeout(() => { nextPage.classList.add('active'); }, 220);
}

saveInfoBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const district = districtInput.value;
  if (!name || !district) { alert('সব তথ্য দিন!'); return; }

  savedName = name; savedDistrict = district;

  // লোডার চালু
  loaderOverlay.classList.remove('hidden');
  setTimeout(() => {
    loaderOverlay.classList.add('hidden');
    changePage(page2, page3);
  }, 1500);
});

spinBtn.addEventListener('click', () => {
  if (rolling) return;
  rolling = true;
  statusText.textContent = 'আপনার সালামি তৈরি হচ্ছে...';
  startSlotAnimation();

  setTimeout(() => {
    stopSlotAnimation();
    currentAmount = Math.floor(Math.random() * 100) + 1;
    // ... তোর বাকি রেজাল্ট লজিক ...
    
    loaderOverlay.classList.remove('hidden');
    setTimeout(() => {
      loaderOverlay.classList.add('hidden');
      changePage(page3, page4);
      revealFinalFlow();
      typeWriter(getWishByDistrict(savedDistrict, currentAmount));
    }, 1200);
  }, 3000);
});
// ... বাকি সব ফাংশন আগের মতোই থাকবে ...
