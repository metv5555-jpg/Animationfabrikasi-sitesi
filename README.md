# Animationfabrikasi-sitesi

Netflix ve Webtoon tarzı AI animasyon senaryo fabrikası — basit statik demo.

Site içeriği `public/index.html` içinde. Bu repo için hızlı deploy ayarlandı (GitHub Pages).

- Deploy yöntemi: GitHub Actions ile `public/` klasörü `gh-pages` dalına publish edilecek.
- Beklenen site linki: https://metv5555-jpg.github.io/Animationfabrikasi-sitesi/

Nasıl çalıştırırsınız:

1. Değişiklikleri commit/push yapın:

```bash
git add .
git commit -m "Add static site and GitHub Pages workflow"
git push origin main
```

2. GitHub Actions çalıştıktan sonra sayfa yukarıdaki linkten erişilebilir olacaktır.

Not: Deploy işlemi için repo ayarlarında GitHub Pages etkinse otomatik link çalışır. Eğer push sırasında problem yaşarsanız bana söyleyin, yardımcı olurum.
# Animationfabrikasi-sitesi
Netflix ve Webtoon tarzı AI animasyon senaryo fabrikası
<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Animasyon Fabrikası</title>

<style>
body {
  margin:0;
  font-family: Arial, sans-serif;
  background:#0b0b0b;
  color:#fff;
}
header {
  padding:15px;
  font-size:22px;
  font-weight:bold;
  background:#111;
}
.container {
  padding:15px;
}
select, textarea, button {
  width:100%;
  margin:8px 0;
  padding:10px;
  border-radius:6px;
  border:none;
}
button {
  background:#e50914;
  color:white;
  font-weight:bold;
}
.scene {
  margin-top:20px;
  padding:20px;
  background:#111;
  border-radius:10px;
  animation:fadeIn 1s;
}
@keyframes fadeIn {
  from {opacity:0; transform:scale(0.95);}
  to {opacity:1;}
}
.player {
  margin-top:20px;
  padding:15px;
  background:#000;
  border-radius:10px;
}
.small {
  opacity:0.7;
  font-size:13px;
}
</style>
</head>

<body>

<header>🎬 Animasyon Fabrikası</header>

<div class="container">

<h3>🎭 Türler (çoklu seç)</h3>
<select id="genres" multiple>
  <option>Aksiyon</option>
  <option>Korku</option>
  <option>Dram</option>
  <option>Komedi</option>
  <option>Fantastik</option>
  <option>Macera</option>
  <option>BL</option>
  <option>GL</option>
</select>

<h3>🎨 Çizim Tarzı</h3>
<select id="style">
  <option>Anime</option>
  <option>Webtoon</option>
  <option>Cartoon</option>
  <option>Dark Horror</option>
  <option>Realistic</option>
</select>

<h3>✍️ Senaryo</h3>
<textarea id="story" rows="6"
placeholder="Mehmet karanlık koridorda yürür. Kapı gıcırdar..."></textarea>

<button onclick="saveStory()">💾 Senaryoyu Kaydet</button>
<button onclick="playStory()">▶️ Animasyonu Oynat</button>

<div id="saved"></div>
<div id="player"></div>

</div>

<script>
let stories = JSON.parse(localStorage.getItem("stories")||"[]");

function saveStory(){
  const text = story.value.trim();
  if(!text) return alert("Senaryo boş");
  stories.push(text);
  localStorage.setItem("stories", JSON.stringify(stories));
  renderSaved();
}

function renderSaved(){
  saved.innerHTML="<h3>📚 Kayıtlı Senaryolar</h3>";
  stories.forEach((s,i)=>{
    saved.innerHTML+=`
      <div class="scene">
        <b>Senaryo ${i+1}</b>
        <button onclick="playSaved(${i})">Oynat</button>
        <button onclick="del(${i})">Sil</button>
      </div>`;
  });
}
renderSaved();

function del(i){
  stories.splice(i,1);
  localStorage.setItem("stories",JSON.stringify(stories));
  renderSaved();
}

function playSaved(i){
  play(stories[i]);
}

function playStory(){
  play(story.value);
}

function play(text){
  const scenes = splitScenes(text, 120);
  let index=0;
  player.innerHTML="";
  next();

  function next(){
    if(index>=scenes.length) return;
    const s = scenes[index];
    player.innerHTML=`
      <div class="player">
        <h2>Sahne ${index+1}</h2>
        <p>${s}</p>
        <p class="small">Karakter: Mehmet</p>
      </div>`;
    speak(s);
    cinematicEffect();
    index++;
    setTimeout(next, 4000);
  }
}

function splitScenes(text,len){
  let arr=[];
  for(let i=0;i<text.length;i+=len){
    arr.push(text.slice(i,i+len));
  }
  return arr;
}

function speak(text){
  const u = new SpeechSynthesisUtterance(text);
  u.lang="tr-TR";
  u.rate=0.95;
  speechSynthesis.speak(u);
}

function cinematicEffect(){
  document.body.style.background="#000";
  setTimeout(()=>document.body.style.background="#0b0b0b",300);
}
</script>

</body>
</html>
