import psycopg2
import pandas as pd
import numpy as np
import json
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.manifold import TSNE

# --- 1. KONFIGURATION & VERBINDUNG ---
DB_CONFIG = {
    "dbname": "vector_db",
    "user": "postgres",
    "password": "supersecret123",
    "host": "localhost",
    "port": "5432"
}

def get_data():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        # Wir laden NUR das embedding
        query = "SELECT embedding FROM knowledge_base"
        df = pd.read_sql(query, conn)
        conn.close()
        return df
    except Exception as e:
        print(f"Fehler bei der DB-Verbindung: {e}")
        return None

def parse_embedding(e):
    if e is None: return None
    if isinstance(e, (list, np.ndarray)): return e
    try:
        s = str(e).replace('np.str_', '').strip("'")
        return json.loads(s)
    except:
        s = str(e).replace('[', '').replace(']', '').replace(' ', '')
        return [float(x) for x in s.split(',') if x]

# --- 2. HAUPTPROGRAMM ---
print("Lade Daten...")
df = get_data()

if df is None or df.empty:
    print("Keine Daten in der Datenbank gefunden.")
    exit()

print(f"{len(df)} Vektoren werden verarbeitet...")
embeddings_list = [parse_embedding(e) for e in df['embedding']]
X = np.array([e for e in embeddings_list if e is not None]).astype(np.float32)

# --- 3. T-SNE BERECHNUNG ---
print("Berechne Layout (t-SNE)... Bitte kurz warten.")
tsne = TSNE(n_components=2, perplexity=30, random_state=42, init='pca', learning_rate='auto')
vis_dims = tsne.fit_transform(X)

# --- 4. PLOT ERSTELLEN ---
plt.figure(figsize=(12, 8))
sns.set_style("white")

# Plot ohne 'hue' (Farbe)
plt.scatter(
    vis_dims[:, 0], 
    vis_dims[:, 1], 
    alpha=0.5, 
    s=25, 
    c='#3498db', # Ein schönes Blau für alle Punkte
    edgecolors='none'
)

plt.title(f'Visualisierung von {len(df)} News-Embeddings', fontsize=15)
plt.xlabel('t-SNE Dimension 1')
plt.ylabel('t-SNE Dimension 2')

# Speichern
output_filename = "simple_embedding_plot.png"
plt.savefig(output_filename, dpi=300, bbox_inches='tight')

print(f"Fertig! Bild gespeichert als: {output_filename}")