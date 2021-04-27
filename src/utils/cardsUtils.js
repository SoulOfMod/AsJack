import React from "react";


const cardArray = [
    "KS", "QS", "JS", "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "0S",
    "KD", "QD", "JD", "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "0D",
    "KH", "QH", "JH", "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "0H",
    "KC", "QC", "JC", "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "0C"];



class cardsUtils extends React.Component {


    rndCarte() {
        let rndNumTemp = 0;
        let rndCarteTemp = "";
        rndNumTemp = Math.floor(Math.random() * 53);

        if (rndNumTemp > 52) { rndNumTemp = rndNumTemp - 10 } else if (rndNumTemp < 1) { rndNumTemp = rndNumTemp + 10 }

        rndCarteTemp = cardArray[rndNumTemp - 1];

        return rndCarteTemp
    }
    //honnetement je suis pas sur,mais je pense que ça donne une carte au hazard dans les 52 et si la valeur est en dessous de 1 ça donne la carte 11
    //car +10,et pareil avec la valeur au dessus de 52 avec -10


    transformCardIntoInt(cardValue) {
        if (cardValue === "K" || cardValue === "Q" || cardValue === "J" || cardValue === "A" || cardValue === "0") {
            cardValue = "10"
        }

        return parseInt(cardValue)
    }
    //done la veleur 10 si la carte tiré est : roi,reine,valet,as ou 0 et la met en int

}

export default cardsUtils;
