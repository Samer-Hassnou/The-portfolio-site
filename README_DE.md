 # **Persönliche Portfolio-Website**  

Dieses Projekt ist eine sorgfältig entwickelte Website, die als digitale Visitenkarte und Portfolio dient. Sie wurde speziell konzipiert, um die Fähigkeiten, Erfahrungen und Zertifizierungen eines Entwicklers oder Cloud-Ingenieurs professionell zu präsentieren. Die Seite zeichnet sich durch ein sauberes, modernes Design, vollständige Reaktionsfähigkeit auf allen Geräten und eine umfassende Mehrsprachigkeit aus.

-----

## **Hauptmerkmale**  

  * **Sauberes und responsives Design:** Ein minimalistisches, inhaltlich fokussiertes Layout, das eine exzellente Benutzererfahrung auf Desktops, Tablets und Mobilgeräten garantiert.
  * **Mehrsprachige Unterstützung:** Die Website unterstützt Arabisch, Englisch und Deutsch, inklusive automatischer Umschaltung der Textrichtung (RTL/LTR).
  * **Interaktive Abschnitte:** Inhalte wie Zertifikate, Berufserfahrung, Ausbildung und Projekte sind in einem übersichtlichen Akkordeon-Layout organisiert.
  * **Hohe Performance:** Durch die Verwendung von Bildern im `.webp`-Format werden Ladezeiten minimiert und die Gesamtleistung der Website optimiert.
  * **Ästhetische 3D-Animation:** Ein interaktiver, rotierender Würfel im Header verleiht der Seite eine einzigartige und moderne Note.

-----

## **Verwendete Technologien**  

  * **HTML5:** Für die logische Strukturierung des Seiteninhalts.
  * **CSS3:** Für das gesamte visuelle Styling, wobei CSS-Custom-Properties (`--variablen`) die einfache Anpassung des Designs ermöglichen.
  * **JavaScript:** Für die Verwaltung der Sprachumschaltung und zur Umsetzung interaktiver Elemente.

-----

## **Projektstruktur**  

```
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
```

-----

## **Ausführung**  

Da es sich um eine statische Website handelt, ist kein Webserver erforderlich. Du kannst die Datei **`index.html`** einfach direkt in deinem bevorzugten Webbrowser öffnen.

-----

## **Anpassung**  

  * **Farben ändern:** Du kannst das Farbschema der Website einfach anpassen, indem du die Werte der CSS-Variablen in der Datei **`css/themes.css`** änderst.

    ```css
    :root {
      --primary-color: #00FF00;
      --secondary-color: #88FF88;
      /* ... andere Variablen ... */
    }
    ```

  * **Inhalt aktualisieren:** Der gesamte Text kann entweder direkt in **`index.html`** oder in den jeweiligen Sprachdateien im Ordner **`js/`** aktualisiert werden.

  * **Neue Sprache hinzufügen:**

    1.  Erstelle eine neue Übersetzungsdatei im Ordner `js/` (z.B. **`fr.js`**).
    2.  Kopiere den Inhalt einer bestehenden Datei (z.B. **`en.js`**) und übersetze ihn.
    3.  Füge in **`index.html`** einen neuen Button zur Sprachumschaltung mit dem entsprechenden `data-lang`-Attribut hinzu.
    4.  Binde die neue JavaScript-Datei im `<head>`-Bereich von **`index.html`** ein.