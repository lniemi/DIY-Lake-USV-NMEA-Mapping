# Uudet visualisointityökalut ja runkotutkimus

Dokumentaatiosivustolle on lisätty kaksi uutta osiota: tietograafi ja 3D-mallin katselin.

## Tietograafi

Tietograafin tarkoitus on visualisoida USV-järjestelmän eri komponenttien välisiä suhteita, tietovirtaa ja kartoitusprosessia. Se voisi toimia referenssinä sekä kehitykselle että dokumentaatiolle. Tällä hetkellä se ei toimi aivan tarkoitetulla tavalla, mutta ominaisuus on jätetty paikalleen mahdollista myöhempää kehitystä varten.

## 3D-mallin katselin

3D-mallin katselin on välittömästi hyödyllisempi. Se näyttää USV:n rungon ja komponenttien suunnitteluvaihtoehtoja.

3D-mallinnuskysymystä lähestyessä oli kaksi vaihtoehtoa: käyttää ulkoista CAD-ohjelmistoa ja tuoda malleja katselua varten, tai yrittää tehdä mallinnus suoraan tässä verkkosovelluksessa. Jälkimmäinen lähestymistapa valittiin, tosin tärkein varauksin.

Tämä ei ole CAD-ohjelmiston korvike. Katselimesta puuttuvat tavalliset CAD-työkalut kokonaan—se on yksinkertaisesti Three.js-katselin lisäominaisuuksilla. Työnkulku perustuu LLM:n ohjaamiseen luomaan ja muokkaamaan React-komponentteja `src/components/usv-viewer/models`-kansiossa, minkä jälkeen muutoksia tarkastellaan selaimessa hot module replacement -toiminnon avulla. Mallit eivät ole perinteisiä CAD-tiedostoja vaan React-komponentteja, jotka käyttävät Three.js:ää 3D-geometrian luomiseen.

Tämä lähestymistapa on kieltämättä epätavallinen, mutta se toimii nykyisiin tarpeisiin. Viennin osalta Three.js tukee yleisiä 3D-formaatteja, joten mallien pitäisi olla vietävissä tavallisiin CAD-formaatteihin, jos edistyneempi mallinnus tai valmistustiedostot tulevat tarpeellisiksi.

Kolme mallia on lisätty konseptin demonstroimiseksi:

- Kaksi katamaraanirungon suunnitelmaa (pieni ja suuri variantti)
- Yksi trimaraanirungon suunnitelma

Nämä mallit ovat perusmuotoisia ja niistä puuttuvat hienot yksityiskohdat. Ne demonstroivat konseptia eivätkä edusta valmiita suunnitelmia. Kun kaikki tarvittavat moduulit ovat paikoillaan—runko, GNSS-moduuli, kaikuluotain, akkukotelo, moottori, potkuri ja niin edelleen—malleja voidaan tarkentaa sisältämään realistisempia yksityiskohtia, kuten potkurin lavat yksinkertaisten sylintereiden sijaan.

## Runkotyyppitutkimus

Katsaus olemassa olevaan kirjallisuuteen pienistä USV-suunnitelmista tarjosi hyödyllistä kontekstia runkotyyppipäätökseen. Artikkeli "Small Unmanned Surface Vessels—A Review and Critical Analysis of Relations to Safety and Safety Assurance of Larger Autonomous Ships" (Bolbot ym., 2023) kartoitti 84 pientä USV:tä, joiden uppouma oli alle 100 kg.

### Miksi monirunkoalukset hallitsevat pieniä USV:itä

Lähes puolet tutkituista aluksista (41/85) käytti katamaraani- tai trimaraanikonfiguraatiota perinteisten yksirunkoisten sijaan. Kirjoittajat selittävät miksi:

**Vakaus antureiden kanssa:** Pienten USV:iden täytyy kantaa antureita, jotka on usein asennettu korkealle—kameroita, LiDAR-laitteita tai tämän projektin tapauksessa kaikuluotaimen anturia ja GNSS-yksikköä. Pienessä yksirunkoisessa tämä aiheuttaa vakausongelmia korkean painopisteen vuoksi kapealla alustalla. Katamaraanit ja trimaraanit tarjoavat leveämmän rungon suhteessa kokoonsa, pitäen aluksen vakaana jopa yläpainoisten anturipakettien kanssa.

**Kansiala:** Monirunkoiset tarjoavat enemmän käyttökelpoista kansiala uppoumaansa nähden. Kun navigaatioelektroniikkaa, akkuja, näytteenottolaitteita ja viestintälaitteita sovitetaan kajakin kokoiseen alustaan, tuo lisätila on merkittävä.

### Toimintaympäristön huomiot

Katsaus toteaa, että suurin osa pieniin USV:ihin kohdistuvasta tutkimuksesta on tehty tyynissä vesiolosuhteissa, ja vain harvat poikkeukset testasivat epäsuotuisassa säässä. Kirjoittajat kehystävät tämän rajoitukseksi autonomisten laivojen turvallisuusvalidoinnissa. Kuitenkin tälle projektille—joka nimenomaisesti kohdistuu tyynille suomalaisille sisävesille—tämä havainto on rohkaiseva. Suurin osa olemassa olevista pienten USV:iden suunnittelupäätöksistä tehtiin olosuhteisiin, jotka ovat samankaltaisia kuin suunniteltu toimintaympäristö.

### Syvyyskartoitus yleisenä sovelluksena

Katsaus havaitsi, että 14 % tutkituista pienistä USV:istä käytettiin nimenomaan syvyyskartoitukseen ja 18 % vesinäytteenottoon. Tämän projektin käyttötapaus sijoittuu vakiintuneelle sovellusalueelle näille alustoille.

### DIY-näkökulma

Yksi huomionarvoinen havainto: 70 % katsauksessa esiintyneistä USV:istä esiintyi vain yhdessä julkaisussa, mikä tarkoittaa, että useimmat rakennettiin tiettyä sovellusta varten sen sijaan, että niistä olisi tullut jatkuvia tutkimusalustoja. "Rakenna jotain, joka toimii tehtävääsi, dokumentoi se, siirry eteenpäin" -lähestymistapa näyttää olevan normi eikä poikkeus.

## Lähteet

Bolbot, V., ym. (2023). Small Unmanned Surface Vessels—A Review and Critical Analysis of Relations to Safety and Safety Assurance of Larger Autonomous Ships. *Journal of Marine Science and Engineering*, 11(12), 2387. https://www.mdpi.com/2077-1312/11/12/2387
