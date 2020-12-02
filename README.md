# WebEng2
Wilkommen bei der Dokumentation der Belegarbeit für Web Engineering 2!

## Aufgabenstellung
Entwickeln Sie eine Web-Applikation die innerhalb eines Location-Based-Service eine Karte darstellt. Innerhalb der Karte soll eine Position (oder aktueller Standort) mit ihren Geo-Koordinaten ausgewählt werden können. Über diese Koordinaten soll mittels Reverse-Geocoding der Ort ermittelt und über Wikipedia die entsprechenden Information zur Örtlichkeit ausgelesen und visualisiert werden" Anschließend soll die Fahrroute von der gegenwärtigen Position zum ausgewählten Ort dargestellt werden.

## Ansprechpartner

| Rolle                                  | Ansprechpartner           |
| -------------------------------------- | ------------------------- |
| Scrum Master                           | Tobias B., Paul G.        |
| Design und Layout                      | Sebastian R.              |
| Kartenkomponete                        | Daniel R.                 |
| Wikipedia Anbindung                    | Philipp K.                |
| Fahrtrouten                            | Niko                       |
| Reverse Geocoding und Location Service | Sven                      |

## Branching

Jede Gruppe bitte einen Branch für final und einen um zu arbeiten
 
## Kommunikation 
Discord: https://discord.gg/Ve863Wzdnq
## Komponenten 

### Design und Layout

### Karte

#### Schnittstelle für Marker der Postion des Nutzers

#### Schnittstelle für Marker für Wikipediaeinträge

### Reverse Geocoding

#### Schnittstellenbeschreibung

1.	geo2location.js <br> 
Input: get_location(float lng, float lat) <br>
Output: String Datenstruktur: json <br>
Attribute: TODO z.B Straße, Hausnummer, PLZ, Ort, Bezeichnung <br>

2.	location2geo.js <br>
Input: get_geo(String Datenstruktur: json) <br>
Attribute: Straße, Hausnummer, Postleitzahl <br>
Output: float longitude, float latitude <br>

3.	get_position.js <br>
Input: get_position() <br>
Output: float longitude, float latitude <br>


### Wikipedia Anbindung

#### Schnittstellenbeschreibung

### Routenplaner 

#### Schnittstellenbeschreibung
