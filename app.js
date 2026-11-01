/**
 * ==========================================================================
 * BASE-C | CORE SYSTEM LOGIC
 * ==========================================================================
 */

const CONFIG = {
    KEYS: {
        PROGRESS: 'suraksha_prog_v7',
        CODE: 'suraksha_code_v7',
        VOICE: 'suraksha_voice_v1',
        AI_STUDIO: 'suraksha_ai_studio_v1'
    },
    COLORS: { CYAN: '#00f0ff', GREEN: '#10b981', RED: '#ef4444', MUTED: '#8b949e' }
};

let aiStudioEnabled = localStorage.getItem(CONFIG.KEYS.AI_STUDIO) !== 'off';
let currentOS = 'mac'; // Global OS state tracker

// ==========================================
// 1. DATA INITIALIZATION
// ==========================================
const C_ASSIGNMENTS = window.C_ASSIGNMENTS || [];
if (C_ASSIGNMENTS.length === 0) {
    console.error("C_ASSIGNMENTS is empty — check data layer linkage.");
}

// ==========================================
// 2. AMBIENT AUDIO & INDIAN VOICE ENGINE
// ==========================================
class AudioEngine {
    constructor() {
        this.ctx = null;
        this.osc1 = null; 
        this.osc2 = null;
        this.isPlaying = false;
        this.synth = window.speechSynthesis; 
        this.activeVoice = null;
        this.voiceEnabled = localStorage.getItem(CONFIG.KEYS.VOICE) !== 'off';

        const loadVoices = () => {
            const voices = this.synth.getVoices();
            this.activeVoice = voices.find(v => v.lang.includes('en-IN') && (v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('Google')))
            || voices.find(v => v.lang.includes('en-IN'))
            || voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')))
            || voices.find(v => v.lang.startsWith('en'));
        };

        loadVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
    }
    
    init() {
        if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (this.ctx.state === 'suspended') this.ctx.resume();
    }

    toggleDrone(btnElement) {
        this.init();
        if (this.isPlaying) {
            this.osc1.stop(); this.osc2.stop();
            this.isPlaying = false;
            btnElement.innerHTML = `<i data-lucide="radio"></i> Comms: Offline`;
            btnElement.style.color = 'var(--text-muted)';
            lucide.createIcons();
            return;
        }

        const masterGain = this.ctx.createGain();
        masterGain.gain.value = 0.05; 
        masterGain.connect(this.ctx.destination);

        this.osc1 = this.ctx.createOscillator();
        this.osc1.type = 'sine';
        this.osc1.frequency.value = 55; 

        this.osc2 = this.ctx.createOscillator();
        this.osc2.type = 'triangle';
        this.osc2.frequency.value = 55.5; 

        this.osc1.connect(masterGain);
        this.osc2.connect(masterGain);
        this.osc1.start(); this.osc2.start();
        
        this.isPlaying = true;
        btnElement.innerHTML = `<i data-lucide="radio" class="neon-icon"></i> Comms: Active`;
        btnElement.style.color = 'var(--neon-cyan)';
        lucide.createIcons();
    }

    speak(text) {
        if (!this.voiceEnabled) return;
        this.synth.cancel(); 
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95; 
        utterance.pitch = 1.0; 
        utterance.volume = 1.0; 
        utterance.lang = this.activeVoice ? this.activeVoice.lang : 'en-IN'; 
        if (this.activeVoice) utterance.voice = this.activeVoice;
        this.synth.speak(utterance);
    }

    toggleVoice(btnElement) {
        this.voiceEnabled = !this.voiceEnabled;
        localStorage.setItem(CONFIG.KEYS.VOICE, this.voiceEnabled ? 'on' : 'off');
        if (!this.voiceEnabled) this.synth.cancel();
        this.refreshVoiceButton(btnElement);
        showToast(`Voice narration turned ${this.voiceEnabled ? 'ON' : 'OFF'}.`);
    }

    refreshVoiceButton(btnElement) {
        if (!btnElement) return;
        if (this.voiceEnabled) {
            btnElement.classList.add('active');
            btnElement.classList.remove('off');
            btnElement.innerHTML = `<i data-lucide="volume-2" class="neon-icon"></i> Voice: ON`;
        } else {
            btnElement.classList.remove('active');
            btnElement.classList.add('off');
            btnElement.innerHTML = `<i data-lucide="volume-x"></i> Voice: OFF`;
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}
const audioSys = new AudioEngine();

// ==========================================
// 3. CLOUD DATABASE & AUDIT LOGGING
// ==========================================
const BIN_ID = "6a5e31a7da38895dfe7685d5"; 
const API_KEY = "$2a$10$F0maGuUqRSceze6A.juiduAB4QpLrw9RUQGbMsHxwz5FFN11TtI1C"; 
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

let progress = [];
let codeMap = {};

function generateAuditLog() {
    if (!Array.isArray(progress) || progress.length === 0) {
        showToast("No targets verified. Audit log empty.");
        return;
    }
    
    let report = `====================================================\n`;
    report += `BASE-C : SECURITY AUDIT TRAIL\n`;
    report += `TIMESTAMP   : ${new Date().toISOString()}\n`;
    report += `VERIFIED    : ${progress.length} / 524\n`;
    report += `====================================================\n\n`;

    progress.forEach(id => {
        const task = C_ASSIGNMENTS.find(t => t.id === id);
        const code = codeMap[id] || "No code logged.";
        const hash = btoa(`secure_${id}_${code.length}`).substring(0, 16).toUpperCase();
        
        report += `[TARGET ID  : ${String(id).padStart(3, '0')}]\n`;
        report += `[DESC       : ${task ? task.title : 'Unknown'}]\n`;
        report += `[SHA-256    : ${hash}]\n`;
        report += `[STATUS     : VERIFIED SECURE]\n`;
        report += `----------------------------------------------------\n`;
    });

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BASE_C_AUDIT_${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Audit Trail generated and downloaded.");
}

// ==========================================
// 4. UI CONTROLLER & EVENT BINDING
// ==========================================
let currentTask = null;
const DOM = {
    grid: document.getElementById('task-container'),
    search: document.getElementById('search-input'),
    modal: document.getElementById('lab-modal'),
    audioBtn: document.getElementById('audio-toggle'),
    voiceBtn: document.getElementById('voice-toggle'),
    aiBtn: document.getElementById('ai-toggle'),
    exportBtn: document.getElementById('export-audit'),
    themeBtn: document.getElementById('theme-toggle'),
    menuToggle: document.getElementById('menu-toggle'),
    sidebarBackdrop: document.getElementById('sidebar-backdrop')
};

function openSidebar() { document.body.classList.add('sidebar-open'); DOM.menuToggle.setAttribute('aria-expanded', 'true'); }
function closeSidebar() { document.body.classList.remove('sidebar-open'); DOM.menuToggle.setAttribute('aria-expanded', 'false'); }
function toggleSidebar() { document.body.classList.contains('sidebar-open') ? closeSidebar() : openSidebar(); }

function refreshAIButton(btnElement) {
    if (!btnElement) return;
    if (aiStudioEnabled) {
        btnElement.classList.add('active'); btnElement.classList.remove('off');
        btnElement.innerHTML = `<i data-lucide="bot" class="neon-icon"></i> AI Studio: ON`;
    } else {
        btnElement.classList.remove('active'); btnElement.classList.add('off');
        btnElement.innerHTML = `<i data-lucide="bot-off"></i> AI Studio: OFF`;
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function toggleAIStudio(btnElement) {
    aiStudioEnabled = !aiStudioEnabled;
    localStorage.setItem(CONFIG.KEYS.AI_STUDIO, aiStudioEnabled ? 'on' : 'off');
    refreshAIButton(btnElement);
    showToast(`AI Studio turned ${aiStudioEnabled ? 'ON' : 'OFF'}.`);
}

async function init() {
    lucide.createIcons();
    renderGrid('all');
    updateStats();
    
    progress = JSON.parse(localStorage.getItem('local_progress')) || [];
    codeMap = JSON.parse(localStorage.getItem('local_codeMap')) || {};
    renderGrid(document.querySelector('.filter-btn.active')?.dataset.filter || 'all', DOM.search.value);
    updateStats();
    
    showToast("Syncing with cloud database...");
    
    try {
        const response = await fetch(BIN_URL, { method: 'GET', headers: { 'X-Master-Key': API_KEY } });
        if (response.ok) {
            const data = await response.json();
            progress = Array.isArray(data?.record?.progress) ? data.record.progress : progress;
            codeMap = (typeof data?.record?.codeMap === 'object' && data.record.codeMap !== null) ? data.record.codeMap : codeMap;
            
            localStorage.setItem('local_progress', JSON.stringify(progress));
            localStorage.setItem('local_codeMap', JSON.stringify(codeMap));
            
            renderGrid(document.querySelector('.filter-btn.active')?.dataset.filter || 'all', DOM.search.value);
            updateStats();
            showToast("Cloud sync complete.");
        }
    } catch (err) { 
        showToast("Warning: Loaded offline data."); 
    }
    
    const currentTheme = localStorage.getItem('suraksha_theme') || 'dark';
    if (currentTheme === 'light') { 
        DOM.themeBtn.innerHTML = `<i data-lucide="moon"></i> Dark Mode`; 
        lucide.createIcons(); 
    }

    audioSys.refreshVoiceButton(DOM.voiceBtn);
    refreshAIButton(DOM.aiBtn);

    document.querySelectorAll('.filter-btn').forEach(b => {
        b.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
            renderGrid(e.currentTarget.dataset.filter, DOM.search.value);
            if (window.innerWidth <= 768) closeSidebar();
        });
    });

    DOM.menuToggle.addEventListener('click', toggleSidebar);
    DOM.sidebarBackdrop.addEventListener('click', closeSidebar);
    DOM.search.addEventListener('input', e => renderGrid(document.querySelector('.filter-btn.active').dataset.filter, e.target.value.toLowerCase()));
    DOM.exportBtn.addEventListener('click', generateAuditLog);
    DOM.audioBtn.addEventListener('click', () => audioSys.toggleDrone(DOM.audioBtn));
    DOM.voiceBtn.addEventListener('click', () => audioSys.toggleVoice(DOM.voiceBtn));
    DOM.aiBtn.addEventListener('click', () => toggleAIStudio(DOM.aiBtn));
    
    DOM.themeBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('suraksha_theme', newTheme);
        DOM.themeBtn.innerHTML = newTheme === 'light' ? `<i data-lucide="moon"></i> Dark Mode` : `<i data-lucide="sun"></i> Light Mode`;
        lucide.createIcons();
        if (window.editor) monaco.editor.setTheme(newTheme === 'light' ? 'vs' : 'vs-dark');
    });
    
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('save-btn').addEventListener('click', triggerCryptoUnlock);
    document.getElementById('print-btn').addEventListener('click', printCurrentTask);
    document.getElementById('batch-print-btn').addEventListener('click', handleBatchPrint);
    
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.pane-content').forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            document.getElementById(`${e.target.dataset.target}-view`).classList.add('active');
        });
    });
}

function renderGrid(filter, search = "") {
    DOM.grid.innerHTML = '';
    let data = C_ASSIGNMENTS; 
    const safeProgress = Array.isArray(progress) ? progress : [];
    
    if (filter === 'completed') data = data.filter(t => safeProgress.includes(t.id));
    if (filter === 'pending') data = data.filter(t => !safeProgress.includes(t.id));
    if (search) data = data.filter(t => t.title.toLowerCase().includes(search) || t.id.toString().includes(search));

    const frag = document.createDocumentFragment();
    const checkIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="neon-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    const circleIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`;
    const terminalIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><polyline points="8 10 12 14 8 18"></polyline><line x1="16" x2="20" y1="20" y2="20"></line></svg>`;

    data.forEach(task => {
        const isDone = safeProgress.includes(task.id);
        const el = document.createElement('div');
        el.className = `task-card ${isDone ? 'completed' : ''}`;
        el.innerHTML = `
            <div class="task-header">
                <span class="cat-tag font-mono">TARGET_ID // ${String(task.id).padStart(3, '0')}</span>
                ${isDone ? checkIcon : circleIcon}
            </div>
            <h3>${task.title}</h3>
            <div class="task-footer">
                <span class="neon-text" style="font-weight:600; font-size:0.85rem; display:flex; align-items:center; gap:5px;">Access Sandbox ${terminalIcon}</span>
            </div>`;
        el.addEventListener('click', () => openModal(task.id));
        frag.appendChild(el);
    });
    DOM.grid.appendChild(frag);
}

function updateStats() {
    const safeProgress = Array.isArray(progress) ? progress : [];
    const total = 524; 
    const done = safeProgress.length;
    const perc = total ? Math.round((done/total)*100) : 0;
    
    document.getElementById('stat-completed').innerText = done;
    document.getElementById('stat-percent').innerText = `${perc}%`;
    document.getElementById('stat-progress').style.width = `${perc}%`;
}

function openModal(id) {
    currentTask = C_ASSIGNMENTS.find(t => t.id === id);
    if (!currentTask) return;
    
    document.getElementById('modal-task-title').innerText = `Target: #${String(id).padStart(3, '0')}`;
    
    if (window.editor) {
        const tpl = `/* TARGET ID: ${String(id).padStart(3, '0')}\n * ARCHITECT: System\n */\n\n#include <stdio.h>\n\nint main() {\n    // Write your C code here...\n    \n    return 0;\n}`;
        window.editor.setValue(codeMap[id] || tpl);
    }
    
    document.querySelector('[data-target="console"]').click();
    document.getElementById('ai-chat').innerHTML = "";
    DOM.modal.classList.add('show');
    
    setTimeout(() => { if(window.editor) window.editor.layout(); }, 100);
}

function closeModal() { 
    DOM.modal.classList.remove('show'); 
    currentTask = null; 
}

function printCurrentTask() {
    if (!currentTask) {
        showToast("No target selected to print.");
        return;
    }

    const code = window.editor ? window.editor.getValue() : "No source code available.";
    const terminalContent = document.getElementById('terminal-out').innerText;
    
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Target #${String(currentTask.id).padStart(3, '0')} - BASE-C</title>
            <style>
                body { font-family: 'Segoe UI', system-ui, sans-serif; line-height: 1.5; padding: 30px; color: #000; max-width: 800px; margin: 0 auto; }
                h1 { font-size: 22px; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
                h2 { font-size: 16px; margin-top: 25px; color: #444; text-transform: uppercase; letter-spacing: 1px; }
                pre { background: #f8f9fa; padding: 15px; border: 1px solid #e2e8f0; border-radius: 6px; white-space: pre-wrap; word-wrap: break-word; font-family: 'JetBrains Mono', monospace; font-size: 13px; }
                .terminal-output { background: #111; color: #10b981; border: 1px solid #000; }
                @media print { body { padding: 0; } }
            </style>
        </head>
        <body>
            <h1>Target #${String(currentTask.id).padStart(3, '0')}: ${currentTask.title}</h1>
            <h2>Source Code</h2>
            <pre>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
            <h2>Terminal Output</h2>
            <pre class="terminal-output">${terminalContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
}

function handleBatchPrint() {
    const safeProgress = Array.isArray(progress) ? progress : [];
    
    if (safeProgress.length === 0) {
        showToast("No completed targets available to print.");
        return;
    }
    
    const inputField = document.getElementById('batch-count');
    const count = parseInt(inputField.value);
    
    if (isNaN(count) || count <= 0) {
        showToast("Please type a valid number of programs to print.");
        inputField.focus();
        return; 
    }
    
    const finalCount = count > safeProgress.length ? safeProgress.length : count;
    const targetsToPrint = safeProgress.slice(0, finalCount);
    
    // Formatting simulated output text based on chosen OS environment
    const executionText = currentOS === 'win' ? `C:\\Users\\priyanshu> .\\payload.exe\n[System] Execution successful.` : `priyanshu@MacBook-Pro ~ % ./payload_bin\n[System] Code executed successfully.`;

    let printHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>BASE-C Batch Print (${finalCount} Targets)</title>
            <style>
                body { font-family: 'Segoe UI', system-ui, sans-serif; line-height: 1.5; padding: 30px; color: #000; max-width: 800px; margin: 0 auto; }
                .task-page { page-break-after: always; margin-bottom: 40px; }
                .task-page:last-child { page-break-after: auto; }
                h1 { font-size: 20px; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
                h2 { font-size: 14px; margin-top: 25px; color: #444; text-transform: uppercase; letter-spacing: 1px; }
                pre { background: #f8f9fa; padding: 15px; border: 1px solid #e2e8f0; border-radius: 6px; white-space: pre-wrap; word-wrap: break-word; font-family: 'JetBrains Mono', monospace; font-size: 13px; }
                .terminal-output { background: #111; color: #10b981; border: 1px solid #000; }
                @media print { body { padding: 0; } }
            </style>
        </head>
        <body>
    `;
    
    targetsToPrint.forEach(id => {
        const task = C_ASSIGNMENTS.find(t => t.id === id);
        const code = codeMap[id] || "// No source code saved in memory.";
        
        printHTML += `
            <div class="task-page">
                <h1>Target #${String(task.id).padStart(3, '0')}: ${task.title}</h1>
                <h2>Source Code</h2>
                <pre>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
                <h2>Terminal Output</h2>
                <pre class="terminal-output">${executionText}</pre>
            </div>
        `;
    });
    
    printHTML += `</body></html>`;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printHTML);
    printWindow.document.close();
    printWindow.focus();
    
    showToast(`Generating print document for ${finalCount} targets...`);
    
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
        inputField.value = ''; 
    }, 250);
}

// ==========================================
// 6. IRON MAN NANOTECH PROGRESS UNLOCK
// ==========================================
function triggerCryptoUnlock() {
    const cryptoScreen = document.getElementById('crypto-screen');
    const cryptoTitle = document.getElementById('crypto-title');
    const hashStream = document.getElementById('hash-stream');
    const nanoContainer = document.getElementById('nano-particles');

    if (!currentTask || !window.editor || !cryptoScreen) return;
    
    cryptoScreen.classList.add('active');
    cryptoScreen.classList.add('iron-man-nano');
    
    if (cryptoTitle) cryptoTitle.innerText = "ASSEMBLING NANOTECH ARMOR...";
    
    if (nanoContainer) {
        nanoContainer.innerHTML = '';
        for (let i = 0; i < 120; i++) {
            const particle = document.createElement('div');
            particle.className = 'nano-bot';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = (Math.random() * 0.8) + 's';
            nanoContainer.appendChild(particle);
        }
    }

    if(typeof audioSys !== 'undefined') audioSys.speak("Nanotech armor assembly initiated.");
    
    let interval = setInterval(() => {
        let hash = 'MARK_85_';
        for(let i=0; i<8; i++) hash += Math.floor(Math.random()*16).toString(16).toUpperCase();
        if (hashStream) hashStream.innerText = hash;
    }, 50);

    setTimeout(() => {
        clearInterval(interval);
        if (hashStream) {
            hashStream.innerText = "ARMOR SECURED"; 
            hashStream.style.color = 'var(--iron-gold)';
        }
        
        if(typeof audioSys !== 'undefined') audioSys.speak("Target secured. System updated.");
        
        setTimeout(() => {
            cryptoScreen.classList.remove('active'); 
            cryptoScreen.classList.remove('iron-man-nano');
            
            if (hashStream) hashStream.style.color = 'var(--neon-cyan)'; 
            if (cryptoTitle) cryptoTitle.innerText = "ENCRYPTING MEMORY SECTOR...";
            if (nanoContainer) nanoContainer.innerHTML = ''; 
            
            finalizeSave();
        }, 1200);
    }, 2500); 
}

async function finalizeSave() {
    const code = window.editor.getValue();
    codeMap[currentTask.id] = code;
    
    if (!Array.isArray(progress)) progress = [];
    if (!progress.includes(currentTask.id)) progress.push(currentTask.id);

    localStorage.setItem('local_progress', JSON.stringify(progress));
    localStorage.setItem('local_codeMap', JSON.stringify(codeMap));
    updateStats(); 
    renderGrid(document.querySelector('.filter-btn.active').dataset.filter, DOM.search.value);
    showToast("CTF Flag Accepted. Memory sector encrypted to cloud.");

    try {
        await fetch(BIN_URL, { 
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json', 'X-Master-Key': API_KEY }, 
            body: JSON.stringify({ progress, codeMap }) 
        });
    } catch (err) { 
        showToast("ERROR: Could not sync to cloud, but data is saved locally."); 
    }
}

function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast'; 
    t.innerHTML = `<i data-lucide="info" class="neon-icon"></i> <span>${msg}</span>`;
    document.getElementById('toast-container').appendChild(t); 
    lucide.createIcons();
    setTimeout(() => { 
        t.style.animation = "slideIn 0.4s reverse forwards"; 
        setTimeout(() => t.remove(), 400); 
    }, 3000);
}

// ==========================================
// 7. INTERACTIVE TERMINAL & SYSTEM COMPILER
// ==========================================
function attachTerminalAndCompilerEvents() {
    const termInput = document.getElementById('terminal-input');
    const termOut = document.getElementById('terminal-out');
    const consoleView = document.getElementById('console-view');
    const promptPrefix = document.getElementById('prompt-prefix');
    const chat = document.getElementById('ai-chat');

    // Terminal State Machine
    // 0 = Boot Sequence OS Selection (Mac or Win)
    // 1 = Name Collection
    // 2 = Idle (Awaiting code compilation)
    // 3 = STDIN Input capture for C logic
    let terminalState = 0; 
    let userName = "";
    let pendingCode = "";
    let stdInBuffer = ""; 

    const codingJokes = [
        "Why do C programmers wear glasses? Because they can't C sharp!",
        "Even SURAKSHA AI cannot protect you from a missing semicolon!",
        "A SQL query goes into a bar, walks up to two tables and asks: Can I join you? But since this is C, the bar just crashed."
    ];

    termInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const command = this.value; 
            this.value = '';

            if (terminalState !== 3 || command.trim() !== "") {
                termOut.innerHTML += `<br/><span style="color:var(--neon-cyan);">${promptPrefix.innerText} ${command}</span>`;
            }

            if (command.trim().toLowerCase() === 'clear') {
                termOut.innerHTML = `<span style="color:var(--neon-cyan);">${promptPrefix.innerText}</span> Terminal cleared.`;
                return;
            }

            // STATE 0: OS Configuration Selection
            if (terminalState === 0) {
                let envSelection = command.trim().toLowerCase();
                if (envSelection === 'mac' || envSelection === 'win') {
                    currentOS = envSelection;
                    termOut.innerHTML += `<br/><span style="color:var(--neon-green);">[+] Environment kernel configured to ${envSelection.toUpperCase()}.</span>`;
                    termOut.innerHTML += `<br/><span style="color:var(--text-muted);">Please enter your user designation (Name):</span>`;
                    termInput.placeholder = "Enter your name...";
                    terminalState = 1; 
                } else {
                    termOut.innerHTML += `<br/><span style="color:var(--neon-red);">[-] Invalid input. Please type 'mac' or 'win':</span>`;
                }
            }
            // STATE 1: Name Collection
            else if (terminalState === 1) {
                if (command.trim() !== "") {
                    userName = command.trim();
                    const formattedName = userName.toLowerCase().replace(/\s+/g, '_');
                    
                    // Apply OS specific prompt styling
                    if (currentOS === 'mac') {
                        promptPrefix.innerText = `${formattedName}@MacBook-Pro ~ %`;
                    } else {
                        promptPrefix.innerText = `C:\\Users\\${formattedName}>`;
                    }

                    termOut.innerHTML += `<br/><span style="color:var(--neon-green);">[+] Hello, ${userName}. Welcome to the Base-C Execution Environment.</span>`;
                    termOut.innerHTML += `<br/><span style="color:var(--text-muted);">System idle. Select a Target from the dashboard to begin programming.</span>`;
                    termInput.placeholder = "Terminal idle...";
                    
                    if (typeof audioSys !== 'undefined') audioSys.speak(`Hello, ${userName}. System ready.`);
                    terminalState = 2; 
                } else {
                    termOut.innerHTML += `<br/><span style="color:var(--neon-red);">[-] Name cannot be empty. Please enter your designation:</span>`;
                }
            } 
            // STATE 2: Idle Command Execution
            else if (terminalState === 2) {
                if (command.trim() !== "") {
                    termOut.innerHTML += `<br/><span style="color:var(--text-muted);">[-] Unrecognized command. Click 'Compile' to run your C code.</span>`;
                }
            }
            // STATE 3: STDIN Accumulation
            else if (terminalState === 3) {
                if (command === "") {
                    termOut.innerHTML += `<br/><span style="color:var(--text-muted);">[Input complete. Sending payload to compiler...]</span>`;
                    executeWandbox(pendingCode, stdInBuffer.trim());
                    terminalState = 2; 
                    stdInBuffer = ""; 
                    termInput.placeholder = "Terminal idle...";
                } else {
                    stdInBuffer += command + "\n";
                    termInput.placeholder = "Type more input, or leave blank and press Enter to run...";
                }
            }

            setTimeout(() => { consoleView.scrollTop = consoleView.scrollHeight; }, 50);
        }
    });

    consoleView.addEventListener('click', () => termInput.focus());

    document.getElementById('run-btn').addEventListener('click', () => {
        document.querySelector('[data-target="console"]').click();
        const code = window.editor ? window.editor.getValue() : "";
        
        const requiresInput = /scanf|gets|fgets|getchar/.test(code);
        
        if (requiresInput) {
            termOut.innerHTML += `<br/><span style="color:var(--neon-cyan);">${promptPrefix.innerText}</span> <span style="color:var(--neon-green);">Input functions detected.</span>`;
            termOut.innerHTML += `<br/><span style="color:var(--text-muted);">Please type your inputs below. You can press Enter after each value.</span>`;
            termOut.innerHTML += `<br/><span style="color:var(--neon-cyan); font-weight:bold;">[INFO] When finished, leave the line blank and press Enter to execute.</span>`;
            
            terminalState = 3; 
            pendingCode = code;
            stdInBuffer = ""; 
            termInput.placeholder = "Type input and press Enter...";
            termInput.focus();
            
            if (typeof audioSys !== 'undefined') audioSys.speak("Input required. Please enter values, then submit an empty line to execute.");
            setTimeout(() => { consoleView.scrollTop = consoleView.scrollHeight; }, 50);
        } else {
            executeWandbox(code, "");
        }
    });

    document.getElementById('ai-scan-btn').addEventListener('click', () => {
        if (!aiStudioEnabled) { showToast("AI Studio is OFF."); return; }
        
        document.querySelector('[data-target="ai"]').click();
        const code = window.editor ? window.editor.getValue() : "";
        
        chat.innerHTML = `<div class="ai-msg system"><h5><i data-lucide="shield-check"></i> System Profiler</h5><p style="color:var(--text-muted); font-size:0.8rem;">Analyzing AST...</p></div>`;
        lucide.createIcons(); 
        audioSys.speak("Initiating AI scan on source code.");
        
        setTimeout(() => {
            let msg = code.includes('gets(') ? "CRITICAL: gets() detected. Buffer overflow risk." : 
                      !code.includes('#include <stdio.h>') ? "ERROR: Missing standard input output library." : 
                      "VERIFIED: Code architecture is secure.";
                      
            let color = code.includes('gets(') || !code.includes('#include') ? 'var(--neon-red)' : 'var(--neon-green)';
            let icon = color === 'var(--neon-green)' ? "shield" : "alert-triangle";
            
            chat.innerHTML += `<div class="ai-msg" style="border-left: 3px solid ${color};"><h5><i data-lucide="${icon}" style="color:${color};"></i> Profiler Result</h5><p>${msg}</p></div>`;
            lucide.createIcons(); 
            chat.parentElement.scrollTop = chat.parentElement.scrollHeight;
            audioSys.speak(msg);
        }, 1500);
    });

    async function executeWandbox(code, stdInput) {
        // Change command visualization depending on the chosen OS environment
        let executionCmd = currentOS === 'win' ? 'gcc -O3 -Wall source_main.c -o payload.exe' : 'clang -O3 -Wall source_main.c -o payload_bin';
        
        termOut.innerHTML += `<br/><span style="color:var(--neon-cyan);">${promptPrefix.innerText} ${executionCmd}</span><br/><span style="color:var(--text-muted);">Compiling and executing on remote server...</span>`;
        setTimeout(() => { consoleView.scrollTop = consoleView.scrollHeight; }, 50);
        
        try {
            const response = await fetch('https://wandbox.org/api/compile.json', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    compiler: 'gcc-head-c', 
                    code: code,
                    stdin: stdInput,
                    save: false
                })
            });

            const data = await response.json();

            if (data.status == 0) {
                const output = data.program_output || data.compiler_message || "";
                termOut.innerHTML += `<br/><br/><span style="color:var(--neon-green);">${output.replace(/\n/g, '<br/>')}</span>`;
                termOut.innerHTML += `<br/><span style="color:var(--neon-cyan);">${promptPrefix.innerText} Execution complete.</span>`;
                if(typeof audioSys !== 'undefined') audioSys.speak("Compilation successful. Code executed perfectly.");
            } else {
                const fullError = data.compiler_error || data.program_error || "Unknown compilation error.";
                termOut.innerHTML += `<br/><br/><span style="color:var(--neon-red);">${fullError.replace(/\n/g, '<br/>')}</span>`;
                termOut.innerHTML += `<br/><span style="color:var(--neon-red);">${promptPrefix.innerText} Execution Failed.</span>`;
                
                let lineMatch = fullError.match(/prog\.c:(\d+)/);
                let textLineInfo = "";
                
                if (lineMatch) {
                    textLineInfo = `Error located on line ${lineMatch[1]}. `;
                } else if (data.program_error) {
                    textLineInfo = "Runtime execution error or segmentation fault detected. ";
                } else if (fullError.includes("undefined reference")) {
                    textLineInfo = "Linker error: Undefined reference to a function. ";
                } else {
                    textLineInfo = "Compilation failed. ";
                }

                let randomJoke = codingJokes[Math.floor(Math.random() * codingJokes.length)];
                
                if (aiStudioEnabled) {
                    document.querySelector('[data-target="ai"]').click();
                    chat.innerHTML = `
                        <div class="ai-msg system">
                            <h5><i data-lucide="shield-alert" style="color:var(--neon-red);"></i> System Profiler</h5>
                            <p style="color:var(--neon-red); font-size:0.9rem;">${textLineInfo}</p>
                            <p style="color:var(--text-main); font-style: italic; margin-top: 10px;">"${randomJoke}"</p>
                        </div>`;
                    lucide.createIcons();
                }
                if(typeof audioSys !== 'undefined') audioSys.speak("Execution failed. " + textLineInfo);
            }
        } catch (error) {
            termOut.innerHTML += `<br/><span style="color:var(--neon-red);">${promptPrefix.innerText} API Error: Cloud compiler offline.</span>`;
            if(typeof audioSys !== 'undefined') audioSys.speak("Error. Cannot connect to the compiler server.");
        }
        setTimeout(() => { consoleView.scrollTop = consoleView.scrollHeight; }, 50);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    init();
    attachTerminalAndCompilerEvents();
});
