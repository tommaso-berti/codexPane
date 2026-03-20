# 14. REST API Endpoints


## Project structure (example)

```
rest-api-react/
├── README.md                          # Documentazione del progetto
├── .gitignore
├── .idea/                             # Configurazione WebStorm
├── .git/                              # Repository Git
│
├── backend/ (API REST con Express)
│   ├── app.js                         # Configurazione principale Express
│   ├── package.json                   # Dipendenze backend
│   ├── package-lock.json
│   ├── node_modules/
│   ├── .gitignore
│   ├── .DS_Store
│   │
│   ├── bin/
│   │   └── www                        # Server entry point
│   │
│   └── routes/
│       └── Books.js                   # API routes per gestione libri
│
└── frontend/ (Applicazione React)
    ├── package.json                   # Dipendenze frontend (React, Material-UI, etc.)
    ├── package-lock.json
    ├── README.md
    ├── node_modules/
    ├── .gitignore
    ├── .DS_Store
    │
    ├── public/
    │   ├── index.html                 # File HTML principale
    │   ├── favicon.ico
    │   ├── manifest.json              # PWA metadata
    │   ├── robots.txt
    │   ├── logo192.png
    │   └── logo512.png
    │
    └── src/
        ├── index.js                   # Entry point React
        ├── App.js                     # Componente principale
        ├── App.css
        ├── App.test.js
        ├── index.css
        ├── logo.svg
        ├── reportWebVitals.js
        ├── setupTests.js
        │
        ├── api/                       # Moduli per API call
        │   ├── index.js               # Esportazione e configurazione API
        │   └── books.js               # (IN PROGRESS - Funzioni CRUD per libri)
        │
        └── components/                # Componenti React
            ├── Book.js                # Componente singolo libro
            ├── Booklist.js            # Componente lista libri
            └── calendar.js            # Componente calendario

```


```


```

