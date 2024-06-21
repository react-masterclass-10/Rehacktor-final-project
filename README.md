## Descrizione
Real time web app contenente un archivio di videogiochi di diverse generazioni, filtrabili per genere e piattaforma in cui sarà possibile registrarsi e inviare messaggi in tempo reale ad altri utenti connessi. 

## API
* [rawg.io - client REST API](https://rawg.io/)
* [supabase - backend API/BaaS](https://supabase.com/)

## Soluzione di Styling o Libreria di Componenti
* [Bootstrap](https://getbootstrap.com/)
* [Material UI](https://mui.com/core/)
* [Css Modules](https://github.com/css-modules/css-modules)

## Pagine
* General pages
  * Home Page - Pagina di atterraggio con informazioni generali
  * Storage Page - Pagina archivio giochi e filtri
  * Game Page - Pagina di dettaglio del singolo gioco
  * Genre Page - Pagina di archivio giochi di un singolo genere
  * Login Page - Pagina di login utente
  * Register Page - Pagina di registrazione utente
* Authorized pages
  * Profile Page - Pagina profilo utente
  * Settings Page - Pagina di aggioramento profilo utente

## API + Interazione Utente
* Utente non autenticato 
  * Visita archivio videogiochi 
  * Filtro videogiochi
  * Visita dettaglio singolo videogiocho
  * Registrazione con email valida in piattaforma
* Utente autenticato 
  * Login con email valida in piattaforma  
  * Creazione di lista videogiochi preferiti 
  * Realtime chat con altri utenti autenticati connessi

## Context API
* Token di Sessione per utente autenticato
* Dettaglio profilo utente autenticato

## Zustand global state management 
* Lista favoriti 

## Distribuzione
* [Visita Rehacktor]()
