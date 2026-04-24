'use strict';

/* =========================================================
   GHOST LEDGER — logica di gioco (testo in italiano)
   =========================================================

   SOLUZIONI DEL PUZZLE
   ────────────────────
   Codice ALPHA : 10110100
     → aprire TRANSACTION_LOG, leggere i flag STATUS dall'alto
       verso il basso

   Codice BETA  : 01101001
     → aprire NETWORK_SCAN, ordinare i nodi per ID (N-01…N-08),
       leggere ALIVE(1) / DEAD(0) in quell'ordine
       (suggerimento in ACCESS_LOG)

   VAULT: inserire entrambi i codici separati da spazio
   ========================================================= */

const PASSWORD = 'GH05T';

let tentativiFalliti = 0;
let zCounter = 2000;
const finestreAperte = {};

/* ── Messaggi di avvio ──────────────────────────────────── */

const righeAvvio = [
    'GHOST SYSTEM v2.3  —  SEQUENZA DI AVVIO SICURO',
    '════════════════════════════════════════════════════',
    '',
    '  [OK] Diagnostica hardware ................... OK',
    '  [OK] Verifica integrità memoria ............. OK',
    '  [OK] Modulo crittografico ................... CARICATO',
    '  [OK] Interfaccia di rete .................... IN ATTESA',
    '  [OK] Partizione ghost ....................... MONTATA',
    '  [OK] Daemon di controllo .................... ATTIVO',
    '  [OK] Identificazione target ................. NEXUS FINANCIAL GROUP',
    '',
    '  [!!] ALLERTA: 3 tentativo/i di accesso non autorizzato',
    '  [!!] Tutte le sessioni vengono monitorate e registrate',
    '',
    '════════════════════════════════════════════════════',
    '',
    '  Inserire il codice operatore per sbloccare la partizione:',
    '',
];

/* ── Inizializzazione ───────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
    previeniBehaviorBrowser();
    mostraOverlayConnessione();
});

/* ── Overlay di connessione ─────────────────────────────── */

function mostraOverlayConnessione() {
    const overlay = document.createElement('div');
    overlay.id = 'connect-overlay';

    const logo = document.createElement('pre');
    logo.className = 'ascii-logo';
    logo.textContent =
`╔═══════════════════════════════════════════╗
║                                           ║
║      G H O S T   L E D G E R             ║
║                                           ║
║      Sistema di Decriptazione             ║
║      Credenziali Finanziarie v2.3         ║
║                                           ║
╚═══════════════════════════════════════════╝`;

    const mission = document.createElement('p');
    mission.id = 'overlay-mission';
    mission.textContent = 'Obiettivo: recuperare le credenziali cifrate del portale NEXUS FINANCIAL GROUP.';

    const btn = document.createElement('button');
    btn.id = 'connect-btn';
    btn.textContent = 'AVVIA SESSIONE';
    btn.addEventListener('click', () => {
        richiediSchermIntero();
        overlay.remove();
        avviaSequenzaBoot();
    });

    overlay.appendChild(logo);
    overlay.appendChild(mission);
    overlay.appendChild(btn);
    document.body.appendChild(overlay);
}

function richiediSchermIntero() {
    const el = document.documentElement;
    const fn = el.requestFullscreen || el.webkitRequestFullscreen ||
                el.mozRequestFullScreen || el.msRequestFullscreen;
    if (fn) fn.call(el);
}

/* ── Sequenza di avvio ──────────────────────────────────── */

function avviaSequenzaBoot() {
    const bootTerminal = document.getElementById('boot-terminal');
    bootTerminal.style.display = 'block';

    let i = 0;
    function prossimaRiga() {
        if (i < righeAvvio.length) {
            aggiungiRigaBoot(righeAvvio[i]);
            i++;
            const ritardo = i <= 2 ? 60 : i <= 10 ? 110 : 160;
            setTimeout(prossimaRiga, ritardo);
        } else {
            mostraLogin();
        }
    }
    prossimaRiga();
}

function aggiungiRigaBoot(testo) {
    const el = document.getElementById('boot-output');
    el.textContent += testo + '\n';
    el.scrollTop = el.scrollHeight;
}

/* ── Login ──────────────────────────────────────────────── */

function mostraLogin() {
    const areaLogin = document.getElementById('login-area');
    areaLogin.style.display = 'block';

    const input = document.getElementById('login-input');
    input.focus();

    input.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        const val = input.value;
        input.value = '';
        gestisciLogin(val);
    });
}

function gestisciLogin(raw) {
    const val = raw.trim();

    if (val.toUpperCase() === PASSWORD) {
        aggiungiRigaBoot('  > ' + val);
        aggiungiRigaBoot('');
        aggiungiRigaBoot('  [OK] Codice operatore accettato');
        aggiungiRigaBoot('  [OK] Caricamento partizione cifrata ...');
        aggiungiRigaBoot('  [OK] Decrittazione livello 1 completata ...');
        aggiungiRigaBoot('  [OK] Accesso concesso — Avvio recupero credenziali NEXUS');
        document.getElementById('login-area').style.display = 'none';
        setTimeout(avviaDesktop, 1300);
    } else {
        tentativiFalliti++;
        aggiungiRigaBoot('  > ' + '*'.repeat(val.length || 1));
        if (tentativiFalliti <= 2) {
            aggiungiRigaBoot(`  [!!] ACCESSO NEGATO — Tentativo ${tentativiFalliti}/3 registrato`);
        } else if (tentativiFalliti === 3) {
            aggiungiRigaBoot('  [!!] ACCESSO NEGATO — ATTENZIONE: protocollo di sicurezza attivato');
        } else {
            aggiungiRigaBoot('  [!!] ACCESSO NEGATO — CRITICO: credenziali a rischio di revoca');
        }
        aggiungiRigaBoot('');
    }
}

/* ── Desktop ────────────────────────────────────────────── */

function avviaDesktop() {
    document.getElementById('boot-container').style.display = 'none';
    creaIconeDesktop();
}

const FILE_DESKTOP = [
    { name: 'MANIFEST.DAT',    sym: 'MNF', cls: '' },
    { name: 'TRANSACTION_LOG', sym: 'TXN', cls: '' },
    { name: 'NETWORK_SCAN',    sym: 'NET', cls: '' },
    { name: 'ACCESS_LOG',      sym: 'ACL', cls: '' },
    { name: 'CIPHER_NOTES',    sym: 'CPH', cls: '' },
    { name: 'GHOST_VAULT',     sym: 'VLT', cls: 'danger' },
];

function creaIconeDesktop() {
    const posizionati = [];
    const DIST_MIN = 140;
    const desktop = document.getElementById('desktop');

    FILE_DESKTOP.forEach(file => {
        const icon = document.createElement('div');
        icon.className = 'file-icon' + (file.cls ? ' ' + file.cls : '');
        icon.dataset.fileName = file.name;

        const visual = document.createElement('div');
        visual.className = 'icon-visual';
        visual.textContent = file.sym;

        const etichetta = document.createElement('div');
        etichetta.className = 'icon-label';
        etichetta.textContent = file.name;

        icon.appendChild(visual);
        icon.appendChild(etichetta);

        /* posizione casuale non sovrapposta */
        let top, left, tentativi = 0;
        const margine = 20;
        do {
            top  = margine + Math.random() * (window.innerHeight - 160 - margine * 2);
            left = margine + Math.random() * (window.innerWidth  - 110 - margine * 2);
            tentativi++;
        } while (
            tentativi < 120 &&
            posizionati.some(p => Math.hypot(p.l - left, p.t - top) < DIST_MIN)
        );
        posizionati.push({ t: top, l: left });

        icon.style.top  = `${top}px`;
        icon.style.left = `${left}px`;

        icon.addEventListener('click', () => apriFile(file.name));
        desktop.appendChild(icon);
    });
}

/* ── Apertura file ──────────────────────────────────────── */

function apriFile(name) {
    ({
        'MANIFEST.DAT':    apriManifest,
        'TRANSACTION_LOG': apriTransactionLog,
        'NETWORK_SCAN':    apriNetworkScan,
        'ACCESS_LOG':      apriAccessLog,
        'CIPHER_NOTES':    apriCipherNotes,
        'GHOST_VAULT':     apriGhostVault,
    })[name]?.();
}

/* ── Fabbrica finestre ──────────────────────────────────── */

function creaFinestra(name, larghezza, altezzaContenuto, htmlContenuto, postCrea) {
    if (finestreAperte[name]) {
        lampeggiaFinestra(name);
        return;
    }
    finestreAperte[name] = true;

    const win = document.createElement('div');
    win.className = 'terminal win';
    win.dataset.windowName = name;
    win.style.width  = `${larghezza}px`;
    win.style.zIndex = prossimoZ();

    /* barra del titolo */
    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.innerHTML = `<span>ghost://${name.toLowerCase()}</span>`;

    const chiudiBtn = document.createElement('div');
    chiudiBtn.className = 'close-btn';
    chiudiBtn.addEventListener('click', () => {
        win.remove();
        finestreAperte[name] = false;
    });
    titleBar.appendChild(chiudiBtn);

    /* area contenuto */
    const content = document.createElement('div');
    content.className = 'win-content';
    content.style.height = `${altezzaContenuto}px`;

    const pre = document.createElement('pre');
    pre.innerHTML = htmlContenuto;
    content.appendChild(pre);

    win.appendChild(titleBar);
    win.appendChild(content);

    if (postCrea) postCrea(win, pre);

    document.getElementById('desktop').appendChild(win);
    impostaTranscinabile(win, titleBar);
    posizionaCasuale(win);

    win.addEventListener('mousedown', () => { win.style.zIndex = prossimoZ(); });
}

/* ── Contenuto finestre ─────────────────────────────────── */

function apriManifest() {
    creaFinestra('MANIFEST.DAT', 570, 390,
`<span style="color:#3f3;font-weight:bold">GHOST LEDGER — MANIFESTO INTERNO
═══════════════════════════════════════════</span>
Classificazione : ULTRA SEGRETO
Partizione      : /ghost/encrypted/ledger
Ultimo Accesso  : 2026-04-14 03:47:22 UTC

<span style="color:#ff0">PANORAMICA:</span>
  Questa partizione cifrata contiene i file necessari
  per ricostruire le credenziali di accesso al portale
  bancario NEXUS FINANCIAL GROUP. Ogni credenziale è
  protetta da una chiave di settore binaria a 8 bit.

<span style="color:#ff0">ISTRUZIONI DI RECUPERO:</span>
  ► <span style="color:#3f3">CODICE ALPHA</span>
    Aprire TRANSACTION_LOG.
    Leggere il flag STATUS di ogni voce nell'ordine
    in cui appare, dall'alto verso il basso.
    La sequenza dei flag È la chiave del settore ALPHA.

  ► <span style="color:#3f3">CODICE BETA</span>
    Aprire NETWORK_SCAN.
    I nodi sono elencati in ordine di scansione casuale.
    Consultare ACCESS_LOG per l'ordine di lettura corretto.
    Gli stati dei nodi formano la chiave del settore BETA.

<span style="color:#555">  ALIVE = 1  |  DEAD  = 0
  STATUS 1   = 1  |  STATUS 0  = 0
  Direzione di lettura: dall'alto → verso il basso</span>

[FINE MANIFESTO]`);
}

function apriTransactionLog() {
    creaFinestra('TRANSACTION_LOG', 690, 390,
`<span style="color:#3f3;font-weight:bold">GHOST LEDGER — REGISTRO TRANSAZIONI
═══════════════════════════════════════════════════════════</span>
Ultima sincronizzazione : 2026-04-14 04:12:07 UTC
Voci                    : 8  |  Segnalate : 4  |  Pulite : 4

RIF        DATA           IMPORTO      CONTO              STATUS
───────────────────────────────────────────────────────────────────
TX-001     2026-03-04     $14.200      A-GHOST-447        <span style="color:#0f0;font-weight:bold">[ 1 ]</span>
TX-002     2026-03-07     $ 8.500      B-SPECTER-12       <span style="color:#3a3a3a">[ 0 ]</span>
TX-003     2026-03-09     $31.700      A-GHOST-447        <span style="color:#0f0;font-weight:bold">[ 1 ]</span>
TX-004     2026-03-12     $ 2.900      C-WRAITH-99        <span style="color:#0f0;font-weight:bold">[ 1 ]</span>
TX-005     2026-03-15     $19.300      A-GHOST-447        <span style="color:#3a3a3a">[ 0 ]</span>
TX-006     2026-03-18     $44.600      B-SPECTER-12       <span style="color:#0f0;font-weight:bold">[ 1 ]</span>
TX-007     2026-03-22     $ 7.100      A-GHOST-447        <span style="color:#3a3a3a">[ 0 ]</span>
TX-008     2026-03-25     $88.000      A-GHOST-447        <span style="color:#3a3a3a">[ 0 ]</span>
───────────────────────────────────────────────────────────────────
VOLUME TOTALE : $216.300

<span style="color:#555">NOTA: i flag STATUS rappresentano bit di validazione
      crittografica incorporati nella traccia di controllo.</span>

[FINE REGISTRO]`);
}

function apriNetworkScan() {
    creaFinestra('NETWORK_SCAN', 640, 390,
`<span style="color:#3f3;font-weight:bold">GHOST LEDGER — SCANSIONE SETTORE DI RETE
═══════════════════════════════════════════════════════════</span>
Avviata    : 2026-04-14 04:05:33 UTC
Protocollo : Ghost-Ping v4.1
Settore    : 10.0.0.0/29

NODO      IP               LATENZA       STATO
──────────────────────────────────────────────────────────
N-06      10.0.0.6         timeout       <span style="color:#f44">[ MORTO ]</span>
N-02      10.0.0.2         12 ms         <span style="color:#0f0;font-weight:bold">[ VIVO  ]</span>
N-08      10.0.0.8         9 ms          <span style="color:#0f0;font-weight:bold">[ VIVO  ]</span>
N-04      10.0.0.4         timeout       <span style="color:#f44">[ MORTO ]</span>
N-01      10.0.0.1         timeout       <span style="color:#f44">[ MORTO ]</span>
N-07      10.0.0.7         timeout       <span style="color:#f44">[ MORTO ]</span>
N-03      10.0.0.3         7 ms          <span style="color:#0f0;font-weight:bold">[ VIVO  ]</span>
N-05      10.0.0.5         15 ms         <span style="color:#0f0;font-weight:bold">[ VIVO  ]</span>
──────────────────────────────────────────────────────────
Attivi : 4 / 8   |   Inattivi : 4 / 8

<span style="color:#ff0">ATTENZIONE: l'ordine di scansione non è sequenziale.
            Consultare ACCESS_LOG prima di decodificare.</span>

[FINE SCANSIONE]`);
}

function apriAccessLog() {
    creaFinestra('ACCESS_LOG', 590, 380,
`<span style="color:#3f3;font-weight:bold">GHOST LEDGER — REGISTRO ACCESSI
═══════════════════════════════════════════════════════════</span>
Log di sessione per la partizione /ghost/ledger
Generato    : 2026-04-14 04:14:55 UTC

TIMESTAMP              EVENTO
──────────────────────────────────────────────────────────────
2026-04-14 01:12:03    MOUNT    ghost_partition_7
2026-04-14 01:12:04    DECRYPT  key_store_alpha
2026-04-14 01:12:07    READ     transaction_log.dat
2026-04-14 01:15:44    EXEC     network_scan --sector 10.0.0.0/29
2026-04-14 01:15:47    WRITE    network_scan_results.dat
2026-04-14 01:17:02    ACCESS   ghost_vault --verify
2026-04-14 01:17:03    ERROR    Autenticazione fallita
2026-04-14 01:18:31    EXIT     sessione terminata
──────────────────────────────────────────────────────────────

<span style="color:#ff0">NOTA SUL PROTOCOLLO DI SCANSIONE:</span>
  Le scansioni di rete vengono eseguite in ordine
  casuale per evitare la rilevazione di pattern.

  <span style="color:#3f3">► Ordinare sempre i risultati per ID Nodo crescente
    (N-01 … N-08) prima di decodificare le chiavi
    di settore.</span>

[FINE REGISTRO]`);
}

function apriCipherNotes() {
    creaFinestra('CIPHER_NOTES', 560, 390,
`<span style="color:#3f3;font-weight:bold">GHOST PROTOCOL — RIFERIMENTO CIFRARIO
═══════════════════════════════════════════════════════════</span>
ID Documento : GP-CIPHER-v3.2
Stato        : SOLO RIFERIMENTO

STANDARD DI CODIFICA:
  Tutte le chiavi di settore usano codifica binaria a 8 bit.

  Schema dei bit (lettura da sinistra → destra):
  ┌────┬────┬────┬────┬────┬────┬────┬────┐
  │ b7 │ b6 │ b5 │ b4 │ b3 │ b2 │ b1 │ b0 │
  └────┴────┴────┴────┴────┴────┴────┴────┘
  b7 = bit più significativo (sinistra)
  b0 = bit meno significativo (destra)

  Mappatura valori campo:
  ┌─────────────────────────────────────────┐
  │  VIVO  /  STATUS 1  →  bit = <span style="color:#0f0;font-weight:bold">1</span>         │
  │  MORTO /  STATUS 0  →  bit = <span style="color:#f44">0</span>         │
  └─────────────────────────────────────────┘

RIFERIMENTO RAPIDO:
  10000000 = 128     00001111 = 15
  00000001 = 1       11110000 = 240
  11111111 = 255     01010101 = 85
  00000000 = 0

NOTA: i livelli AES e XOR vengono applicati DOPO
      l'estrazione binaria iniziale. La decodifica
      manuale si ferma al livello binario.

CLASSIFICAZIONE: INTERNO — NON DISTRIBUIRE
[FINE DOCUMENTO]`);
}

function apriGhostVault() {
    creaFinestra('GHOST_VAULT', 540, 310,
`<span style="color:#f55;font-weight:bold">GHOST LEDGER — CASSAFORTE CREDENZIALI
═══════════════════════════════════════════════════════════</span>
ID Cassaforte : GV-447-2026
Target        : NEXUS FINANCIAL GROUP
Stato         : <span style="color:#f55;font-weight:bold">CREDENZIALI CIFRATE — ACCESSO BLOCCATO</span>
Cifratura     : Ghost-AES-256

<span style="color:#444">╔══════════════════════════════════════╗
║   DECRIPTAZIONE CREDENZIALI NEXUS    ║
╠══════════════════════════════════════╣
║  CODICE ALPHA :  ████████            ║
║  CODICE BETA  :  ████████            ║
╠══════════════════════════════════════╣
║  STATO : IN ATTESA DEI CODICI        ║
╚══════════════════════════════════════╝</span>

Contenuto cifrato:
  Credenziali portale bancario NEXUS   1 set
  Registri finanziari allegati         2022 – 2026
  Documentazione operativa             847 file

Inserire i codici ALPHA e BETA per decriptare le credenziali (separati da spazio):`,

    /* postCrea: barra di input del vault */
    (win, pre) => {
        const barra = document.createElement('div');
        barra.className = 'vault-input-area';

        const prompt = document.createElement('span');
        prompt.className = 'vault-prompt';
        prompt.textContent = '> ';

        const inp = document.createElement('input');
        inp.type = 'text';
        inp.placeholder = '...';
        inp.autocomplete = 'off';
        inp.spellcheck = false;

        inp.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            const token = inp.value.trim().split(/\s+/);
            if (token.includes('10110100') && token.includes('01101001')) {
                /* ── SUCCESSO: mostra animazione di sblocco, poi finestra finale ── */
                pre.innerHTML =
`<span class="unlock-msg">
╔══════════════════════════════════════╗
║     ✓  CASSAFORTE SBLOCCATA          ║
╠══════════════════════════════════════╣
║  CODICE ALPHA :  10110100            ║
║  CODICE BETA  :  01101001            ║
╠══════════════════════════════════════╣
║  CREDENZIALI NEXUS — DECRIPTATE      ║
╚══════════════════════════════════════╝

  Decriptazione credenziali NEXUS FINANCIAL GROUP ...
  [████████████████████] 100%

  Estrazione credenziali bancarie completata ...
</span>`;
                barra.remove();

                /* dopo 2 secondi: chiudi tutto e apri la finestra finale */
                setTimeout(mostraFinale, 2000);
            } else {
                inp.value = '';
                inp.placeholder = '[!!] Codici errati — riprovare';
                setTimeout(() => {
                    inp.placeholder = '...';
                }, 1800);
            }
        });

        barra.appendChild(prompt);
        barra.appendChild(inp);
        win.appendChild(barra);
    });
}

/* ── Finestra finale ────────────────────────────────────── */

function mostraFinale() {
    /* 1. Chiudi tutte le finestre aperte */
    document.querySelectorAll('.win').forEach(w => w.remove());
    Object.keys(finestreAperte).forEach(k => { finestreAperte[k] = false; });

    /* 2. Costruisci la finestra centrata */
    const win = document.createElement('div');
    win.className = 'terminal';
    win.id = 'finale-win';

    /* barra del titolo */
    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.innerHTML = '<span>ghost://nexus_access — credenziali decriptate</span>';

    const chiudiBtn = document.createElement('div');
    chiudiBtn.className = 'close-btn';
    chiudiBtn.addEventListener('click', () => win.remove());
    titleBar.appendChild(chiudiBtn);

    /* contenuto */
    const content = document.createElement('div');
    content.className = 'win-content';

    const pre = document.createElement('pre');
    pre.innerHTML =
`<span class="finale-header">GHOST LEDGER — CREDENZIALI NEXUS DECRIPTATE
═══════════════════════════════════════════════════════</span>

  Decriptazione completata con successo.
  Le credenziali di accesso al portale bancario
  NEXUS FINANCIAL GROUP sono state estratte.

  Usa username e password qui sotto per accedere.

<hr class="finale-divider">
  NEXUS FINANCIAL GROUP — ACCESSO OPERATORE
<hr class="finale-divider">
`;
    content.appendChild(pre);

    /* username */
    const usernameRow = document.createElement('div');
    usernameRow.className = 'codice-row';
    usernameRow.innerHTML =
        '<span class="codice-label">USERNAME</span>' +
        '<span class="codice-valore codice-1" style="font-size:20px;letter-spacing:4px">operatore.447</span>';
    content.appendChild(usernameRow);

    /* password */
    const passwordRow = document.createElement('div');
    passwordRow.className = 'codice-row';
    passwordRow.innerHTML =
        '<span class="codice-label">PASSWORD</span>' +
        '<span class="codice-valore codice-2" style="font-size:20px;letter-spacing:4px">Gh05t_S3ct0r</span>';
    content.appendChild(passwordRow);

    /* link al portale bancario */
    const linkWrapper = document.createElement('div');
    linkWrapper.style.cssText = 'padding: 20px 24px 8px;';
    const link = document.createElement('a');
    link.href = 'banca/index.html';
    link.target = '_blank';
    link.className = 'portale-link';
    link.textContent = '→  ACCEDI AL PORTALE NEXUS FINANCIAL GROUP';
    linkWrapper.appendChild(link);
    content.appendChild(linkWrapper);

    const notaPre = document.createElement('pre');
    notaPre.innerHTML =
`\n<hr class="finale-divider">
<span style="color:#555;font-size:11px">  Sessione ghost sigillata. Credenziali NEXUS estratte e pronte all'uso.</span>`;
    content.appendChild(notaPre);

    win.appendChild(titleBar);
    win.appendChild(content);
    document.getElementById('desktop').appendChild(win);

    impostaTranscinabile(win, titleBar);
}

/* ── Utilità ────────────────────────────────────────────── */

function prossimoZ() { return ++zCounter; }

function impostaTranscinabile(el, handle) {
    let trascinando = false, ox = 0, oy = 0;

    handle.addEventListener('mousedown', (e) => {
        trascinando = true;
        ox = e.clientX - el.offsetLeft;
        oy = e.clientY - el.offsetTop;
        handle.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!trascinando) return;
        el.style.left      = `${e.clientX - ox}px`;
        el.style.top       = `${e.clientY - oy}px`;
        el.style.transform = 'none'; /* disabilita il centramento CSS dopo il primo trascinamento */
    });

    document.addEventListener('mouseup', () => {
        if (trascinando) { trascinando = false; handle.style.cursor = 'move'; }
    });
}

function posizionaCasuale(el) {
    setTimeout(() => {
        const w = el.offsetWidth  || 560;
        const h = el.offsetHeight || 420;
        const maxL = Math.max(10, window.innerWidth  - w - 20);
        const maxT = Math.max(10, window.innerHeight - h - 20);
        el.style.left      = `${Math.floor(Math.random() * maxL) + 10}px`;
        el.style.top       = `${Math.floor(Math.random() * maxT) + 10}px`;
        el.style.transform = 'none';
    }, 12);
}

function lampeggiaFinestra(name) {
    const win = document.querySelector(`.win[data-window-name="${name}"]`);
    if (!win) return;
    win.style.zIndex = prossimoZ();
    win.classList.remove('flashing');
    void win.offsetWidth; /* forza reflow per riavviare l'animazione */
    win.classList.add('flashing');
    setTimeout(() => win.classList.remove('flashing'), 900);
}

function previeniBehaviorBrowser() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    document.addEventListener('contextmenu', (e) => e.preventDefault());

    document.addEventListener('touchstart', (e) => {
        const startY = e.touches[0].clientY;
        document.addEventListener('touchmove', function onMove(ev) {
            if (ev.touches[0].clientY - startY > 10) ev.preventDefault();
        }, { passive: false, once: true });
    }, { passive: false });

    window.addEventListener('beforeunload', (e) => {
        e.preventDefault();
        e.returnValue = '';
    });

    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', () => {
        history.pushState(null, null, document.URL);
    });
}
