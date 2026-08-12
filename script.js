function syncProfilImgHeight() {
  var text = document.querySelector('.profil-text');
  var imgWrap = document.querySelector('.profil-img-wrap');
  if (!text || !imgWrap) return;
  if (window.innerWidth > 900) {
    imgWrap.style.height = text.offsetHeight + 'px';
  } else {
    imgWrap.style.height = '';
  }
}
window.addEventListener('load', syncProfilImgHeight);
window.addEventListener('resize', syncProfilImgHeight);

var pages = ['dashboard', 'struktur', 'fasilitas', 'layanan', 'komoditi', 'tim'];

var navLabel = {
  dashboard: 'Home',
  struktur: 'Struktur',
  fasilitas: 'Fasilitas',
  layanan: 'Layanan',
  komoditi: 'Komoditi',
  tim: 'Tim Pengembang'
};

function go(p) {
  pages.forEach(function(id) {
    var el = document.getElementById('p-' + id);
    if (el) el.className = 'page' + (id === p ? ' show' : '');
  });
  document.querySelectorAll('.nl').forEach(function(n) {
    n.className = 'nl' + (n.textContent.trim() === navLabel[p] ? ' act' : '');
  });
  var navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.remove('show');
}

function toggleNav() {
  var navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.toggle('show');
}

function showAnggota(nama, role, nim, ig, tiktok, foto) {
  if (nim) {
    document.getElementById('mNama').textContent = nama;
    document.getElementById('mNim').textContent = 'NIM: ' + nim;
  } else {
    document.getElementById('mNama').textContent = nama;
    document.getElementById('mNim').textContent = 'NIP/ID: [xxx]';
  }
  document.getElementById('mRole').textContent = role;

  var photoEl = document.getElementById('mPhoto');
  if (foto) {
    photoEl.innerHTML = '<img src="' + foto + '" alt="' + nama + '">';
  } else {
    photoEl.innerHTML = '';
    photoEl.textContent = nama.substring(0, 2).toUpperCase();
  }
  var igLink = document.getElementById('mIg');
  var tiktokLink = document.getElementById('mTiktok');

  if (ig) {
    igLink.href = 'https://www.instagram.com/' + ig + '/';
    document.getElementById('mIgText').textContent = 'Instagram';
    igLink.style.display = 'inline-flex';
  } else {
    igLink.style.display = 'none';
  }

  if (tiktok) {
    tiktokLink.href = 'https://www.tiktok.com/@' + tiktok;
    document.getElementById('mTiktokText').textContent = 'TikTok';
    tiktokLink.style.display = 'inline-flex';
  } else {
    tiktokLink.style.display = 'none';
  }

  document.getElementById('modalAnggota').classList.add('show');
}

function closeModal() {
  document.getElementById('modalAnggota').classList.remove('show');
}

document.getElementById('modalAnggota').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

var ld = {
  'peti-kemas': {cls:'ib', icon:'<i class="ti ti-container"></i>', title:'Angkutan Peti Kemas (Kontainer)', sub:'Alasan pengecualian dari penimbangan', reason:'Sudah memiliki sistem pengawasan dan jalur distribusi tersendiri.', legal:'Permenhub No. 18 Tahun 2021 Pasal 5 ayat (5) huruf a', huruf:'a'},
  tangki: {cls:'ig', icon:'<i class="ti ti-gas-station"></i>', title:'Mobil Tangki BBM/BBG', sub:'Alasan pengecualian dari penimbangan', reason:'Diawasi ketat oleh regulasi khusus distribusi bahan bakar bersubsidi.', legal:'Permenhub No. 18 Tahun 2021 Pasal 5 ayat (5) huruf b', huruf:'b'},
  berbahaya: {cls:'ir', icon:'<i class="ti ti-biohazard"></i>', title:'Angkutan Barang Berbahaya', sub:'Alasan pengecualian dari penimbangan', reason:'Memerlukan penanganan dan pengawasan khusus sesuai klasifikasi B3.', legal:'Permenhub No. 18 Tahun 2021 Pasal 5 ayat (5) huruf c', huruf:'c'},
  'alat-berat': {cls:'ip', icon:'<i class="ti ti-bulldozer"></i>', title:'Alat Berat', sub:'Alasan pengecualian dari penimbangan', reason:'Bukan kendaraan angkutan barang umum dan berjalan dengan izin tersendiri.', legal:'Permenhub No. 18 Tahun 2021 Pasal 5 ayat (5) huruf d', huruf:'d'},
  dokumen: {cls:'ib', icon:'<i class="ti ti-file-text"></i>', title:'Dokumen', sub:'Jenis pelanggaran muatan angkutan barang', reasonLabel:'Penjelasan', reason:'Setiap kendaraan Angkutan Barang wajib menunjukkan dokumen Angkutan Barang yang lengkap dan sah saat diperiksa di Fasilitas Penimbangan.', legal:'Permenhub No. 18 Tahun 2021 Pasal 5 ayat (2) huruf d'},
  'daya-angkut': {cls:'ig', icon:'<i class="ti ti-scale"></i>', title:'Daya Angkut', sub:'Jenis pelanggaran muatan angkutan barang', reasonLabel:'Penjelasan', reason:'Daya angkut kendaraan ditetapkan berdasarkan Jumlah Berat yang Diizinkan (JBI) dan/atau Jumlah Berat Kombinasi yang Diizinkan (JBKI).', legal:'Permenhub No. 18 Tahun 2021 Pasal 2 ayat (1) huruf b jo. ayat (3)'},
  dimensi: {cls:'ir', icon:'<i class="ti ti-ruler-2"></i>', title:'Dimensi', sub:'Jenis pelanggaran muatan angkutan barang', reasonLabel:'Penjelasan', reason:'Dimensi kendaraan meliputi panjang, lebar, tinggi, julur depan, dan julur belakang kendaraan bermotor sesuai ketentuan yang berlaku.', legal:'Permenhub No. 18 Tahun 2021 Pasal 2 ayat (1) huruf c jo. ayat (4)'},
  'persyaratan-teknis': {cls:'ip', icon:'<i class="ti ti-tool"></i>', title:'Persyaratan Teknis', sub:'Jenis pelanggaran muatan angkutan barang', reasonLabel:'Penjelasan', reason:'Kendaraan harus memenuhi persyaratan teknis dan laik jalan, dibuktikan dengan tanda bukti lulus uji berkala (KIR) yang masih berlaku.', legal:'Permenhub No. 18 Tahun 2021 Pasal 7 ayat (2) huruf a'},
  'tata-cara-muat': {cls:'ib', icon:'<i class="ti ti-truck"></i>', title:'Tata Cara Muat', sub:'Jenis pelanggaran muatan angkutan barang', reasonLabel:'Penjelasan', reason:'Tata cara pemuatan wajib memperhatikan penempatan muatan, distribusi beban, pengikatan, pengemasan, serta pemberian label atau tanda.', legal:'Permenhub No. 18 Tahun 2021 Pasal 2 ayat (1) huruf a jo. ayat (2)'},
  'kelas-jalan': {cls:'ig', icon:'<i class="ti ti-road"></i>', title:'Kelas Jalan', sub:'Jenis pelanggaran muatan angkutan barang', reasonLabel:'Penjelasan', reason:'Kelas jalan yang dilalui kendaraan ditentukan berdasarkan rambu kelas jalan yang berlaku pada ruas jalan tersebut.', legal:'Permenhub No. 18 Tahun 2021 Pasal 2 ayat (1) huruf d jo. ayat (5)'}
};

function showLayanan(t) {
  var d = ld[t];
  var head = document.getElementById('popupHead');
  head.className = 'popup-head ' + d.cls;
  var ic = document.getElementById('popupIcon');
  ic.innerHTML = d.icon;
  document.getElementById('popupTitle').textContent = d.title;
  document.getElementById('popupSub').textContent = d.sub;
  document.getElementById('popupSpecs').innerHTML =
    '<div class="popup-block"><div class="popup-block-label"><i class="ti ti-file-description"></i>' + (d.reasonLabel || 'Alasan Pengecualian') + '</div><div class="popup-reason">' + d.reason + '</div></div>' +
    '<div class="popup-block"><div class="popup-block-label"><i class="ti ti-gavel"></i>Dasar Hukum</div><div class="popup-legal">' + d.legal + '</div></div>';
  document.getElementById('popupLayanan').classList.add('show');
}

function closePopup() {
  document.getElementById('popupLayanan').classList.remove('show');
}

document.getElementById('popupLayanan').addEventListener('click', function(e) {
  if (e.target === this) closePopup();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closePopup();
    closeModal();
    closeLightbox();
  }
});

// ===== LIGHTBOX FOTO GALERI (SLIDESHOW) =====
var lightboxData = {
  galeriKegiatan: [
    {src:'1.png', alt:'Galeri Kegiatan 1'},
    {src:'2.jpeg', alt:'Galeri Kegiatan 2'},
    {src:'3.png', alt:'Galeri Kegiatan 3'},
    {src:'4.png', alt:'Galeri Kegiatan 4'},
    {src:'5.png', alt:'Galeri Kegiatan 5'},
    {src:'6.png', alt:'Galeri Kegiatan 6'},
    {src:'7.png', alt:'Galeri Kegiatan 7'},
    {src:'8.JPG', alt:'Galeri Kegiatan 8'},
    {src:'9.jpeg', alt:'Galeri Kegiatan 9'},
    {src:'10.JPG', alt:'Galeri Kegiatan 10'},
    {src:'11.JPG', alt:'Galeri Kegiatan 11'},
    {src:'12.png', alt:'Galeri Kegiatan 12'},
    {src:'13.JPG', alt:'Galeri Kegiatan 13'},
    {src:'14.JPG', alt:'Galeri Kegiatan 14'},
    {src:'15.JPG', alt:'Galeri Kegiatan 15'},
    {src:'21.jpeg', alt:'Galeri Kegiatan 16'},
    {src:'16.png', alt:'Galeri Kegiatan 17'},
    {src:'17.JPG', alt:'Galeri Kegiatan 18'},
    {src:'18.JPG', alt:'Galeri Kegiatan 19'},
    {src:'19.JPG', alt:'Galeri Kegiatan 20'},
    {src:'20.JPG', alt:'Galeri Kegiatan 21'}
  ],
  galeriPI: [
    {src:'pi1.JPG', alt:'Galeri Praktik Industri 1'},
    {src:'pi2.JPG', alt:'Galeri Praktik Industri 2'},
    {src:'pi3.JPG', alt:'Galeri Praktik Industri 3'},
    {src:'pi4.jpg', alt:'Galeri Praktik Industri 4'},
    {src:'pi5.jpg', alt:'Galeri Praktik Industri 5'},
    {src:'pi6.jpg', alt:'Galeri Praktik Industri 6'},
    {src:'pi7.JPG', alt:'Galeri Praktik Industri 7'},
    {src:'pi8.JPG', alt:'Galeri Praktik Industri 8'},
    {src:'pi9.jpeg', alt:'Galeri Praktik Industri 9'},
    {src:'pi10.JPG', alt:'Galeri Praktik Industri 10'},
    {src:'pi11.JPG', alt:'Galeri Praktik Industri 11'},
    {src:'pi12.JPG', alt:'Galeri Praktik Industri 12'},
    {src:'pi13.JPG', alt:'Galeri Praktik Industri 13'},
    {src:'pi14.JPG', alt:'Galeri Praktik Industri 14'},
    {src:'pi15.jpeg', alt:'Galeri Praktik Industri 15'},
    {src:'pi16.jpeg', alt:'Galeri Praktik Industri 16'},
    {src:'pi17.jpeg', alt:'Galeri Praktik Industri 17'},
    {src:'pi18.jpeg', alt:'Galeri Praktik Industri 18'},
    {src:'pi19.jpeg', alt:'Galeri Praktik Industri 19'},
    {src:'pi20.png', alt:'Galeri Praktik Industri 20'},
    {src:'pi21.png', alt:'Galeri Praktik Industri 21'}
  ]
};
var lightboxSet = null;
var lightboxIndex = 0;

function renderLightbox() {
  var set = lightboxData[lightboxSet];
  var item = set[lightboxIndex];
  document.getElementById('lightboxImg').src = item.src;
  document.getElementById('lightboxImg').alt = item.alt || '';
  document.getElementById('lightboxCounter').textContent = (lightboxIndex + 1) + ' / ' + set.length;
}

function openLightbox(setName, index) {
  lightboxSet = setName;
  lightboxIndex = index;
  renderLightbox();
  document.getElementById('lightboxFoto').classList.add('show');
}

function closeLightbox() {
  document.getElementById('lightboxFoto').classList.remove('show');
}

function lightboxNext() {
  if (!lightboxSet) return;
  var set = lightboxData[lightboxSet];
  lightboxIndex = (lightboxIndex + 1) % set.length;
  renderLightbox();
}

function lightboxPrev() {
  if (!lightboxSet) return;
  var set = lightboxData[lightboxSet];
  lightboxIndex = (lightboxIndex - 1 + set.length) % set.length;
  renderLightbox();
}

document.addEventListener('keydown', function(e) {
  if (!document.getElementById('lightboxFoto').classList.contains('show')) return;
  if (e.key === 'ArrowRight') lightboxNext();
  if (e.key === 'ArrowLeft') lightboxPrev();
});

// Swipe gesture untuk mobile
(function() {
  var touchStartX = 0;
  var lb = document.getElementById('lightboxFoto');
  lb.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  lb.addEventListener('touchend', function(e) {
    var touchEndX = e.changedTouches[0].screenX;
    var diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) lightboxNext(); else lightboxPrev();
    }
  });
})();

function scrollToMenu() {
  var el = document.getElementById('menuUtama');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Tampilkan halaman dashboard saat pertama load
go('dashboard');