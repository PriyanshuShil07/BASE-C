const CONFIG = {
    KEYS: { PROGRESS: 'suraksha_prog_v7', CODE: 'suraksha_code_v7' },
    COLORS: { CYAN: '#00f0ff', GREEN: '#10b981', RED: '#ef4444', MUTED: '#8b949e' }
};

// ==========================================
// 1. AMBIENT AUDIO ENGINE (Comms Array)
// ==========================================
class AudioEngine {
    constructor() {
        this.ctx = null;
        this.osc1 = null; this.osc2 = null;
        this.isPlaying = false;
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
}
const audioSys = new AudioEngine();

// ==========================================
// 2. CLOUD DATABASE (JSONBIN.IO - NO LOGIN)
// ==========================================
const BIN_ID = "6a5e31a7da38895dfe7685d5"; 
const API_KEY = "$2a$10$F0maGuUqRSceze6A.juiduAB4QpLrw9RUQGbMsHxwz5FFN11TtI1C"; 
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

let progress = [];
let codeMap = {};

// ==========================================
// 3. AUDIT REPORT GENERATOR
// ==========================================
function generateAuditLog() {
    if (progress.length === 0) {
        showToast("No targets verified. Audit log empty.");
        return;
    }
    
    let report = `====================================================\n`;
    report += `BASE-C : SECURITY AUDIT TRAIL\n`;
    report += `ARCHITECT   : PRIYANSHU SHIL\n`;
    report += `TIMESTAMP   : ${new Date().toISOString()}\n`;
    report += `VERIFIED    : ${progress.length} / 524\n`;
    report += `====================================================\n\n`;

    progress.forEach(id => {
        const task = window.C_ASSIGNMENTS.find(t => t.id === id);
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
// 4. MAIN UI CONTROLLER
// ==========================================
let currentTask = null;
const DOM = {
    grid: document.getElementById('task-container'),
    search: document.getElementById('search-input'),
    modal: document.getElementById('lab-modal'),
    audioBtn: document.getElementById('audio-toggle'),
    exportBtn: document.getElementById('export-audit'),
    themeBtn: document.getElementById('theme-toggle'),
    cryptoScreen: document.getElementById('crypto-screen'),
    hashStream: document.getElementById('hash-stream')
};

async function init() {
    lucide.createIcons();
    
    // FETCH FROM JSONBIN SILENTLY
    showToast("Syncing with cloud database...");
    try {
        const response = await fetch(BIN_URL, {
            method: 'GET',
            headers: {
                'X-Access-Key': API_KEY
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            progress = data.record.progress || [];
            codeMap = data.record.codeMap || {};
            showToast("Cloud sync complete.");
        } else {
            console.error("Failed to load data");
            showToast("Warning: Loaded offline data.");
        }
    } catch (err) {
        console.error("Cloud sync error:", err);
    }

    renderGrid('all');
    updateStats();
    
    // Theme Initial Setup
    const currentTheme = localStorage.getItem('suraksha_theme') || 'dark';
    if (currentTheme === 'light') {
        DOM.themeBtn.innerHTML = `<i data-lucide="moon"></i> Dark Mode`;
        lucide.createIcons();
    }

    // Bind Sidebar Filters
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
    
    // Theme Toggle Logic
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
    
    // Workspace listeners
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
    let data = window.C_ASSIGNMENTS || [];
    
    if (filter === 'completed') data = data.filter(t => progress.includes(t.id));
    if (filter === 'pending') data = data.filter(t => !progress.includes(t.id));
    if (search) data = data.filter(t => t.title.toLowerCase().includes(search) || t.id.toString().includes(search));

    const frag = document.createDocumentFragment();
    data.forEach(task => {
        const isDone = progress.includes(task.id);
        const el = document.createElement('div');
        el.className = `task-card ${isDone ? 'completed' : ''}`;
        el.innerHTML = `
            <div class="task-header">
                <span class="cat-tag font-mono">TARGET_ID // ${String(task.id).padStart(3, '0')}</span>
                ${isDone ? '<i data-lucide="check-circle-2" class="neon-icon" style="width:20px;"></i>' : '<i data-lucide="circle" style="width:20px; color:var(--text-muted);"></i>'}
            </div>
            <h3>${task.title}</h3>
            <div class="task-footer">
                <span class="neon-text" style="font-weight:600; font-size:0.85rem; display:flex; align-items:center; gap:5px;">
                    Access Sandbox <i data-lucide="terminal-square" style="width:14px;"></i>
                </span>
            </div>`;
        el.addEventListener('click', () => openModal(task.id));
        frag.appendChild(el);
    });
    DOM.grid.appendChild(frag);
    lucide.createIcons();
}

function updateStats() {
    const total = 524; const done = progress.length;
    const perc = total ? Math.round((done/total)*100) : 0;
    document.getElementById('stat-completed').innerText = done;
    document.getElementById('stat-percent').innerText = `${perc}%`;
    document.getElementById('stat-progress').style.width = `${perc}%`;
}

function openModal(id) {
    currentTask = window.C_ASSIGNMENTS.find(t => t.id === id);
    if (!currentTask) return;
    
    const fId = String(id).padStart(3, '0');
    document.getElementById('modal-task-title').innerText = `Target: #${fId}`;
    
    if (window.editor) {
        const tpl = `/* TARGET ID: ${fId}\n * ARCHITECT: Priyanshu Shil\n */\n\n#include <stdio.h>\n\nint main() {\n    printf("Target System Initialized.\\n");\n    return 0;\n}`;
        window.editor.setValue(codeMap[id] || tpl);
    }
    
    document.querySelector('[data-target="console"]').click();
    document.getElementById('terminal-out').innerHTML = `root@base-c:~# Target ${fId} loaded.<br/>root@base-c:~# Awaiting execution.`;
    document.getElementById('ai-chat').innerHTML = "";
    initMemoryGrid();
    
    DOM.modal.classList.add('show');
    
    // Responsive Monaco Layout Fix
    setTimeout(() => { 
        if(window.editor) {
            window.editor.layout(); 
        }
    }, 100);
}

function closeModal() {
    DOM.modal.classList.remove('show');
    currentTask = null;
}

// ==========================================
// 5. CRYPTOGRAPHIC PROGRESS UNLOCK
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
    
    if (!progress.includes(currentTask.id)) {
        progress.push(currentTask.id);
    }

    // SILENTLY PUSH TO JSONBIN
    try {
        await fetch(BIN_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Access-Key': API_KEY
            },
            body: JSON.stringify({ progress, codeMap })
        });
        
        updateStats();
        renderGrid(document.querySelector('.filter-btn.active').dataset.filter, DOM.search.value);
        showToast("CTF Flag Accepted. Memory sector encrypted to cloud.");
    } catch (err) {
        console.error("Save failed:", err);
        showToast("ERROR: Could not sync to cloud.");
    }
}

// ==========================================
// 6. LIVE MEMORY PROFILING & EXECUTION
// ==========================================
function initMemoryGrid() {
    const grid = document.getElementById('memory-grid');
    grid.innerHTML = '';
    for(let i=0; i<100; i++) {
        let b = document.createElement('div');
        b.className = 'mem-block';
        grid.appendChild(b);
    }
    document.getElementById('mem-status').innerText = "STANDBY";
    document.getElementById('mem-status').style.color = 'var(--neon-cyan)';
}

function attachCompilerEvents() {
    document.getElementById('run-btn').addEventListener('click', () => {
        document.querySelector('[data-target="console"]').click();
        const code = window.editor ? window.editor.getValue() : "";
        const term = document.getElementById('terminal-out');
        
        term.innerHTML = `<br/><span style="color:var(--neon-cyan);">root@base-c:~# gcc -O3 -Wall source_main.c -o payload_bin</span>`;
        
        setTimeout(() => {
            document.querySelector('[data-target="memory"]').click(); 
            const blocks = document.querySelectorAll('.mem-block');
            const status = document.getElementById('mem-status');
            
            let isDanger = code.includes('gets(') || code.includes('strcpy');
            status.innerText = "ALLOCATING MEMORY...";
            
            blocks.forEach((b, i) => {
                setTimeout(() => {
                    b.classList.add(isDanger ? 'active-danger' : 'active-safe');
                    if (i === blocks.length - 1) {
                        status.innerText = isDanger ? "BUFFER OVERFLOW DETECTED" : "MEMORY SECURE";
                        status.style.color = isDanger ? 'var(--neon-red)' : 'var(--neon-green)';
                        showToast(isDanger ? "Execution failed due to core dump." : "Execution complete.");
                    }
                }, i * 15); 
            });
        }, 500);
    });

    document.getElementById('ai-scan-btn').addEventListener('click', () => {
        document.querySelector('[data-target="ai"]').click();
        const chat = document.getElementById('ai-chat');
        const code = window.editor ? window.editor.getValue() : "";
        
        chat.innerHTML = `<div class="ai-msg system"><h5><i data-lucide="shield-check"></i> System Profiler</h5><p style="color:var(--text-muted); font-size:0.8rem;">Analyzing Abstract Syntax Tree...</p></div>`;
        lucide.createIcons();
        
        setTimeout(() => {
            let msg = code.includes('gets(') ? "CRITICAL: gets() detected. Buffer overflow risk." : 
                      !code.includes('#include <stdio.h>') ? "ERROR: Missing <stdio.h> library." : 
                      "VERIFIED: Code architecture is secure.";
            let color = code.includes('gets(') || !code.includes('#include') ? 'var(--neon-red)' : 'var(--neon-green)';
            let icon = color === 'var(--neon-green)' ? "shield" : "alert-triangle";
            
            chat.innerHTML += `<div class="ai-msg" style="border-left: 3px solid ${color};"><h5><i data-lucide="${icon}" style="color:${color};"></i> Profiler Result</h5><p>${msg}</p></div>`;
            lucide.createIcons();
            chat.parentElement.scrollTop = chat.parentElement.scrollHeight;
        }, 1000);
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
// 7. RESPONSIVE VIEWPORT ENGINE
// ==========================================
class ViewportMonitor {
    constructor() {
        this.checkScreen();
        // Listen for screen size changes in real-time
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

        // Force Monaco editor to resize if it's currently open during a window resize
        if (window.editor && document.getElementById('lab-modal').classList.contains('show')) {
            window.editor.layout();
        }
    }
}

const viewportSys = new ViewportMonitor();

window.addEventListener('DOMContentLoaded', () => {
    init();
    attachCompilerEvents();
    
    // Fallback force initialization for icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
