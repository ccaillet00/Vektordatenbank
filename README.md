# Vektordatenbank
## Auftrag
Im Rahmen eines Auftrages im Fach Software und Plattform Architektur müssen wir einen bestimmten Datenbanktyp recherchieren, die wichtigisten Aspekte präsentieren und an einem praktischem Beispiel eines konkreten Produkt von diesem Typ zu demonstrieren. Ziel ist es, ein tiefgehendes Verständnis für unterschiedliche Datenbanktechnologien zu entwickeln und deren Einsatzgebiete sowie Funktionsweisen kennenzulernen. 

## API endpoints. 
Base URL: `http://localhost:3000/api/`

| Method | Endpoint       | Description                  |
|--------|----------------|------------------------------|
| POST   | /embedding     | send content you want to store in the vectordb     |
| POST   | /query         | ask a question and get similar content    |

### Body structure
**embedding**
```json
 {
    "content":"Content" // Content you want to store in the vectordb
}
```
**query**
```json
{
    "question":"Guides on using Drizzle ORM with different platforms"
}
```

## Setup
1. clone github repo 
```bash
git clone https://github.com/ccaillet00/Vektordatenbank.git
```
2. Open folder in vscode
```bash
cd Vektordatenbank && code .
```
3. cd into code folder 
```bash
cd code
```
4. create a .env file and add following text
```plaintext
DATABASE_URL=postgressql://postgres:supersecret123@localhost:5432/vector_db
```
5. execute the command bun install in the terminal
```bash
bun install
```
6. after that execute the command bun start
```bash
bun start
```
7. run the docker compose up -d command 
```bash
docker compose up -d
```
8. Execute a request to the API endpoints as described using your preferred API client.

## Documents
[Recherchendokument](/docs/Recherchedokument/main.pdf) 
&nbsp;

[Demo](/code/)
&nbsp; 

[Präsenation]()