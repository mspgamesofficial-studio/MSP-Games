// --- PAGE ROUTING ---
function switchPage(pageId) {
    try {
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.remove('active-page'));
        
        const targetPage = document.getElementById('page-' + pageId);
        if (targetPage) {
            targetPage.classList.add('active-page');
            window.scrollTo(0, 0);
        }

        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => link.classList.remove('active'));
        const activeNav = document.getElementById('nav-' + pageId);
        if (activeNav) activeNav.classList.add('active');
    } catch (err) {
        console.error("Routing Error:", err);
    }
}

// --- OPEN SPECIFIC DEDICATED GAME PAGE ---
function openGamePage(gameId) {
    const banner = document.getElementById('game-detail-banner');
    const title = document.getElementById('game-detail-title');

    if (banner && title) {
        if (gameId === 'silent-noise') {
            banner.style.backgroundImage = "url('https://cdn.corenexis.com/f/0T1bgFlHLZU.png')";
            title.innerText = "SILENT NOISE PROLOGUE";
        } else if (gameId === 'speed-up') {
            banner.style.backgroundImage = "url('https://cdn.corenexis.com/f/QR27DNcnrY9.png')";
            title.innerText = "SPEED UP";
        } else if (gameId === 'speed-up-online') {
            banner.style.backgroundImage = "url('https://cdn.corenexis.com/f/rI87BPMbTsl.png')";
            title.innerText = "SPEED UP ONLINE";
        }
    }

    switchPage('game-detail');
}

// --- SEARCH MODAL TOGGLE ---
function toggleSearch() {
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
        searchModal.classList.toggle('active');
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const searchModal = document.getElementById('searchModal');
        if (searchModal) searchModal.classList.remove('active');
    }
});

// --- HERO CAROUSEL LOGIC ---
let currentSlide = 0;
let isPaused = false;
let slideInterval = setInterval(nextSlide, 5000);

function nextSlide() {
    if (isPaused) return;
    currentSlide = (currentSlide + 1) % 3;
    userSelectSlide(currentSlide);
}

function userSelectSlide(index) {
    currentSlide = index;
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');

    if (slides.length > 0 && indicators.length > 0) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));

        if (slides[index]) slides[index].classList.add('active');
        if (indicators[index]) indicators[index].classList.add('active');
    }
}

function toggleSliderPause() {
    isPaused = !isPaused;
    const pauseBtn = document.querySelector('.pause-btn');
    if (pauseBtn) {
        pauseBtn.innerText = isPaused ? '▶' : '❚❚';
    }
}

// --- SAFE YOUTUBE API INTEGRATION ---
let silentNoisePlayer, speedUpOnlinePlayer;

function onYouTubeIframeAPIReady() {
    if (typeof YT !== 'undefined' && YT.Player) {
        if (document.getElementById('silent-noise-trailer')) {
            silentNoisePlayer = new YT.Player('silent-noise-trailer', {
                events: {
                    'onReady': (event) => {
                        event.target.mute();
                        event.target.playVideo();
                    }
                }
            });
        }

        if (document.getElementById('trailer-iframe')) {
            speedUpOnlinePlayer = new YT.Player('trailer-iframe', {
                events: {
                    'onReady': (event) => {
                        event.target.mute();
                        event.target.playVideo();
                    }
                }
            });
        }
    }
}

function playSilentNoiseTrailer() {
    if (silentNoisePlayer && typeof silentNoisePlayer.unMute === 'function') {
        silentNoisePlayer.unMute();
        silentNoisePlayer.setVolume(100);
        silentNoisePlayer.seekTo(0);
        silentNoisePlayer.playVideo();
    }
}

function playTrailerWithAudio() {
    if (speedUpOnlinePlayer && typeof speedUpOnlinePlayer.unMute === 'function') {
        speedUpOnlinePlayer.unMute();
        speedUpOnlinePlayer.setVolume(100);
        speedUpOnlinePlayer.seekTo(0);
        speedUpOnlinePlayer.playVideo();
    }
}

function openDevLog(type) {
    alert("Opening Dev Log: " + type.toUpperCase());
}
// --- LIVE SEARCH SYSTEM ---
const searchableData = [
    { title: "SILENT NOISE PROLOGUE", category: "Game Title", page: "game-detail", gameId: "silent-noise" },
    { title: "SPEED UP", category: "Game Title", page: "game-detail", gameId: "speed-up" },
    { title: "SPEED UP ONLINE", category: "Game Title", page: "game-detail", gameId: "speed-up-online" },
    { title: "Nitra Launcher Download", category: "Software", page: "launcher" },
    { title: "Silent Noise : The Park Shift Prologue", category: "Release", page: "game-detail", gameId: "silent-noise" },
    { title: "Dev Diary #1 - Concept Art", category: "News & Press", page: "press" },
    { title: "Garage & Tuning Overhaul (Dev Log #04)", category: "Speed Up Update", page: "home" },
    { title: "Exploring The City Map", category: "World Reveal", page: "home" },
    { title: "Official Soundtrack Reveal", category: "Audio Deep Dive", page: "home" },
    { title: "Early Access Roadmap", category: "Roadmap", page: "home" },
    { title: "Crew Wars & High Stakes Events", category: "Multiplayer", page: "game-detail", gameId: "speed-up-online" },
    { title: "Press Kits & Media Contact", category: "Media", page: "press" },
    { title: "Customer Support & Tickets", category: "Support", page: "support" }
];

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (query === '') return;

    const filtered = searchableData.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        resultsContainer.innerHTML = `<p style="color: #666; font-size: 13px;">No results found for "${query}"</p>`;
        return;
    }

    filtered.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'search-result-card';
        itemCard.style.cssText = 'padding: 15px; background: #0a0a0a; border: 1px solid #222; margin-bottom: 10px; cursor: pointer; transition: border-color 0.2s ease;';
        
        itemCard.innerHTML = `
            <div style="font-size: 10px; color: #d62828; font-weight: 800; margin-bottom: 4px;">${item.category.toUpperCase()}</div>
            <div style="font-size: 14px; font-weight: bold; color: #fff;">${item.title}</div>
        `;

        itemCard.onmouseover = () => itemCard.style.borderColor = '#d62828';
        itemCard.onmouseout = () => itemCard.style.borderColor = '#222';

        itemCard.onclick = () => {
            toggleSearch();
            if (item.gameId) {
                openGamePage(item.gameId);
            } else {
                switchPage(item.page);
            }
        };

        resultsContainer.appendChild(itemCard);
    });
}
// --- DEV LOG DYNAMIC ROUTING ---
const devLogsData = {
    'garage': {
        category: 'DEV LOG #04',
        title: 'GARAGE & TUNING OVERHAUL',
        banner: 'https://i.postimg.cc/KjFR4M6f/speed-up-new-ss.png',
        intro: 'We are thrilled to announce a complete overhaul of the garage and vehicle customization mechanics in Speed Up. Our goal is to bring deep, real-time mechanical tweaking straight to your fingertips.',
        middleImg: 'https://i.postimg.cc/yN4BVH49/Speed-Up-new-ss-2.png',
        body: 'From engine swaps, turbocharger pressure adjustments, to visual aerodynamic kits, every modification directly alters your vehicle handling physics. Test your custom builds in live dyno sessions before hitting the street circuits.'
    },
    'map': {
        category: 'WORLD REVEAL',
        title: 'EXPLORING THE CITY MAP',
        banner: 'https://cdn.corenexis.com/f/QR27DNcnrY9.png',
        intro: 'Step inside the sprawling neon-lit streets and high-speed highways of our seamless open-world map. Designed from the ground up for high-stakes urban racing.',
        middleImg: 'https://cdn.corenexis.com/f/rI87BPMbTsl.png',
        body: 'Discover underground racing spots, evade law enforcement patrols, and compete across distinct city districts ranging from industrial docks to mountain highway passes.'
    },
    'soundtrack': {
        category: 'AUDIO DEEP DIVE',
        title: 'OFFICIAL SOUNDTRACK REVEAL',
        banner: 'https://cdn.corenexis.com/f/QR27DNcnrY9.png',
        intro: 'Sound design is half the experience. Today, we reveal our official dynamic soundtrack pipeline crafted to amplify adrenaline during intense races.',
        middleImg: 'https://cdn.corenexis.com/f/0T1bgFlHLZU.png',
        body: 'Featuring high-energy synthwave, bass-heavy electronic tracks, and authentic binaural recordings of real-world high-performance exhaust notes.'
    },
    'roadmap': {
        category: 'ROADMAP',
        title: 'EARLY ACCESS ROADMAP',
        banner: 'https://i.postimg.cc/tCxM9VXN/speed-up-ss-7.png',
        intro: 'Here is our production roadmap outlining upcoming milestones, closed beta testing schedules, and feature rollouts leading up to early access.',
        middleImg: 'https://i.postimg.cc/NYMfcfcF/speed-up-ss-6.png',
        body: 'Our upcoming phases will introduce ranked multiplayer leagues, expanded vehicle rosters, and community-created custom race events.'
    }
};

function openDevLog(logId) {
    const data = devLogsData[logId];
    if (!data) return;

    // Populate data into Dev Log template
    document.getElementById('devlog-category').innerText = data.category;
    document.getElementById('devlog-title').innerText = data.title;
    document.getElementById('devlog-banner').style.backgroundImage = `url('${data.banner}')`;
    document.getElementById('devlog-intro').innerText = data.intro;
    document.getElementById('devlog-middle-img').src = data.middleImg;
    document.getElementById('devlog-body').innerText = data.body;

    // Open Page
    switchPage('devlog-detail');
}