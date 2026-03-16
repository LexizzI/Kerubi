const themes = {
    kerubi: { name: "Kerubi", background: "#0a0412", text: "#e6dcff", primary: "#9d4edd", contrast: "#1f1035", contrast2: "#140824" },
    default: { name: "NaxStart", background: "#282a36", text: "#f5e2f8", primary: "#ff79c6", contrast: "#282a36", contrast2: "#21222c" },
    ubuntu: { name: "Ubuntu", background: "#300a24", text: "#ffffff", primary: "#e95420", contrast: "#5e2750", contrast2: "#2c0720" },
    gruvbox: { name: "Gruvbox", background: "#282828", text: "#ebdbb2", primary: "#fabd2f", contrast: "#3c3836", contrast2: "#1d2021" },
    arch: { name: "Arch Linux", background: "#1793d1", text: "#ffffff", primary: "#333333", contrast: "#0f5f88", contrast2: "#0c4b6c" },
    kali: { name: "Kali Linux", background: "#000000", text: "#ffffff", primary: "#2f8dff", contrast: "#1a1a1a", contrast2: "#0d0d0d" },
    manjaro: { name: "Manjaro", background: "#2d3133", text: "#eeeeee", primary: "#35bf5c", contrast: "#3b444b", contrast2: "#1f2324" },
    dracula: { name: "Dracula", background: "#282a36", text: "#f8f8f2", primary: "#bd93f9", contrast: "#44475a", contrast2: "#191a21" },
    solarized: { name: "Solarized Dark", background: "#002b36", text: "#839496", primary: "#268bd2", contrast: "#073642", contrast2: "#001e26" },
    fedora: { name: "Fedora", background: "#294172", text: "#ffffff", primary: "#ffffff", contrast: "#3c6eb4", contrast2: "#1e2f53" },
    rosepine: { name: "Rosé Pine", background: "#191724", text: "#e0def4", primary: "#eb6f92", contrast: "#1f1d2e", contrast2: "#26233a" },
    tokyoNight: { name: "Tokyo Night", background: "#1a1b26", text: "#a9b1d6", primary: "#7aa2f7", contrast: "#24283b", contrast2: "#414868" },
    nord: { name: "Nord", background: "#2e3440", text: "#eceff4", primary: "#88c0d0", contrast: "#3b4252", contrast2: "#434c5e" },
    catppuccin: { name: "Catppuccin Mocha", background: "#1e1e2e", text: "#cdd6f4", primary: "#cba6f7", contrast: "#181825", contrast2: "#313244" },
    everforest: { name: "Everforest", background: "#2d353b", text: "#d3c6aa", primary: "#a7c080", contrast: "#343f44", contrast2: "#3d484d" },
    cyberpunk: { name: "Cyberpunk 2077", background: "#fdee00", text: "#000000", primary: "#00f0ff", contrast: "#fdee00", contrast2: "#e5d500" },
    fallout: { name: "Vault-Tec", background: "#00204a", text: "#ffcb05", primary: "#ffcb05", contrast: "#00306b", contrast2: "#001a3d" },
    doom: { name: "DOOM Eternal", background: "#0a0a0a", text: "#ff0000", primary: "#ff4500", contrast: "#1a1a1a", contrast2: "#330000" },
    minecraft: { name: "Minecraft Grass", background: "#4d9043", text: "#ffffff", primary: "#795548", contrast: "#3d7335", contrast2: "#2e5728" },
    portal: { name: "Aperture Science", background: "#ffffff", text: "#444444", primary: "#00a4ff", contrast: "#e5e5e5", contrast2: "#cccccc" },
    halo: { name: "Master Chief", background: "#343d28", text: "#d4af37", primary: "#515e41", contrast: "#2a3120", contrast2: "#1e2317" },
    synthwave: { name: "Synthwave Sunset", background: "#2b0b3d", text: "#e0def4", primary: "#f92aad", contrast: "#3d155f", contrast2: "#1a0628" },
    matrix: { name: "Matrix Code", background: "#000000", text: "#00ff41", primary: "#008f11", contrast: "#0d0d0d", contrast2: "#003b00" },
    coffee: { name: "Espresso Roast", background: "#1b1411", text: "#d7baad", primary: "#a67c52", contrast: "#2a1f1b", contrast2: "#120d0b" },
    bubblegum: { name: "Bubblegum Y2K", background: "#ffafcc", text: "#2b2d42", primary: "#ff006e", contrast: "#ffc8dd", contrast2: "#fb6f92" },
    blackPink: { name: "BlackPink", background: "#000000", text: "#ffffff", primary: "#ff5da2", contrast: "#1a1a1a", contrast2: "#111111" },
    neonRose: { name: "Neon Rose", background: "#0a090c", text: "#fde2e4", primary: "#ff007f", contrast: "#1b191d", contrast2: "#141216" },
    sakuraDark: { name: "Sakura Night", background: "#1d1a21", text: "#ffd6e0", primary: "#ff99c8", contrast: "#2a2431", contrast2: "#16131a" },
    cyberDoll: { name: "Cyber Doll", background: "#23001e", text: "#ff00d4", primary: "#ff00d4", contrast: "#380030", contrast2: "#1a0016" }
};

let tasks = JSON.parse(localStorage.getItem('kerubi_tasks')) || [];
let editingId = null;

function saveToLocalStorage() {
    localStorage.setItem('kerubi_tasks', JSON.stringify(tasks));
}

function changeTheme(key) {
    const t = themes[key];
    const r = document.documentElement;
    r.style.setProperty('--background', t.background);
    r.style.setProperty('--text', t.text);
    r.style.setProperty('--primary', t.primary);
    r.style.setProperty('--contrast', t.contrast);
    r.style.setProperty('--contrast2', t.contrast2);
    localStorage.setItem('kerubi_theme_key', key);
    document.getElementById('theme-select').value = key;
}

function toggleConfig() {
    const el = document.getElementById('config-panel');
    const delBtn = document.getElementById('delete-btn');
    const saveBtn = document.getElementById('save-btn');
    
    if (el.style.display === 'none' || el.style.display === '') {
        el.style.display = 'flex';
    } else {
        el.style.display = 'none';
        editingId = null; 
        if(delBtn) delBtn.style.display = 'none'; 
        if(saveBtn) saveBtn.innerText = "Register in Kerubi";
        document.getElementById('task-title').value = '';
        document.getElementById('task-date').value = '';
        document.getElementById('task-time').value = '';
        document.getElementById('steps-list').innerHTML = '';
        document.querySelector('.config-header h2').innerText = "Schedule Task";
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    editingId = id; 
    
    const el = document.getElementById('config-panel');
    el.style.display = 'flex';
    
    const saveBtn = document.getElementById('save-btn');
    const delBtn = document.getElementById('delete-btn');
    if(saveBtn) saveBtn.innerText = "Save Changes";
    if(delBtn) delBtn.style.display = 'block';
    
    document.querySelector('.config-header h2').innerText = "Edit Task";
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-date').value = task.date;
    document.getElementById('task-time').value = task.time === "--:--" ? "" : task.time;
    document.getElementById('task-type').value = task.type;
    
    toggleStepBuilder(task.type);
    if (task.type === 'series') {
        document.getElementById('steps-list').innerHTML = '';
        task.steps.forEach(s => addStepField(s.title, s.desc));
    }
}

function deleteTask() {
    if (editingId === null) {
        alert("Select a task first.");
        return;
    }
    
    if (confirm("Delete this mission permanently?")) {
        tasks = tasks.filter(t => t.id !== editingId);
        saveToLocalStorage();
        render();
        const el = document.getElementById('config-panel');
        el.style.display = 'none';
        editingId = null;
    }
}

function toggleStepBuilder(type) {
    const b = document.getElementById('step-builder');
    if(!b) return;
    type === 'series' ? b.classList.remove('hidden') : b.classList.add('hidden');
    if(type === 'series' && document.getElementById('steps-list').children.length === 0) addStepField();
}

function addStepField(title = '', desc = '') {
    const container = document.getElementById('steps-list');
    const div = document.createElement('div');
    div.className = 'step-entry';
    div.style.marginBottom = "10px";
    div.innerHTML = `
        <input type="text" class="k-input step-t" placeholder="Step name" value="${title}">
        <input type="text" class="k-input step-d" placeholder="Description" style="font-size:0.8em; margin-top:5px" value="${desc}">
    `;
    container.appendChild(div);
}

function saveTask() {
    const title = document.getElementById('task-title').value;
    const date = document.getElementById('task-date').value;
    const time = document.getElementById('task-time').value;
    const type = document.getElementById('task-type').value;

    if (!title || !date) return alert("Title and date are mandatory");

    const steps = [];
    if (type === 'series') {
        document.querySelectorAll('.step-entry').forEach(e => {
            const val = e.querySelector('.step-t').value;
            if(val) steps.push({ title: val, desc: e.querySelector('.step-d').value });
        });
    }

    if (editingId) {
        const index = tasks.findIndex(t => t.id === editingId);
        tasks[index] = { ...tasks[index], title, date, time: time || "--:--", type, steps };
    } else {
        tasks.push({ id: Date.now(), title, date, time: time || "--:--", type, steps });
    }

    saveToLocalStorage();
    render();
    toggleConfig();
}

function render() {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const currentTimeStr = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');

    const tList = document.getElementById('today-tasks');
    const uList = document.getElementById('upcoming-tasks');
    if(!tList || !uList) return;

    tList.innerHTML = ''; uList.innerHTML = '';
    
    const sortedTasks = [...tasks].sort((a, b) => a.time.localeCompare(b.time));

    sortedTasks.forEach(t => {
        const isToday = t.date === todayStr;
        const isPastDate = t.date < todayStr;
        const isPastTime = isToday && t.time !== "--:--" && t.time < currentTimeStr;
        const isExpired = isPastDate || isPastTime;

        const stepsHtml = t.steps.map(step => `
            <div style="margin-top: 8px; padding-left: 10px; border-left: 2px solid var(--primary); opacity: 0.9;">
                <div style="font-weight: 600; font-size: 0.85em;">${step.title}</div>
                ${step.desc ? `<div style="font-size: 0.75em; opacity: 0.6; margin-left: 12px;">${step.desc}</div>` : ''}
            </div>
        `).join('');

        const html = `
            <div class="task-card ${isToday ? 'today' : ''} ${isExpired ? 'expired' : ''}" onclick="editTask(${t.id})">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                        <h3 style="margin: 0; color: var(--primary);">${t.title}</h3>
                        ${isExpired ? '<span class="expired-tag">Expired</span>' : ''}
                    </div>
                    <span style="opacity: 0.5; font-size: 0.8em;">${t.time}</span>
                </div>
                <p style="opacity: 0.4; font-size: 0.75em; margin: 5px 0 10px 0;">${t.date}</p>
                <div class="task-description-area">${stepsHtml}</div>
            </div>`;
            
        isToday ? tList.innerHTML += html : uList.innerHTML += html;
    });
}

window.onload = () => {
    const sel = document.getElementById('theme-select');
    if(sel) {
        sel.innerHTML = ''; // Limpiamos por si acaso
        for (let k in themes) {
            const opt = document.createElement('option');
            opt.value = k;
            opt.innerText = themes[k].name;
            sel.appendChild(opt);
        }
    }
    
    const savedTheme = localStorage.getItem('kerubi_theme_key') || 'kerubi';
    changeTheme(savedTheme);

    // ... resto del código (dateDisp, render, etc)

    
    setInterval(render, 60000);
    render();
};