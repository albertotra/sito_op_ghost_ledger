# GHOST LEDGER

Gioco di escape room a tema hacker. Il giocatore deve infiltrarsi in una partizione finanziaria segreta, risolvere due puzzle per ricavare codici binari e sbloccare la cassaforte finale.

## Come avviare

Aprire `index.html` direttamente nel browser, oppure servirlo con un server statico:

```bash
python3 -m http.server 8080
# poi aprire http://localhost:8080
```

## Struttura file

```
ghost_ledger/
├── index.html          pagina principale
├── style.css           stile (tema terminale verde su nero)
├── script.js           tutta la logica di gioco
├── images/
│   └── green-back.jpg  sfondo del desktop fittizio
└── README.md           questo file
```

## Flusso di gioco

1. **Schermata di connessione** — pulsante "CONNETTI" avvia il fullscreen
2. **Sequenza di boot** — messaggi di inizializzazione sistema
3. **Login** — inserire il codice di accesso
4. **Desktop fittizio** — 6 icone cliccabili, ognuna apre una finestra trascinabile
5. **Cassaforte** — inserire i due codici trovati per sbloccare il vault
6. **Finestra finale** — chiude tutto e mostra 3 codici binari a 8 bit

## Soluzione puzzle

| Codice | Valore | Come si trova |
|--------|--------|---------------|
| ALPHA  | `10110100` | Leggere la colonna STATUS di `TRANSACTION_LOG` dall'alto in basso |
| BETA   | `01101001` | Ordinare i nodi di `NETWORK_SCAN` per ID (N-01→N-08), leggere VIVO=1 / MORTO=0 |

Il suggerimento per il Codice BETA si trova in `ACCESS_LOG`.

## Codici da modificare

| Variabile / costante | File | Descrizione |
|----------------------|------|-------------|
| `PASSWORD` | `script.js` riga 16 | Codice di accesso al login |
| Flag STATUS in `apriTransactionLog()` | `script.js` | Bit del Codice ALPHA |
| Stati VIVO/MORTO in `apriNetworkScan()` | `script.js` | Bit del Codice BETA |
| Oggetti in array `codici` dentro `mostraFinale()` | `script.js` | I 3 codici binari mostrati alla fine |
