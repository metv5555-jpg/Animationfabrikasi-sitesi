// Global variables
let stories = JSON.parse(localStorage.getItem("stories") || "[]");

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderSaved();
});

// Scroll to creator
function scrollToCreator() {
  document.getElementById('creator').scrollIntoView({ behavior: 'smooth' });
}

// Save story
function saveStory() {
  const text = document.getElementById('story').value.trim();
  if (!text) {
    alert('Senaryo yazın!');
    return;
  }

  const storyObj = {
    id: Date.now(),
    text: text,
    style: document.getElementById('style').value,
    date: new Date().toLocaleDateString('tr-TR')
  };

  stories.push(storyObj);
  localStorage.setItem('stories', JSON.stringify(stories));
  document.getElementById('story').value = '';
  showNotification('✓ Senaryo kaydedildi!');
  renderSaved();
}

// Play story
function playStory() {
  const text = document.getElementById('story').value.trim();
  if (!text) {
    alert('Senaryo yazın!');
    return;
  }
  playAnimation(text, document.getElementById('style').value);
}

// Play animation
function playAnimation(text, style) {
  const playerDiv = document.getElementById('player');
  const scenes = text.split('\n').filter(s => s.trim());
  
  if (scenes.length === 0) {
    scenes.push(text);
  }

  playerDiv.innerHTML = '';
  let index = 0;

  function showScene() {
    if (index >= scenes.length) {
      playerDiv.innerHTML += '<p style="text-align:center; color:#888; padding:2rem;">Animasyon tamamlandı!</p>';
      return;
    }

    const sceneHtml = `
      <div class="player">
        <h2>🎬 Sahne ${index + 1}</h2>
        <p>${scenes[index]}</p>
        <p class="small">Stil: ${style}</p>
      </div>`;

    playerDiv.innerHTML += sceneHtml;
    document.getElementById('player-section').scrollIntoView({ behavior: 'smooth' });
    
    speakText(scenes[index]);
    index++;
  }

  showScene();
  const interval = setInterval(() => {
    if (index < scenes.length) {
      showScene();
    } else {
      clearInterval(interval);
    }
  }, 4000);
}

// Play saved story
function playSaved(index) {
  if (stories[index]) {
    playAnimation(stories[index].text, stories[index].style);
  }
}

// Delete story
function deleteStory(index) {
  if (confirm('Senaryoyu silmek istediğinizden emin misiniz?')) {
    stories.splice(index, 1);
    localStorage.setItem('stories', JSON.stringify(stories));
    renderSaved();
  }
}

// Render saved stories
function renderSaved() {
  const savedDiv = document.getElementById('saved');
  
  if (stories.length === 0) {
    savedDiv.innerHTML = '';
    return;
  }

  let html = '<h3>📚 Kaydedilmiş Senaryolar</h3>';
  stories.forEach((s, i) => {
    const preview = s.text.substring(0, 100) + (s.text.length > 100 ? '...' : '');
    html += `
      <div class="scene">
        <b>Senaryo ${i + 1} - ${s.style}</b>
        <p style="color: #aaa; font-size: 0.9rem;">${s.date}</p>
        <p>${preview}</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
          <button class="btn-primary" onclick="playSaved(${i})" style="padding: 0.5rem; margin: 0;">▶️ Oynat</button>
          <button class="btn-secondary" onclick="deleteStory(${i})" style="padding: 0.5rem; margin: 0; background: #c23232;">🗑️ Sil</button>
        </div>
      </div>`;
  });

  savedDiv.innerHTML = html;
}

// Text to speech
function speakText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';
    utterance.rate = 0.9;
    try {
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.log('Ses sentezi desteklenmiyor');
    }
  }
}

// Show notification
function showNotification(msg) {
  const notif = document.createElement('div');
  notif.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #e50914;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    z-index: 1000;
    font-weight: bold;
  `;
  notif.textContent = msg;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}
