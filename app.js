const CONFIG = {
    KEYS: {
        PROGRESS: 'suraksha_prog_v7',
        CODE: 'suraksha_code_v7',
        VOICE: 'suraksha_voice_v1',
        AI_STUDIO: 'suraksha_ai_studio_v1'
    },
    COLORS: { CYAN: '#00f0ff', GREEN: '#10b981', RED: '#ef4444', MUTED: '#8b949e' }
};

// Read saved on/off preferences (default: both ON, matching the markup)
let aiStudioEnabled = localStorage.getItem(CONFIG.KEYS.AI_STUDIO) !== 'off';

// ==========================================
// 1. LOAD DATA (provided by data.js -> window.C_ASSIGNMENTS)
// ==========================================
const C_ASSIGNMENTS = window.C_ASSIGNMENTS || [];
if (C_ASSIGNMENTS.length === 0) {
    console.error("C_ASSIGNMENTS is empty — make sure data.js is loaded before app.js in index.html.");
}

// ==========================================
// 2. AMBIENT AUDIO & VOICE ENGINE
// ==========================================
class AudioEngine {
    constructor() {
        this.ctx = null;
        this.osc1 = null; this.osc2 = null;
        this.isPlaying = false;
        this.synth = window.speechSynthesis; 
        this.femaleVoice = null;
        this.voiceEnabled = localStorage.getItem(CONFIG.KEYS.VOICE) !== 'off';

        const loadVoices = () => {
            const voices = this.synth.getVoices();
            this.femaleVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Google'))) 
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
        
        utterance.rate = 1.0; 
        utterance.pitch = 1.0; 
        utterance.volume = 1.0;
        utterance.lang = 'en-US'; 
        
        if (this.femaleVoice) {
            utterance.voice = this.femaleVoice;
        }
        
        this.synth.speak(utterance);
    }

    // Toggle Voice Implementation
    toggleVoice(btnElement) {
        this.voiceEnabled = !this.voiceEnabled;
        localStorage.setItem(CONFIG.KEYS.VOICE, this.voiceEnabled ? 'on' : 'off');

        if (!this.voiceEnabled) {
            this.synth.cancel();
        }

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
// 3. CLOUD DATABASE (JSONBIN.IO)
// ==========================================
const BIN_ID = "6a5e31a7da38895dfe7685d5"; 
const API_KEY = "$2a$10$F0maGuUqRSceze6A.juiduAB4QpLrw9RUQGbMsHxwz5FFN11TtI1C"; 
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

let progress = [];
let codeMap = {};

// ==========================================
// 4. AUDIT REPORT GENERATOR
// ==========================================
function generateAuditLog() {
    if (!Array.isArray(progress) || progress.length === 0) {
        showToast("No targets verified. Audit log empty.");
        return;
    }
    
    let report = `====================================================\n`;
    report += `BASE-C : SECURITY AUDIT TRAIL\n`;
    report += `ARCHITECT   : SYSTEM ARCHITECT\n`;
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
// 5. MAIN UI CONTROLLER & AI STUDIO SWITCH
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
    cryptoScreen: document.getElementById('crypto-screen'),
    hashStream: document.getElementById('hash-stream')
};

// Toggle AI Studio Implementation
function refreshAIButton(btnElement) {
    if (!btnElement) return;
    if (aiStudioEnabled) {
        btnElement.classList.add('active');
        btnElement.classList.remove('off');
        btnElement.innerHTML = `<i data-lucide="bot" class="neon-icon"></i> AI Studio: ON`;
    } else {
        btnElement.classList.remove('active');
        btnElement.classList.add('off');
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
    
    showToast("Syncing with cloud database...");
    
    try {
        const response = await fetch(BIN_URL, {
            method: 'GET',
            headers: { 'X-Master-Key': API_KEY }
        });
        
        if (response.ok) {
            const data = await response.json();
            const cloudProgress = data?.record?.progress;
            const cloudCodeMap = data?.record?.codeMap;
            
            progress = Array.isArray(cloudProgress) ? cloudProgress : [];
            codeMap = (typeof cloudCodeMap === 'object' && cloudCodeMap !== null) ? cloudCodeMap : {};
            
            renderGrid(document.querySelector('.filter-btn.active')?.dataset.filter || 'all', DOM.search.value);
            updateStats();
            showToast("Cloud sync complete.");
        } else {
            console.error("Failed to load data");
            showToast("Warning: Loaded offline data.");
        }
    } catch (err) {
        console.error("Cloud sync error:", err);
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
        });
    });

    DOM.search.addEventListener('input', e => renderGrid(document.querySelector('.filter-btn.active').dataset.filter, e.target.value.toLowerCase()));
    DOM.exportBtn.addEventListener('click', generateAuditLog);
    DOM.audioBtn.addEventListener('click', () => audioSys.toggleDrone(DOM.audioBtn));
    
    // Binding the toggle events
    DOM.voiceBtn.addEventListener('click', () => audioSys.toggleVoice(DOM.voiceBtn));
    DOM.aiBtn.addEventListener('click', () => toggleAIStudio(DOM.aiBtn));
    
    DOM.themeBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('suraksha_theme', newTheme);
        
        DOM.themeBtn.innerHTML = newTheme === 'light' ? `<i data-lucide="moon"></i> Dark Mode` : `<i data-lucide="sun"></i> Light Mode`;
        lucide.createIcons();

        if (window.editor) {
            monaco.editor.setTheme(newTheme === 'light' ? 'vs' : 'vs-dark');
        }
        showToast(`${newTheme.toUpperCase()} theme engaged.`);
    });
    
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('save-btn').addEventListener('click', triggerCryptoUnlock);
    
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
                <span class="neon-text" style="font-weight:600; font-size:0.85rem; display:flex; align-items:center; gap:5px;">
                    Access Sandbox ${terminalIcon}
                </span>
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
    
    const fId = String(id).padStart(3, '0');
    document.getElementById('modal-task-title').innerText = `Target: #${fId}`;
    
    if (window.editor) {
        const tpl = `/* TARGET ID: ${fId}\n * ARCHITECT: System\n */\n\n#include <stdio.h>\n\nint main() {\n    printf("Target System Initialized.\\n");\n    return 0;\n}`;
        window.editor.setValue(codeMap[id] || tpl);
    }
    
    document.querySelector('[data-target="console"]').click();
    document.getElementById('terminal-out').innerHTML = `root@base-c:~# Target ${fId} loaded.<br/>root@base-c:~# Awaiting execution.`;
    document.getElementById('ai-chat').innerHTML = "";
    
    DOM.modal.classList.add('show');
    setTimeout(() => { if(window.editor) window.editor.layout(); }, 100);
}

function closeModal() {
    DOM.modal.classList.remove('show');
    currentTask = null;
}

// ==========================================
// 6. CRYPTOGRAPHIC PROGRESS UNLOCK
// ==========================================
function triggerCryptoUnlock() {
    if (!currentTask || !window.editor) return;
    
    DOM.cryptoScreen.classList.add('active');
    
    let interval = setInterval(() => {
        let hash = '0x';
        for(let i=0; i<8; i++) hash += Math.floor(Math.random()*16).toString(16).toUpperCase();
        DOM.hashStream.innerText = hash;
    }, 50);

    setTimeout(() => {
        clearInterval(interval);
        DOM.hashStream.innerText = "ACCESS GRANTED";
        DOM.hashStream.style.color = 'var(--neon-green)';
        
        setTimeout(() => {
            DOM.cryptoScreen.classList.remove('active');
            DOM.hashStream.style.color = 'var(--neon-cyan)'; 
            finalizeSave();
        }, 500);
    }, 1200);
}

async function finalizeSave() {
    const code = window.editor.getValue();
    codeMap[currentTask.id] = code;
    
    if (!Array.isArray(progress)) progress = [];
    
    if (!progress.includes(currentTask.id)) {
        progress.push(currentTask.id);
    }

    try {
        await fetch(BIN_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY 
            },
            body: JSON.stringify({ progress, codeMap })
        });
        
        updateStats();
        renderGrid(document.querySelector('.filter-btn.active').dataset.filter, DOM.search.value);
        showToast("CTF Flag Accepted. Memory sector encrypted to cloud.");
        audioSys.speak("Target secured. Database updated.");
    } catch (err) {
        console.error("Save failed:", err);
        showToast("ERROR: Could not sync to cloud.");
    }
}

// ==========================================
// 7. WANDBOX LIVE COMPILER & JOKE ENGINE
// ==========================================
function attachCompilerEvents() {
    const codingJokes = [
        "Why do C programmers wear glasses? Because they can't C sharp!",
        "I tried to tell a joke about a segmentation fault, but I lost my memory.",
        "Why did the programmer quit his job? Because he didn't get arrays!",
        "Even SURAKSHA AI cannot protect you from a missing semicolon!",
        "C programmers never die. They are just cast into void.",
        "A SQL query goes into a bar, walks up to two tables and asks: Can I join you? But since this is C, the bar just crashed.",
        "My code doesn't work, and I don't know why. My code works, and I don't know why either!"
    ];

    document.getElementById('run-btn').addEventListener('click', async () => {
        document.querySelector('[data-target="console"]').click();
        const code = window.editor ? window.editor.getValue() : "";
        const term = document.getElementById('terminal-out');
        const chat = document.getElementById('ai-chat');
        
        term.innerHTML = `<br/><span style="color:var(--neon-cyan);">root@base-c:~# gcc -O3 -Wall source_main.c -o payload_bin</span><br/><span style="color:var(--text-muted);">Compiling on Wandbox server...</span>`;
        
        try {
            const response = await fetch('https://wandbox.org/api/compile.json', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    compiler: 'gcc-head-c', 
                    code: code,
                    save: false
                })
            });

            const data = await response.json();

            if (data.status == 0) {
                const output = data.program_output || data.compiler_message || "";
                term.innerHTML += `<br/><br/><span style="color:var(--neon-green);">${output.replace(/\n/g, '<br/>')}</span>`;
                term.innerHTML += `<br/><span style="color:var(--neon-cyan);">root@base-c:~# Execution complete.</span>`;
                audioSys.speak("Compilation successful. Code executed perfectly.");
            } else {
                const fullError = data.compiler_error || data.program_error || "Unknown compilation error.";
                term.innerHTML += `<br/><br/><span style="color:var(--neon-red);">${fullError.replace(/\n/g, '<br/>')}</span>`;
                term.innerHTML += `<br/><span style="color:var(--neon-red);">root@base-c:~# Execution Failed.</span>`;
                
                let lineMatch = fullError.match(/prog\.c:(\d+)/);
                let textLineInfo = lineMatch ? `It looks like you messed up on line ${lineMatch[1]}. ` : "I found some syntax errors in your C code. ";
                
                let errorMatch = fullError.match(/error:\s*([^\n]+)/i);
                let specificError = errorMatch ? `The specific error is: ${errorMatch[1]}. ` : "";
                
                let randomJoke = codingJokes[Math.floor(Math.random() * codingJokes.length)];
                let voiceMessage = "Compilation failed. " + textLineInfo + specificError + randomJoke;
                
                if (aiStudioEnabled) {
                    document.querySelector('[data-target="ai"]').click();
                    chat.innerHTML = `
                        <div class="ai-msg system">
                            <h5><i data-lucide="shield-alert" style="color:var(--neon-red);"></i> System Profiler</h5>
                            <p style="color:var(--neon-red); font-size:0.9rem;">${textLineInfo} <br/> ${specificError}</p>
                            <p style="color:var(--text-main); font-style: italic; margin-top: 10px;">"${randomJoke}"</p>
                        </div>`;
                    lucide.createIcons();
                }
                audioSys.speak(voiceMessage);
            }

        } catch (error) {
            term.innerHTML += `<br/><span style="color:var(--neon-red);">root@base-c:~# API Error: Cloud compiler offline.</span>`;
            audioSys.speak("Error. Cannot connect to the compiler server.");
        }
    });

    document.getElementById('ai-scan-btn').addEventListener('click', () => {
        if (!aiStudioEnabled) {
            showToast("AI Studio is OFF. Enable it in System Tools to run a scan.");
            return;
        }
        document.querySelector('[data-target="ai"]').click();
        const chat = document.getElementById('ai-chat');
        const code = window.editor ? window.editor.getValue() : "";
        
        chat.innerHTML = `<div class="ai-msg system"><h5><i data-lucide="shield-check"></i> System Profiler</h5><p style="color:var(--text-muted); font-size:0.8rem;">Analyzing Abstract Syntax Tree...</p></div>`;
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
}

function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<i data-lucide="info" class="neon-icon"></i> <span>${msg}</span>`;
    document.getElementById('toast-container').appendChild(t);
    lucide.createIcons();
    setTimeout(() => { t.style.animation = "slideIn 0.4s reverse forwards"; setTimeout(() => t.remove(), 400); }, 3000);
}

// ==========================================
// 8. RESPONSIVE VIEWPORT ENGINE
// ==========================================
class ViewportMonitor {
    constructor() {
        this.checkScreen();
        window.addEventListener('resize', () => this.checkScreen());
    }

    checkScreen() {
        const width = window.innerWidth;
        const html = document.documentElement;
        
        if (width <= 768) {
            html.setAttribute('data-device', 'mobile');
        } else if (width <= 1024) {
            html.setAttribute('data-device', 'tablet');
        } else {
            html.setAttribute('data-device', 'desktop');
        }

        if (window.editor && document.getElementById('lab-modal').classList.contains('show')) {
            window.editor.layout();
        }
    }
}

const viewportSys = new ViewportMonitor();

window.addEventListener('DOMContentLoaded', () => {
    init();
    attachCompilerEvents();
});
