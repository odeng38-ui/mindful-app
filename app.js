/**
 * Mindful Path - Shared Application Logic & State Management
 * Includes Quantum Gratitude Journal, Triple Heart Meditation & Notification/Alarm System
 */

const STORAGE_KEY = 'mindful_path_app_data';
const QUANTUM_STORAGE_KEY = 'mindful_path_quantum_data';
const NOTIFICATION_STORAGE_KEY = 'mindful_path_notification_data';

// Helper to get formatted date string (YYYY-MM-DD)
function getFormattedDate(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Initial seed data for September 2026
function getInitialSeedData() {
  const seed = {};
  for (let i = 1; i <= 30; i++) {
    const dayStr = String(i).padStart(2, '0');
    const dateKey = `2026-09-${dayStr}`;
    if (i === 1) {
      seed[dateKey] = { notice: true, surrender: false, action: false, mood: 4 };
    } else {
      seed[dateKey] = { notice: false, surrender: false, action: false, mood: null };
    }
  }
  return seed;
}

const MindfulStore = {
  getData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const initial = getInitialSeedData();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to load storage', e);
      return getInitialSeedData();
    }
  },

  saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new Event('mindful_data_changed'));
    } catch (e) {
      console.error('Failed to save storage', e);
    }
  },

  getDayData(dateKey = getFormattedDate()) {
    const data = this.getData();
    if (!data[dateKey]) {
      data[dateKey] = { notice: false, surrender: false, action: false, mood: null };
    }
    return data[dateKey];
  },

  toggleStep(dateKey, stepKey) {
    const data = this.getData();
    if (!data[dateKey]) {
      data[dateKey] = { notice: false, surrender: false, action: false, mood: null };
    }
    data[dateKey][stepKey] = !data[dateKey][stepKey];
    this.saveData(data);
    return data[dateKey];
  },

  setMood(dateKey, moodVal) {
    const data = this.getData();
    if (!data[dateKey]) {
      data[dateKey] = { notice: false, surrender: false, action: false, mood: null };
    }
    data[dateKey].mood = moodVal;
    this.saveData(data);
    return data[dateKey];
  },

  resetData() {
    const initial = getInitialSeedData();
    this.saveData(initial);
    QuantumStore.resetData();
    return initial;
  },

  loadFullSampleData() {
    const sample = {};
    for (let i = 1; i <= 30; i++) {
      const dayStr = String(i).padStart(2, '0');
      const dateKey = `2026-09-${dayStr}`;
      const notice = i <= 15;
      const surrender = i <= 12;
      const action = i <= 10;
      const mood = (i % 3) + 3;
      sample[dateKey] = { notice, surrender, action, mood };
    }
    this.saveData(sample);
    QuantumStore.loadSampleData();
  }
};

// ----------------------------------------------------
// QUANTUM GRATITUDE & MEDITATION STORE
// ----------------------------------------------------
const QuantumStore = {
  getData() {
    try {
      const raw = localStorage.getItem(QUANTUM_STORAGE_KEY);
      if (!raw) return { journals: {}, receipts: [], meditationStreak: 0 };
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to load quantum storage', e);
      return { journals: {}, receipts: [], meditationStreak: 0 };
    }
  },

  saveData(data) {
    try {
      localStorage.setItem(QUANTUM_STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new Event('quantum_data_changed'));
    } catch (e) {
      console.error('Failed to save quantum storage', e);
    }
  },

  getTodayJournal() {
    const data = this.getData();
    const today = getFormattedDate();
    if (!data.journals[today]) {
      data.journals[today] = {
        futureDesires: ['', '', ''],
        presentBlessings: ['', '', ''],
        reframingObstacle: '',
        reframingCosmic: '',
        declarationsConfirmed: false,
        signatureDataUrl: null,
        meditationCompleted: false,
        createdAt: new Date().toISOString()
      };
    }
    return data.journals[today];
  },

  saveTodayJournal(journalUpdate) {
    const data = this.getData();
    const today = getFormattedDate();
    data.journals[today] = { ...this.getTodayJournal(), ...journalUpdate };
    this.saveData(data);
    return data.journals[today];
  },

  addReceipt(receipt) {
    const data = this.getData();
    data.receipts = data.receipts || [];
    data.receipts.unshift(receipt);
    data.meditationStreak = (data.meditationStreak || 0) + 1;
    this.saveData(data);
  },

  resetData() {
    this.saveData({ journals: {}, receipts: [], meditationStreak: 0 });
  },

  loadSampleData() {
    const today = getFormattedDate();
    const sample = {
      journals: {
        [today]: {
          futureDesires: [
            '꿈꾸던 사업 아이디어가 우주의 완전한 조력 속에서 월 수익 1천만 원을 돌파하며 자립했음에 벅차게 감사합니다.',
            '내면의 완전한 평온함과 비전이 명확해져 매일 아침 감동으로 눈뜨게 됨에 깊이 감사합니다.',
            '사랑하는 사람들과 깊은 영적 교감을 나누며 풍요로운 기쁨을 만끽함에 감사합니다.'
          ],
          presentBlessings: [
            '오늘도 맑은 공기를 마시며 자유롭게 숨 쉴 수 있는 건강한 신체에 감사합니다.',
            '안전하고 따뜻한 보금자리에서 평온한 휴식을 취할 수 있음에 감사합니다.',
            '언제나 나를 무조건적으로 지지해 주는 선한 인연들의 온기에 감사합니다.'
          ],
          reframingObstacle: '최근 사업 진행이 일시적으로 정체되어 불안하고 초조한 마음이 듭니다.',
          reframingCosmic: '✨ [우주적 궤도 수정] 이 일시적 정체는 결코 실패가 아닙니다. 더 고차원적인 거대한 성공의 통로를 개척하기 위해 낡고 비효율적인 옛 파동을 자비롭게 해체하는 신성한 조정(Divine Restructuring)입니다. 더 눈부신 풍요를 담을 그릇이 준비되고 있음에 엎드려 먼저 선제 감사를 올립니다.',
          declarationsConfirmed: true,
          signatureDataUrl: null,
          meditationCompleted: true,
          createdAt: new Date().toISOString()
        }
      },
      receipts: [
        {
          id: 'REC-' + Date.now(),
          date: today,
          timestamp: new Date().toLocaleString('ko-KR'),
          futureSummary: '사업 월 수익 1천만 원 돌파 및 내면의 완전한 평온 달성',
          frequencyCode: '432Hz - THETA RESONANCE',
          signatureName: '지훈',
          status: '양자장 동조 보증완료'
        }
      ],
      meditationStreak: 5
    };
    this.saveData(sample);
  }
};

// ----------------------------------------------------
// NOTIFICATION & ALARM STORE
// ----------------------------------------------------
const NotificationStore = {
  getSettings() {
    try {
      const raw = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
      if (!raw) {
        return {
          enabled: true,
          morningTime: '08:00',
          eveningTime: '21:00',
          lastMorningDate: '',
          lastEveningDate: ''
        };
      }
      return JSON.parse(raw);
    } catch (e) {
      return { enabled: true, morningTime: '08:00', eveningTime: '21:00', lastMorningDate: '', lastEveningDate: '' };
    }
  },

  saveSettings(settings) {
    try {
      localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save notification settings', e);
    }
  }
};

// ----------------------------------------------------
// AI COSMIC REFRAMING ENGINE (System Prompt Simulation)
// ----------------------------------------------------
function generateCosmicReframing(obstacleText) {
  if (!obstacleText || obstacleText.trim().length === 0) {
    return '시련이나 불안한 요소를 입력하시면 우주적 궤도 수정 감사문으로 변환해드립니다.';
  }

  const cleanInput = obstacleText.trim();
  
  const reframingTemplates = [
    `✨ [신성한 궤도 수정] "${cleanInput}"에 대한 불안은 낡은 파동이 깨어지는 거룩한 정화 과정입니다. 우주는 지금 당신에게 더 거대한 풍요와 축복의 그릇을 마련하기 위해 이전의 한계 지어진 주파수를 해체하고 있습니다. 모든 자원이 이미 완벽한 시기에 예비되어 있음에 벅차게 감사합니다.`,
    `✨ [양자장 주파수 재정렬] 당장의 정체와 장애물은 나를 불행하게 하려는 고난이 아닙니다. 더 고차원적인 기쁨의 통로로 인도하기 위한 우주의 자비로운 궤도 수정(Divine Restructuring)입니다. 결핍에 영혼을 넘기지 않고 이미 완성된 풍요의 주파수에 내 삶을 정렬함에 사전에 깊이 감사합니다.`,
    `✨ [우주적 진화 승화] 눈앞의 장벽은 불운이 아닌, 영혼의 위대한 비상을 위해 마련된 거룩한 발판입니다. 겉모습에 속지 않고 이미 우주 본연의 위대한 설계도 속에서 모든 일들이 완전한 합력으로 이루어졌음을 알고 안도하며 감사를 발산합니다.`
  ];

  const hash = cleanInput.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return reframingTemplates[hash % reframingTemplates.length];
}

// ----------------------------------------------------
// WEB AUDIO SYNTHESIZER (Singing Bowl & Chimes)
// ----------------------------------------------------
let audioCtx = null;

function playSingingBowlSound(freq = 432, duration = 3.5) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.995, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.log('Audio playback unavailable', e);
  }
}

// Toast notification function
function showToast(message, icon = 'info') {
  let toast = document.getElementById('mindful-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'mindful-toast';
    toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-surface-float text-on-surface px-5 py-3 rounded-full shadow-lg border border-primary/20 flex items-center gap-2 transition-all duration-300 transform opacity-0 translate-y-4 pointer-events-none max-w-[90vw] text-center';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="material-symbols-outlined text-primary text-xl shrink-0">${icon}</span><span class="font-label-md text-label-md">${message}</span>`;
  toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
  
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
  }, 2600);
}

// ----------------------------------------------------
// PWA & ALARM NOTIFICATION ENGINE
// ----------------------------------------------------
let deferredInstallPrompt = null;

function initPWAAndNotifications() {
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log('Service Worker registered', reg);
    }).catch((err) => {
      console.log('Service Worker registration failed', err);
    });
  }

  // PWA Install Prompt Listener
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const installBanner = document.getElementById('pwa-install-banner');
    if (installBanner) installBanner.classList.remove('hidden');
  });

  // Start periodic alarm checker
  startAlarmChecker();
  // Setup Notification Settings UI & Modal
  setupNotificationUI();
}

function sendWebNotification(title, body, url = '/index.html') {
  playSingingBowlSound(528, 2.5);
  
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then((reg) => {
          reg.showNotification(title, {
            body: body,
            icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCujMNkK3hxko9uJgr73EZd0umABpztGMhCQzklrnfEG5OlTTzXPzVmEIF_dF0qWHiDNOJMgRDNjuxSUEhkc0BRC-78y1sC7fvfRCi5DF5JDXnDCfTuvsNoXIYIXWbKIvuQsdGLWOHz7nxqpGRtnZlg60anCDLkj6edyyGVQrejZ-pa0zPL4KEeqhhMS4BiLmGz-nutM9nCVcaL2u-bdVTIk5ILumWlJ9zZ8EUwa7W0RcFZipCDBSrW',
            data: { url: url },
            vibrate: [200, 100, 200]
          });
        });
      } else {
        new Notification(title, { body: body, icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCujMNkK3hxko9uJgr73EZd0umABpztGMhCQzklrnfEG5OlTTzXPzVmEIF_dF0qWHiDNOJMgRDNjuxSUEhkc0BRC-78y1sC7fvfRCi5DF5JDXnDCfTuvsNoXIYIXWbKIvuQsdGLWOHz7nxqpGRtnZlg60anCDLkj6edyyGVQrejZ-pa0zPL4KEeqhhMS4BiLmGz-nutM9nCVcaL2u-bdVTIk5ILumWlJ9zZ8EUwa7W0RcFZipCDBSrW' });
      }
    } catch (e) {
      console.log('Notification error', e);
    }
  }

  showToast(`🔔 ${title}: ${body}`, 'notifications_active');
}

function startAlarmChecker() {
  setInterval(() => {
    const settings = NotificationStore.getSettings();
    if (!settings.enabled) return;

    const now = new Date();
    const currentTimeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const todayStr = getFormattedDate(now);

    // Morning Preemptive Gratitude Reminder
    if (currentTimeStr === settings.morningTime && settings.lastMorningDate !== todayStr) {
      settings.lastMorningDate = todayStr;
      NotificationStore.saveSettings(settings);
      sendWebNotification('🌅 아침 선제 감사 저널 시간', '오늘 이루어질 눈부신 성공에 안도하며 선제 감사를 작성해보세요.', 'quantum_journal_dark.html');
    }

    // Evening Heart Meditation Reminder
    if (currentTimeStr === settings.eveningTime && settings.lastEveningDate !== todayStr) {
      settings.lastEveningDate = todayStr;
      NotificationStore.saveSettings(settings);
      sendWebNotification('🧘 저녁 심장 호흡 명상 시간', '하루 동안의 초조함을 내려놓고 10분 심장 호흡으로 주파수를 조율하세요.', 'heart_meditation_dark.html');
    }
  }, 25000);
}

function setupNotificationUI() {
  // Inject Notification Bell into Header if missing
  const headerDiv = document.querySelector('header > div');
  if (headerDiv && !document.getElementById('btn-header-notification')) {
    const bellBtn = document.createElement('button');
    bellBtn.id = 'btn-header-notification';
    bellBtn.type = 'button';
    bellBtn.className = 'w-9 h-9 rounded-full bg-surface-container/80 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 transition-all mr-2';
    bellBtn.innerHTML = '<span class="material-symbols-outlined text-xl">notifications</span>';
    
    // Insert before profile image
    const profileImg = headerDiv.querySelector('img[alt="Profile"]');
    if (profileImg) headerDiv.insertBefore(bellBtn, profileImg);
    else headerDiv.appendChild(bellBtn);

    bellBtn.addEventListener('click', openNotificationModal);
  }

  // Inject Modal into Document Body
  if (!document.getElementById('notification-modal')) {
    const modalDiv = document.createElement('div');
    modalDiv.id = 'notification-modal';
    modalDiv.className = 'fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 hidden';
    modalDiv.innerHTML = `
      <div class="bg-surface-container-lowest rounded-2xl p-6 w-full max-w-md border border-primary/40 shadow-2xl flex flex-col gap-4 relative">
        <button id="btn-close-notif-modal" class="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface">
          <span class="material-symbols-outlined">close</span>
        </button>

        <div class="flex items-center gap-3 border-b border-surface-variant pb-3">
          <div class="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">notifications_active</span>
          </div>
          <div>
            <h3 class="font-title-md text-title-md text-on-surface">🔔 알림 &amp; 리마인더 알람 설정</h3>
            <p class="text-xs text-on-surface-variant">잊지 않고 매일 감사와 명상을 실천할 수 있도록 안내해드립니다.</p>
          </div>
        </div>

        <div class="space-y-4 text-sm">
          <!-- Toggle Master Notification -->
          <div class="flex justify-between items-center bg-surface-container p-3.5 rounded-xl border border-surface-variant">
            <div>
              <span class="font-bold text-on-surface block">데일리 리마인더 알림 받기</span>
              <span class="text-xs text-on-surface-variant">설정된 시간에 매일 알림 발송</span>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input id="notif-toggle" type="checkbox" class="sr-only peer" checked>
              <div class="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <!-- Morning Time Input -->
          <div class="bg-surface-container p-3.5 rounded-xl border border-surface-variant space-y-2">
            <div class="flex justify-between items-center">
              <span class="font-bold text-primary flex items-center gap-1">🌅 아침 선제 감사 알림</span>
              <input id="notif-morning-time" type="time" class="bg-surface-container-low border border-surface-variant rounded-lg px-2 py-1 text-on-surface font-bold text-sm focus:outline-none focus:border-primary">
            </div>
            <p class="text-xs text-on-surface-variant">하루를 시작하며 이루어질 성공에 선제 감사를 작성해보세요.</p>
          </div>

          <!-- Evening Time Input -->
          <div class="bg-surface-container p-3.5 rounded-xl border border-surface-variant space-y-2">
            <div class="flex justify-between items-center">
              <span class="font-bold text-vibrant-mint flex items-center gap-1">🧘 저녁 심장 명상 알림</span>
              <input id="notif-evening-time" type="time" class="bg-surface-container-low border border-surface-variant rounded-lg px-2 py-1 text-on-surface font-bold text-sm focus:outline-none focus:border-vibrant-mint">
            </div>
            <p class="text-xs text-on-surface-variant">하루를 마무리하며 10분 심장 호흡으로 주파수를 조율하세요.</p>
          </div>
        </div>

        <div class="flex flex-col gap-2 pt-2">
          <button id="btn-request-permission" type="button" class="w-full py-3 bg-surface-container-high text-primary border border-primary/30 font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-primary/20 transition-all">
            <span class="material-symbols-outlined text-sm">security</span> 브라우저 알림 권한 허용 및 알림 테스트
          </button>

          <button id="btn-save-notif-settings" type="button" class="w-full py-3.5 bg-primary text-on-primary font-bold rounded-xl text-sm flex items-center justify-center gap-1 hover:bg-primary/90 shadow-md">
            <span class="material-symbols-outlined text-sm">check</span> 알림 설정 저장하기
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modalDiv);

    document.getElementById('btn-close-notif-modal').addEventListener('click', () => {
      modalDiv.classList.add('hidden');
    });

    document.getElementById('btn-request-permission').addEventListener('click', () => {
      if ('Notification' in window) {
        Notification.requestPermission().then((perm) => {
          if (perm === 'granted') {
            sendWebNotification('🎉 알림 권한이 허용되었습니다!', '이제 설정하신 시간에 아침 감사와 저녁 명상 알림을 받아보실 수 있습니다.');
          } else {
            showToast('알림 권한이 거부되었습니다. 브라우저 설정에서 알림을 허용해주세요.', 'warning');
          }
        });
      } else {
        showToast('이 브라우저는 알림 기능을 지원하지 않습니다.', 'warning');
      }
    });

    document.getElementById('btn-save-notif-settings').addEventListener('click', () => {
      const enabled = document.getElementById('notif-toggle').checked;
      const morningTime = document.getElementById('notif-morning-time').value || '08:00';
      const eveningTime = document.getElementById('notif-evening-time').value || '21:00';

      NotificationStore.saveSettings({
        enabled,
        morningTime,
        eveningTime,
        lastMorningDate: '',
        lastEveningDate: ''
      });

      modalDiv.classList.add('hidden');
      playSingingBowlSound(528, 2);
      showToast('🔔 알림 설정이 저장되었습니다!', 'notifications_active');
    });
  }
}

function openNotificationModal() {
  const modal = document.getElementById('notification-modal');
  if (!modal) return;

  const settings = NotificationStore.getSettings();
  document.getElementById('notif-toggle').checked = settings.enabled;
  document.getElementById('notif-morning-time').value = settings.morningTime || '08:00';
  document.getElementById('notif-evening-time').value = settings.eveningTime || '21:00';

  modal.classList.remove('hidden');
}

// Global initialization logic on page load
document.addEventListener('DOMContentLoaded', () => {
  setupNavigationLinks();
  initCurrentPage();
  initPWAAndNotifications();

  window.addEventListener('mindful_data_changed', () => {
    initCurrentPage();
  });
  window.addEventListener('quantum_data_changed', () => {
    initCurrentPage();
  });
});

function setupNavigationLinks() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  
  const navMap = {
    'home': 'index.html',
    'quantum': 'quantum_journal_dark.html',
    'meditation': 'heart_meditation_dark.html',
    'daily-check': 'daily_check_tracker_dark.html',
    'reports': 'stats_report_dark.html',
    'guide': 'practice_guide_dark.html'
  };

  const navLinks = document.querySelectorAll('nav a[data-path]');
  navLinks.forEach(link => {
    const key = link.getAttribute('data-path');
    if (navMap[key]) {
      link.setAttribute('href', navMap[key]);
      if (path.includes(navMap[key]) || path.includes('home_dashboard_dark') || (path === '' && key === 'home')) {
        link.classList.add('text-primary', 'font-bold');
        link.classList.remove('text-on-surface-variant');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('text-primary', 'font-bold');
        link.classList.add('text-on-surface-variant');
        link.removeAttribute('aria-current');
      }
    }
  });

  // Header Logo click -> Home
  const logoElements = document.querySelectorAll('header img[alt*="Logo"], header span');
  logoElements.forEach(el => {
    el.style.cursor = 'pointer';
    el.onclick = () => {
      window.location.href = 'index.html';
    };
  });
}

function initCurrentPage() {
  const path = window.location.pathname.split('/').pop() || 'index.html';

  if (path.includes('home_dashboard_dark') || path.includes('index') || path === '' || path === '/') {
    initHomePage();
  } else if (path.includes('daily_check_tracker_dark')) {
    initDailyCheckPage();
  } else if (path.includes('practice_guide_dark')) {
    initPracticeGuidePage();
  } else if (path.includes('stats_report_dark')) {
    initStatsReportPage();
  }
}

// ----------------------------------------------------
// 1. HOME DASHBOARD PAGE LOGIC
// ----------------------------------------------------
function initHomePage() {
  const todayKey = getFormattedDate();
  const todayData = MindfulStore.getDayData(todayKey);

  // Today Progress calculation
  let completedCount = 0;
  if (todayData.notice) completedCount++;
  if (todayData.surrender) completedCount++;
  if (todayData.action) completedCount++;

  const badge = document.querySelector('section span.rounded-full');
  if (badge) {
    badge.textContent = `${completedCount} / 3 완료`;
  }

  const circleProgress = document.querySelector('svg circle.text-primary');
  const progressText = document.querySelector('div.absolute span.font-label-md');
  if (circleProgress) {
    const totalLength = 251.2;
    const offset = totalLength - (totalLength * (completedCount / 3));
    circleProgress.setAttribute('stroke-dashoffset', offset.toString());
  }
  if (progressText) {
    if (completedCount === 0) progressText.textContent = '시작해볼까요?';
    else if (completedCount === 3) progressText.textContent = '오늘 완주 성공! 🎉';
    else progressText.textContent = `${completedCount}단계 진행 중`;
  }

  const stepItems = document.querySelectorAll('section div.w-full.flex.flex-col.gap-3 > div');
  const stepKeys = ['notice', 'surrender', 'action'];

  stepItems.forEach((item, index) => {
    const key = stepKeys[index];
    const isDone = todayData[key];
    const icon = item.querySelector('span.material-symbols-outlined');
    const badgeNum = item.querySelector('div');

    item.style.cursor = 'pointer';
    item.className = `flex items-center gap-3 p-3 rounded-lg border transition-all ${
      isDone 
        ? 'bg-primary-container/40 border-primary/50 text-on-surface' 
        : 'bg-surface-container-low border-surface-variant text-on-surface-variant'
    }`;

    if (icon) {
      icon.textContent = isDone ? 'check_circle' : 'radio_button_unchecked';
      icon.className = `material-symbols-outlined ${isDone ? 'text-primary' : 'text-outline-variant'}`;
    }
    if (badgeNum) {
      badgeNum.className = `w-8 h-8 rounded-full flex items-center justify-center font-label-md ${
        isDone ? 'bg-primary text-on-primary font-bold' : 'bg-surface-variant text-on-surface-variant'
      }`;
    }

    item.onclick = () => {
      MindfulStore.toggleStep(todayKey, key);
      const newState = !isDone;
      showToast(newState ? `${index + 1}단계 완료!` : `${index + 1}단계 취소`, newState ? 'check_circle' : 'undo');
    };
  });

  // Action Button -> Go to Quantum Journal
  const actionBtn = document.querySelector('button.w-full.py-4');
  if (actionBtn) {
    actionBtn.onclick = () => {
      window.location.href = 'quantum_journal_dark.html';
    };
  }

  // Quote Card click -> Copy Quote
  const quoteCard = document.querySelector('.border-l-4.border-primary');
  if (quoteCard) {
    quoteCard.style.cursor = 'pointer';
    quoteCard.onclick = () => {
      playSingingBowlSound(528, 2.5);
      showToast('명언 문구가 우주 양자장에 각인되었습니다.', 'auto_awesome');
    };
  }

  // PWA Install Banner Click
  const installBannerBtn = document.getElementById('btn-pwa-install');
  if (installBannerBtn) {
    installBannerBtn.onclick = () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        deferredInstallPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            showToast('📱 앱이 홈 화면에 추가되었습니다!', 'system_update');
          }
          deferredInstallPrompt = null;
        });
      } else {
        openNotificationModal();
      }
    };
  }
}

// ----------------------------------------------------
// 2. DAILY CHECK TRACKER PAGE LOGIC
// ----------------------------------------------------
function initDailyCheckPage() {
  const allData = MindfulStore.getData();

  let totalNotice = 0;
  let totalSurrender = 0;
  let totalAction = 0;
  let fullCompletedDays = 0;

  Object.keys(allData).forEach(dateKey => {
    const entry = allData[dateKey];
    if (entry.notice) totalNotice++;
    if (entry.surrender) totalSurrender++;
    if (entry.action) totalAction++;
    if (entry.notice && entry.surrender && entry.action) fullCompletedDays++;
  });

  const statsCols = document.querySelectorAll('.grid-cols-3 > div');
  if (statsCols.length >= 3) {
    statsCols[0].querySelector('span.text-on-surface').textContent = totalNotice;
    statsCols[1].querySelector('span.text-on-surface').textContent = totalSurrender;
    statsCols[2].querySelector('span.text-on-surface').textContent = totalAction;
  }

  const completeBadge = document.querySelector('.bg-primary-container');
  if (completeBadge) {
    const percent = Math.round((fullCompletedDays / 30) * 100);
    completeBadge.textContent = `${percent}% 완료`;
  }

  const checkCards = document.querySelectorAll('.space-y-4 > .bg-surface-container-lowest');
  checkCards.forEach((card, index) => {
    const dayNum = index + 1;
    const dayStr = String(dayNum).padStart(2, '0');
    const dateKey = `2026-09-${dayStr}`;
    const dayData = MindfulStore.getDayData(dateKey);

    const stepBtns = card.querySelectorAll('.grid-cols-3 > button');
    const stepKeys = ['notice', 'surrender', 'action'];

    stepBtns.forEach((btn, stepIdx) => {
      const stepKey = stepKeys[stepIdx];
      const active = dayData[stepKey];

      updateStepButtonStyle(btn, stepKey, active);

      btn.onclick = () => {
        const updated = MindfulStore.toggleStep(dateKey, stepKey);
        updateStepButtonStyle(btn, stepKey, updated[stepKey]);
        playSingingBowlSound(432 + stepIdx * 108, 1.5);
        showToast(`9월 ${dayNum}일 ${getStepName(stepKey)} ${updated[stepKey] ? '체크!' : '해제'}`, updated[stepKey] ? 'check_circle' : 'cancel');
      };
    });

    const moodContainer = card.querySelector('.rounded-full.flex, .rounded-full');
    if (moodContainer) {
      moodContainer.style.cursor = 'pointer';
      moodContainer.onclick = () => {
        const currentMood = dayData.mood || 3;
        const newMood = (currentMood % 5) + 1;
        MindfulStore.setMood(dateKey, newMood);
        showToast(`9월 ${dayNum}일 기분: ${getMoodLabel(newMood)} (${newMood}점)`, 'sentiment_satisfied');
      };
    }
  });
}

function updateStepButtonStyle(btn, stepKey, active) {
  const icon = btn.querySelector('.material-symbols-outlined');
  
  const styles = {
    notice: active ? 'bg-[#112a4a] text-[#8cb6fb] ring-2 ring-[#8cb6fb]/50' : 'bg-surface-container text-on-surface-variant opacity-60',
    surrender: active ? 'bg-[#2c1a4d] text-[#d1b3ff] ring-2 ring-[#d1b3ff]/50' : 'bg-surface-container text-on-surface-variant opacity-60',
    action: active ? 'bg-[#0a382e] text-[#a8f0cc] ring-2 ring-[#a8f0cc]/50' : 'bg-surface-container text-on-surface-variant opacity-60'
  };

  btn.className = `${styles[stepKey]} py-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95`;
  if (icon) {
    icon.textContent = active ? 'check_circle' : 'radio_button_unchecked';
  }
}

function getStepName(key) {
  if (key === 'notice') return '알아차리기';
  if (key === 'surrender') return '놓고 맡기기';
  if (key === 'action') return '필요한 행동';
  return '';
}

function getMoodLabel(score) {
  const labels = ['', '매우 힘듦', '조금 우울', '보통', '평온함', '매우 맑음'];
  return labels[score] || '보통';
}

// ----------------------------------------------------
// 3. PRACTICE GUIDE PAGE LOGIC
// ----------------------------------------------------
function initPracticeGuidePage() {
  const cards = document.querySelectorAll('.px-container-margin > .bg-surface-container-lowest');

  cards.forEach((card, index) => {
    card.style.cursor = 'pointer';
    
    let detailBox = card.querySelector('.guide-detail-box');
    if (!detailBox) {
      detailBox = document.createElement('div');
      detailBox.className = 'guide-detail-box hidden mt-4 p-4 rounded-xl bg-surface-container/60 border border-surface-variant text-on-surface-variant text-body-md space-y-2';
      
      const tips = [
        '💡 팁: 생각이나 감정이 일어났을 때 "내가 지켜보고 있구나" 하고 객관적으로 인지해보세요.',
        '🌊 팁: 감정과 억지로 싸우려 하지 말고, 파도가 지나가듯 내면에 맡겨둡니다.',
        '🏃 팁: 완벽한 기분을 기다리지 마세요. 할 일을 작게 나누어 1분만 시작해보세요.'
      ];

      detailBox.innerHTML = `
        <p class="font-title-md text-title-md text-primary mb-1">실천 꿀팁 &amp; 가이드</p>
        <p class="text-sm">${tips[index] || ''}</p>
        <button class="mt-3 w-full py-2 bg-primary/20 text-primary rounded-lg text-label-md font-bold flex items-center justify-center gap-1 hover:bg-primary/30">
          <span class="material-symbols-outlined text-sm">edit_calendar</span> 양자저널 작성하러 가기
        </button>
      `;
      card.appendChild(detailBox);
    }

    card.onclick = (e) => {
      if (e.target.closest('button')) {
        window.location.href = 'quantum_journal_dark.html';
        return;
      }
      detailBox.classList.toggle('hidden');
      playSingingBowlSound(528, 1.2);
      showToast(`${index + 1}단계 실천 팁 ${detailBox.classList.contains('hidden') ? '닫힘' : '열림'}`, 'lightbulb');
    };
  });

  const mantraBanner = document.querySelector('.bg-tertiary-container');
  if (mantraBanner) {
    mantraBanner.style.cursor = 'pointer';
    mantraBanner.onclick = () => {
      playSingingBowlSound(432, 3);
      showToast('마음 가짐 주문: "아, 이런 마음이 올라왔구나!"', 'psychology');
    };
  }
}

// ----------------------------------------------------
// 4. STATS REPORT PAGE LOGIC
// ----------------------------------------------------
function initStatsReportPage() {
  const allData = MindfulStore.getData();

  let totalCompletedSteps = 0;
  let fullCompletedDays = 0;
  let recordedDaysCount = 0;

  const weeks = [
    { name: '1주차', start: 1, end: 7, count: 0 },
    { name: '2주차', start: 8, end: 14, count: 0 },
    { name: '3주차', start: 15, end: 21, count: 0 },
    { name: '4주차', start: 22, end: 30, count: 0 }
  ];

  for (let i = 1; i <= 30; i++) {
    const dayStr = String(i).padStart(2, '0');
    const dateKey = `2026-09-${dayStr}`;
    const entry = allData[dateKey] || { notice: false, surrender: false, action: false };

    let dayStepCount = 0;
    if (entry.notice) { totalCompletedSteps++; dayStepCount++; }
    if (entry.surrender) { totalCompletedSteps++; dayStepCount++; }
    if (entry.action) { totalCompletedSteps++; dayStepCount++; }

    if (dayStepCount === 3) fullCompletedDays++;
    if (dayStepCount > 0) recordedDaysCount++;

    const weekObj = weeks.find(w => i >= w.start && i <= w.end);
    if (weekObj) {
      weekObj.count += dayStepCount;
    }
  }

  const totalPossible = 90;
  const monthRate = Math.round((totalCompletedSteps / totalPossible) * 100);

  const rateCircleText = document.querySelector('svg + div span.text-primary');
  const rateCircle = document.querySelector('svg circle.text-primary');
  if (rateCircleText) rateCircleText.textContent = `${monthRate}%`;
  if (rateCircle) {
    const totalLength = 251.2;
    const offset = totalLength - (totalLength * (monthRate / 100));
    rateCircle.setAttribute('stroke-dashoffset', offset.toString());
  }

  const fullCompletedCountEl = document.querySelector('span.text-display-lg');
  if (fullCompletedCountEl) {
    fullCompletedCountEl.textContent = fullCompletedDays;
  }

  const detailItems = document.querySelectorAll('ul.divide-y > li span.text-on-surface');
  if (detailItems.length >= 3) {
    detailItems[0].textContent = totalCompletedSteps;
    detailItems[1].textContent = totalPossible;
    detailItems[2].textContent = recordedDaysCount;
  }

  const weekCards = document.querySelectorAll('section:nth-of-type(2) .flex-col > div');
  weekCards.forEach((card, idx) => {
    if (weeks[idx]) {
      const w = weeks[idx];
      const maxWeekSteps = (w.end - w.start + 1) * 3;
      const wRate = Math.round((w.count / maxWeekSteps) * 100);
      
      const rateEl = card.querySelector('.items-end span.text-on-surface');
      if (rateEl) rateEl.textContent = `${wRate}%`;

      const badgeBg = card.querySelector('div.w-10.h-10');
      if (badgeBg) {
        if (wRate > 50) {
          badgeBg.className = 'w-10 h-10 rounded-full bg-primary-container flex items-center justify-center';
          badgeBg.innerHTML = '<span class="material-symbols-outlined text-primary text-sm">trending_up</span>';
        } else if (wRate > 0) {
          badgeBg.className = 'w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center';
          badgeBg.innerHTML = '<span class="material-symbols-outlined text-secondary text-sm">trending_flat</span>';
        } else {
          badgeBg.className = 'w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center';
          badgeBg.innerHTML = '<span class="material-symbols-outlined text-outline text-sm">remove</span>';
        }
      }
    }
  });

  let btnContainer = document.getElementById('stats-action-container');
  if (!btnContainer) {
    const mainDiv = document.querySelector('main > div');
    btnContainer = document.createElement('div');
    btnContainer.id = 'stats-action-container';
    btnContainer.className = 'flex gap-3 mt-4 mb-8';
    btnContainer.innerHTML = `
      <button id="btn-load-sample" class="flex-1 py-3 bg-primary/20 text-primary rounded-xl font-label-md text-label-md font-bold flex items-center justify-center gap-1 hover:bg-primary/30 active:scale-95 transition-all">
        <span class="material-symbols-outlined text-sm">dataset</span> 샘플 데이터 채우기
      </button>
      <button id="btn-reset-data" class="py-3 px-4 bg-error-container/40 text-error rounded-xl font-label-md text-label-md font-bold flex items-center justify-center gap-1 hover:bg-error-container/60 active:scale-95 transition-all">
        <span class="material-symbols-outlined text-sm">restart_alt</span> 초기화
      </button>
    `;
    if (mainDiv) mainDiv.appendChild(btnContainer);

    document.getElementById('btn-load-sample')?.addEventListener('click', () => {
      MindfulStore.loadFullSampleData();
      playSingingBowlSound(528, 2);
      showToast('샘플 데이터가 적용되었습니다!', 'published_with_changes');
    });

    document.getElementById('btn-reset-data')?.addEventListener('click', () => {
      MindfulStore.resetData();
      showToast('기록이 초기화되었습니다.', 'refresh');
    });
  }

  // Render Quantum Receipt Gallery on Stats Page
  renderReceiptGallery();
}

function renderReceiptGallery() {
  const quantumData = QuantumStore.getData();
  const receipts = quantumData.receipts || [];

  let gallerySection = document.getElementById('quantum-receipt-gallery');
  if (!gallerySection) {
    const mainContainer = document.querySelector('main > div');
    gallerySection = document.createElement('section');
    gallerySection.id = 'quantum-receipt-gallery';
    gallerySection.className = 'flex flex-col gap-4 mt-6';
    if (mainContainer) {
      mainContainer.insertBefore(gallerySection, document.getElementById('stats-action-container'));
    }
  }

  let receiptCardsHTML = '';
  if (receipts.length === 0) {
    receiptCardsHTML = `
      <div class="bg-surface-container-lowest rounded-xl p-6 text-center border border-dashed border-surface-variant text-on-surface-variant">
        <span class="material-symbols-outlined text-4xl text-primary/40 mb-2">workspace_premium</span>
        <p class="font-title-md text-title-md text-on-surface mb-1">발급된 양자장 보증서가 없습니다.</p>
        <p class="text-sm text-on-surface-variant mb-4">선제적 감사 저널 작성 후 자필 서명을 완료해보세요.</p>
        <a href="quantum_journal_dark.html" class="inline-flex items-center gap-1 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-bold hover:bg-primary/30">
          <span class="material-symbols-outlined text-sm">auto_awesome</span> 양자 저널 작성하러 가기
        </a>
      </div>
    `;
  } else {
    receiptCardsHTML = receipts.map(r => `
      <div class="bg-gradient-to-br from-[#1c252f] to-[#121a24] rounded-2xl p-5 border border-primary/30 shadow-lg relative overflow-hidden">
        <div class="absolute -right-6 -bottom-6 text-primary/10 pointer-events-none">
          <span class="material-symbols-outlined text-[120px]">verified</span>
        </div>
        <div class="flex justify-between items-start mb-3 border-b border-surface-variant pb-2">
          <div>
            <span class="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">📜 ${r.status || '양자장 동조 보증서'}</span>
            <h4 class="font-title-md text-title-md text-on-surface">${r.date}</h4>
          </div>
          <span class="text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded">${r.frequencyCode || '432Hz'}</span>
        </div>
        <p class="text-sm text-on-surface-variant mb-3">"${r.futureSummary}"</p>
        <div class="flex justify-between items-center text-xs text-outline-variant pt-2 border-t border-surface-variant/40">
          <span>서명: <strong class="text-primary">${r.signatureName || '자필 확약'}</strong></span>
          <span>${r.timestamp}</span>
        </div>
      </div>
    `).join('');
  }

  gallerySection.innerHTML = `
    <h2 class="font-title-md text-title-md text-on-surface flex items-center gap-2">
      <span class="material-symbols-outlined text-primary">verified</span>
      양자장 동조 보증서 갤러리 (${receipts.length}건)
    </h2>
    <div class="space-y-3">
      ${receiptCardsHTML}
    </div>
  `;
}
