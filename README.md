# kaj_semestral



## Ovládání

- Myš: Otáčení a přiblížení/oddálení arkády
- WASD: Pohyb postavy
- Šipky: Směr střílení
- Escape: Pozastavení hry

## Popis funkčnosti

Hráč může hrát do nekonečna tuto hru a v případě smrti se jeho skóre zapíše do tabulky, kde je zobrazeno prvních 15 nejlepších míst
a také poslední místo s nejnižším skórem. Arkáda se dá otáčet a přiblížit klikem myši. Na levé straně najde návod a GPS lokaci svého
zařízení. Hru kdykoliv může pozastavit stisknutím tlačítka Escape. Doporučuji u menších obrazovek oddálit třeba na 50%, aby se případně
arkáda vešla na obrazovku, nebo naopak přiblížit, pokud je příliš malá. Všechny rotace a přiblížení/oddálení se dají vrátit s použitím
tlačítek zpět/vpřed prohlížeče.

## Cíl projektu

Tento projekt vznikl pro předmět KAJ na ČVUT FEL. Jednalo se o využití grafiky pomocí SVG a Canvasu se spojením audia, dále také
aplikace moderních technologií CSS, jako pokročilé selektory, animace, transitions a 3D transformace. To vše s použitím různých JS API
jako Geolokace, History API a pro splnění OOP jsem svůj kód psal pomocí modulů. Šlo o přepsání minihry ze hry Stardew Valley, která se
přesněji jmenuje Journey of the Prairie King. Jelikož se ve hře vyskytuje uvnitř hostince jako arkádový automat, tak jsem se snažil
ji celou vytvořit jako "3D model", který je interaktivní a zábavnější než samotný Canvas s odkazem na tabulku skóre. 

## Postup

### Hra

Nejprve jsem se snažil naprogramovat samotnou minihru. Tedy začal jsem s vykreslováním jednotlivých obrázků na Canvas, přidal postavě
ovládání a sepsal standardní funkce herních enginů pro vykreslování a aktualizování (draw a update). Pak jsem přidal jednoduchého nepřítele,
který pronásleduje hráče a při doteku se stránka refreshnula. Následně jsem přidal možnost střílení a lepší náhodné generování nepřátel.
Dále bylo zapotřebí dodat zvuky a hudbu, vylepšit pohyb nepřátel, opravit chyby a počítat skóre.

### Arkáda

Když byla hra připravená, začal jsem přidávat části arkády. Začal jsem s tlačítky, které jsem vytvořil jako SVG kolečka, které mají
animovaný drop-shadow, aby vypadaly 3D při stisknutí.
Přišlo mi zajímavé zkusit přidat detail, kdy obrazovka vyzařuje světlo a jeho barva je průměrem všech barev na obrazovce. Všeobecně
u každé věci byla snaha je udělat, aby se zdály co nejvíce 3D.
Následně zbylo vyzkoušet, zda půjde arkádu udělat celou ve 3D, a tak jsem vytvořil pomocí několika SVG jednoduchých tvarů předek arkády.
Některé jeho části jsem trochu natočil a posunul a celé poté animací orotoval. To fungovalo, tak jsem dodělal všechny ostatní stěny.
Přidal jsem ovládání otáčení a přiblížení arkády, různé detaily a naposledy joystick. Ten jsem znova pomocí různých triků
sestrojil aby se zdál 3D. Využil jsem znovu drop-shadow, rotace a změny barvy podle směru střelby.

### Miscellaneous

Ke konci jsem jen doimplementoval hitboxy stromů, opravil chyby, přidal efekty tabulce skóre, pozastavení hry a history API.

## Odkazy

[Eric Barone - Autor hry a minihry](https://www.stardewvalley.net/author/concernedape/)
[Obrázky](https://www.spriters-resource.com/pc_computer/stardewvalley/sheet/82481/)
[Zvuky](https://www.sounds-resource.com/pc_computer/stardewvalley/)
[Hudba](https://www.youtube.com/watch?v=yaBNr6zv0ek)