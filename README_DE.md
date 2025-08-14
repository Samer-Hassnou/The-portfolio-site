Persönliches Portfolio
Dieses Projekt ist eine persönliche Portfolio-Website, die entwickelt wurde, um die Fähigkeiten, Erfahrungen und Zertifizierungen eines Entwicklers oder Cloud-Ingenieurs zu präsentieren. Die Website zeichnet sich durch ein sauberes Design, vollständige Reaktionsfähigkeit auf verschiedene Bildschirmgrößen und Mehrsprachigkeit aus.

- Hauptmerkmale
Sauberes und modernes Design: Ein einfaches, auf Inhalte fokussiertes Design, das eine ausgezeichnete Benutzererfahrung bietet.

Vollständig responsiv: Die Website passt sich automatisch an Desktop-, Tablet- und Mobilgeräte an.

Mehrsprachige Unterstützung: Unterstützt Arabisch, Englisch und Deutsch mit automatischer Umschaltung der Textrichtung (RTL/LTR).

Interaktive Abschnitte: Enthält gut organisierte Bereiche wie Zertifikate, Erfahrung, Ausbildung und Projekte in einem Akkordeon-Layout.

Hochwertige Icons und Bilder: Verwendet Bilder im .webp-Format, um die Ladezeit und Leistung zu verbessern.

3D-Animation: Enthält einen interaktiven, rotierenden Würfel im Header, der eine ästhetische Note hinzufügt.

- Verwendete Technologien
HTML5: Für die Erstellung der Seitenstruktur und des Inhalts.

CSS3: Für das Styling und Design, mit der Verwendung von benutzerdefinierten Eigenschaften (Custom Properties) zur einfachen Anpassung des Themas.

JavaScript: Zur Verwaltung der Sprachumschaltung und der interaktiven Animationen.

- Projektstruktur
Das Projekt hat die folgende Ordner- und Dateistruktur:

.
├── css/
│   ├── accordion.css
│   ├── footer.css
│   ├── header.css
│   ├── skills.css
│   ├── style.css
│   └── themes.css
├── images/
│   └── (Bild- und Icon-Dateien)
├── js/
│   ├── ar.js
│   ├── de.js
│   ├── en.js
│   └── main.js
├── pdf/
│   └── (Lebenslaufdateien im PDF-Format)
├── index.html
└── README.md

- Wie man es ausführt
Dies ist eine statische Website, die keinen Webserver benötigt.
Öffne einfach die Datei index.html in deinem bevorzugten Webbrowser.

- Anpassung
Farben ändern: Du kannst die Farben der Website einfach anpassen, indem du die Werte der Variablen in der Datei css/themes.css änderst. Zum Beispiel:

CSS

:root {
  --primary-color: #00FF00;
  --secondary-color: #88FF88;
  /* ... andere Variablen ... */
}
Inhalt aktualisieren: Alle Textinhalte können direkt in der Datei index.html oder in den Übersetzungsdateien im Ordner js/ aktualisiert werden.

Neue Sprache hinzufügen:

Erstelle eine neue Übersetzungsdatei im Ordner js/ (z.B. fr.js).

Kopiere den Inhalt einer vorhandenen Übersetzungsdatei (z.B. en.js) und übersetze ihn.

Füge einen neuen Sprachumschalter-Button in index.html hinzu, der den neuen data-lang-Wert hat.

Füge einen Skript-Tag zum Laden der neuen Übersetzungsdatei im <head>-Bereich von index.html hinzu.