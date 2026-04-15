/* ─── AfterROSC — Main JS ─── */

// Mobile menu toggle
document.getElementById('nav-toggle')?.addEventListener('click', () => {
  document.getElementById('nav-links')?.classList.toggle('open');
});

// Animated counters
const counters = document.querySelectorAll('.stat-number[data-count]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    if (el.dataset.animated) return;
    el.dataset.animated = 'true';
    const end = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * end) + suffix;
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  });
}, { threshold: 0.3 });
counters.forEach(c => observer.observe(c));

// Interactive SVG Map
const mapContainer = document.getElementById('map-container');
if (mapContainer) {
  const centers = [
    {name:"Hôpital Cochin",city:"Paris",type:"bureau",pi:"Pr Cariou, Dr Benghanem",lat:48.837,lng:2.339},
    {name:"CHU Nantes",city:"Nantes",type:"bureau",pi:"Dr Lascarrou",lat:47.211,lng:-1.554},
    {name:"Clinique Ambroise Paré",city:"Neuilly",type:"bureau",pi:"Pr Geri",lat:48.889,lng:2.269},
    {name:"CH Versailles",city:"Le Chesnay",type:"bureau",pi:"Dr Paul",lat:48.817,lng:2.125},
    {name:"Hôp. Lariboisière",city:"Paris",type:"bureau",pi:"Dr Deye",lat:48.882,lng:2.357},
    {name:"HEGP",city:"Paris",type:"bureau",pi:"Dr Hermann",lat:48.840,lng:2.301},
    {name:"Hôp. Necker",city:"Paris",type:"bureau",pi:"Dr Raphalen",lat:48.847,lng:2.315},
    {name:"Pitié-Salpêtrière",city:"Paris",type:"bureau",pi:"Pr Rohaut",lat:48.836,lng:2.364},
    {name:"GHU Sainte-Anne",city:"Paris",type:"bureau",pi:"Dr Calligaris",lat:48.834,lng:2.315},
    {name:"CH Massy",city:"Massy",type:"bureau",pi:"Dr Bougouin",lat:48.730,lng:2.270},
    {name:"CH Toulon",city:"Toulon",type:"bureau",pi:"Dr Chelly",lat:43.124,lng:5.940},
    {name:"CHU Caen",city:"Caen",type:"bureau",pi:"Dr Daubin",lat:49.206,lng:-0.364},
    {name:"Hôp. Erasme (ULB)",city:"Bruxelles",type:"intl",pi:"Pr Taccone",lat:50.813,lng:4.264},
    {name:"CHU Amiens",city:"Amiens",type:"reseau",lat:49.876,lng:2.286},
    {name:"CHU Angers",city:"Angers",type:"reseau",lat:47.479,lng:-0.559},
    {name:"CH Béthune",city:"Béthune",type:"reseau",lat:50.525,lng:2.636},
    {name:"CHU Brest",city:"Brest",type:"reseau",lat:48.393,lng:-4.490},
    {name:"CH Brive",city:"Brive",type:"reseau",lat:45.158,lng:1.531},
    {name:"CHU Henri Mondor",city:"Créteil",type:"reseau",lat:48.791,lng:2.452},
    {name:"CH Haguenau",city:"Haguenau",type:"reseau",lat:48.814,lng:7.792},
    {name:"CHD Vendée",city:"La Roche-sur-Yon",type:"reseau",lat:46.666,lng:-1.434},
    {name:"CHU Carémeau",city:"Nîmes",type:"reseau",lat:43.838,lng:4.360},
    {name:"CH Le Mans",city:"Le Mans",type:"reseau",lat:47.999,lng:0.179},
    {name:"CHU Montpellier",city:"Montpellier",type:"reseau",lat:43.631,lng:3.853},
    {name:"CHU Rennes",city:"Rennes",type:"reseau",lat:48.119,lng:-1.744},
    {name:"CHU Toulouse",city:"Toulouse",type:"reseau",lat:43.612,lng:1.401},
    {name:"CHU Lille",city:"Lille",type:"reseau",lat:50.610,lng:3.034},
    {name:"CHU Strasbourg",city:"Strasbourg",type:"reseau",lat:48.581,lng:7.743},
    {name:"HCL Lyon",city:"Lyon",type:"reseau",lat:45.744,lng:4.858},
    {name:"CHU Bordeaux",city:"Bordeaux",type:"reseau",lat:44.839,lng:-0.592},
    {name:"CHU Dijon",city:"Dijon",type:"reseau",lat:47.314,lng:5.058},
    {name:"CHU Grenoble",city:"Grenoble",type:"reseau",lat:45.182,lng:5.734},
    {name:"CHU Tours",city:"Tours",type:"reseau",lat:47.347,lng:0.693},
    {name:"CH Cannes",city:"Cannes",type:"reseau",lat:43.557,lng:7.017},
    {name:"CH Metz",city:"Metz",type:"reseau",lat:49.103,lng:6.218},
    {name:"CH Nancy",city:"Nancy",type:"reseau",lat:48.649,lng:6.152},
    {name:"CH Mulhouse",city:"Mulhouse",type:"reseau",lat:47.742,lng:7.299},
    {name:"CHU Poitiers",city:"Poitiers",type:"reseau",lat:46.553,lng:0.334},
    {name:"CH Nice",city:"Nice",type:"reseau",lat:43.710,lng:7.262},
    {name:"CH Orléans",city:"Orléans",type:"reseau",lat:47.862,lng:1.910},
  ];

  const W=580, H=500;
  const bounds={minLat:42.2,maxLat:51.5,minLng:-5.5,maxLng:9.0};
  const geoToSvg=(lat,lng)=>({
    x:((lng-bounds.minLng)/(bounds.maxLng-bounds.minLng))*W,
    y:H-((lat-bounds.minLat)/(bounds.maxLat-bounds.minLat))*H
  });

  const colors={bureau:'#c9943e',intl:'#e5705e',reseau:'#1a6b6a'};

  let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block" xmlns="http://www.w3.org/2000/svg">`;
  // Background grid
  svg += `<defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,.04)" stroke-width=".5"/></pattern></defs>`;
  svg += `<rect width="${W}" height="${H}" fill="url(#grid)"/>`;

  // France outline
  const fr = [[51,1.8],[50.9,2.5],[49.5,8.2],[48.9,8.1],[47.6,7.5],[47.3,7],[46.4,6.2],[45.9,6.8],[44.8,7],[43.8,7.5],[43.4,6.9],[43.2,5],[42.4,3.2],[42.5,1.7],[43.3,-1.8],[43.4,-1.6],[45.5,-1.2],[46.2,-1.1],[47.3,-2.5],[47.7,-3],[48,-4.8],[48.6,-4.5],[48.8,-3.5],[48.7,-2],[48.9,-1.2],[49.7,-1.9],[49.7,-1.2],[50,.2],[50.9,1.6]];
  svg += `<polygon points="${fr.map(([la,ln])=>{const p=geoToSvg(la,ln);return p.x+','+p.y}).join(' ')}" fill="rgba(26,107,106,.1)" stroke="rgba(26,107,106,.25)" stroke-width="1.5"/>`;

  // Center dots
  centers.forEach((c,i)=>{
    const p = geoToSvg(c.lat, c.lng);
    const col = colors[c.type];
    const r = c.type==='bureau'?5:c.type==='intl'?5:3.5;
    // Glow
    svg += `<circle cx="${p.x}" cy="${p.y}" r="${r+3}" fill="${col}" opacity=".12"/>`;
    // Dot
    svg += `<circle cx="${p.x}" cy="${p.y}" r="${r}" fill="${col}" stroke="#0c1f3f" stroke-width="1.2" class="map-dot" data-idx="${i}"/>`;
    // Pulse for bureau
    if(c.type==='bureau'){
      svg += `<circle cx="${p.x}" cy="${p.y}" r="8" fill="none" stroke="${col}" stroke-width=".8" opacity=".3"><animate attributeName="r" from="7" to="14" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" from=".4" to="0" dur="3s" repeatCount="indefinite"/></circle>`;
    }
  });

  svg += '</svg>';

  // Legend
  const legend = `<div style="display:flex;gap:20px;padding:16px 20px">
    <span style="display:flex;align-items:center;gap:6px;color:rgba(255,255,255,.55);font-size:12px"><span style="width:8px;height:8px;border-radius:50%;background:#c9943e;display:inline-block"></span>Bureau</span>
    <span style="display:flex;align-items:center;gap:6px;color:rgba(255,255,255,.55);font-size:12px"><span style="width:8px;height:8px;border-radius:50%;background:#e5705e;display:inline-block"></span>International</span>
    <span style="display:flex;align-items:center;gap:6px;color:rgba(255,255,255,.55);font-size:12px"><span style="width:8px;height:8px;border-radius:50%;background:#1a6b6a;display:inline-block"></span>Réseau</span>
  </div>`;

  // Tooltip
  const tooltip = `<div id="map-tooltip" style="display:none;position:absolute;background:#1a2332ee;color:white;padding:8px 14px;border-radius:8px;font-size:12px;pointer-events:none;z-index:10;max-width:240px;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.1)"></div>`;

  mapContainer.innerHTML = `<div style="position:relative">${svg}${tooltip}</div>${legend}`;

  // Tooltip interaction
  const tip = document.getElementById('map-tooltip');
  mapContainer.querySelectorAll('.map-dot').forEach(dot => {
    dot.style.cursor = 'pointer';
    dot.addEventListener('mouseenter', (e) => {
      const c = centers[dot.dataset.idx];
      tip.innerHTML = `<strong>${c.name}</strong><br><span style="color:rgba(255,255,255,.5)">${c.city}${c.pi ? ' · '+c.pi : ''}</span>`;
      tip.style.display = 'block';
      const rect = mapContainer.querySelector('svg').getBoundingClientRect();
      const cx = parseFloat(dot.getAttribute('cx'));
      const cy = parseFloat(dot.getAttribute('cy'));
      tip.style.left = (cx/W*rect.width + 12) + 'px';
      tip.style.top = (cy/H*rect.height - 10) + 'px';
    });
    dot.addEventListener('mouseleave', () => { tip.style.display = 'none'; });
  });
}
