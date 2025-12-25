---
title: "NMEA-protokolla"
---

# NMEA-protokolla

NMEA 0183 on kommunikaatiostandardi, joka tekee tämän projektin mahdolliseksi. Se on syy, miksi voit käyttää lähes mitä tahansa kaikuluotainta tämän järjestelmän kanssa.

## Mikä on NMEA 0183?

NMEA 0183 on National Marine Electronics Associationin kehittämä standardi. Se määrittelee:
- Sähköiset signaalitasot (RS-422 tai RS-232)
- Tiedonsiirtonopeuden (tyypillisesti 4800 baudia)
- Viestimuodon (ASCII-lauseet)

## Tärkeimmät lauseet kartoitukseen

Syvyyskartoitukseen tarvitsemme pääasiassa näitä lausetyyppejä:

### DBT - Syvyys anturin alapuolella

```
$SDDBT,12.5,f,3.8,M,2.1,F*tarkistussumma
```

- Kenttä 1: Syvyys jaloissa
- Kenttä 2: 'f' jaloille
- Kenttä 3: Syvyys metreinä
- Kenttä 4: 'M' metreille
- Kenttä 5: Syvyys sylinä
- Kenttä 6: 'F' sylille

### GGA - GPS-paikannusdata

```
$GPGGA,123519,4807.038,N,01131.000,E,1,08,0.9,545.4,M,47.0,M,,*47
```

Tämä tarjoaa sijainti- ja aikadataa syvyyslukemien korrelointiin.

## NMEA-datan tallennus

Voit tallentaa NMEA-dataa käyttäen:
1. **USB NMEA -sovittimet** - Yhteys kannettavaan
2. **Erilliset datalogerit** - SD-korttimuisti
3. **Raspberry Pi/Arduino** - Räätälöidyt tallennusratkaisut

## Datan käsittely

Tallennuksen jälkeen NMEA-loki voidaan käsitellä:
1. Jäsentää syvyys- ja sijaintidata
2. Soveltaa korjauksia (vuorovesi, anturin siirtymä)
3. Luoda pistepilvidataa
4. Luoda korkeuskäyräkarttoja

## Vinkkejä

- Tarkista aina kaikuluotaimesi NMEA-lähtöasetukset
- Testaa datan tallennus ennen vesille menoa
- Tallenna raakadata - voit aina käsitellä sen myöhemmin
- Sisällytä aikaleimat datan korrelointia varten
