export type Card =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "T"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";
export type Hand = {
  cards: Card[];
  bid: number;
};

type Combination =
  | "five-of-a-kind"
  | "four-of-a-kind"
  | "full-house"
  | "three-of-a-kind"
  | "two-pairs"
  | "one-pair"
  | "high-card";

export class PokerMachine {
  private cardStrengths: Card[];
  private combinationStrengths: Combination[];
  private includeJoker: boolean;

  constructor(includeJoker: boolean) {
    this.includeJoker = includeJoker;

    this.cardStrengths = 
        !this.includeJoker ? 
        [ "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"] :
        [ "J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];
        
    this.combinationStrengths = [
      "high-card",
      "one-pair",
      "two-pairs",
      "three-of-a-kind",
      "full-house",
      "four-of-a-kind",
      "five-of-a-kind",
    ];
  }

  private isFiveOfAKind = (hand: Hand): boolean => {
    const jokers = this.countJokers(hand);
    return this.countMaxCardRepeat(hand).includes(5 - jokers) || jokers === 5;
  };

  private isFourOfAKind = (hand: Hand): boolean => {
    const jokers = this.countJokers(hand);
    return this.countMaxCardRepeat(hand).includes(4 - jokers);
  };

  private isFullHouse = (hand: Hand): boolean => {
    const jokers = this.countJokers(hand);
    const twos = this.countMaxCardRepeat(hand).filter((cardRepeat) => cardRepeat === 2).length;
    const hasThree = this.countMaxCardRepeat(hand).includes(3);
    return hasThree && twos === 2 || (twos === 4 && jokers === 1);
  };

  private isThreeOfAKind = (hand: Hand): boolean => {
    const jokers = this.countJokers(hand);
    const twos = this.countMaxCardRepeat(hand).filter((cardRepeat) => cardRepeat === 2).length;
    const hasThree = this.countMaxCardRepeat(hand).includes(3);
    return ((hasThree || jokers === 2 ) && twos === 0) || (twos === 2 && jokers === 1);
  };

  private isTwoPairs = (hand: Hand): boolean => {
    const jokers = this.countJokers(hand);
    const twos = this.countMaxCardRepeat(hand).filter((cardRepeat) => cardRepeat === 2).length;
    return twos === 4 || (twos === 2 && jokers === 1);

  };

  private isOnePair = (hand: Hand): boolean => {
    const jokers = this.countJokers(hand);
    const twos = this.countMaxCardRepeat(hand).filter((cardRepeat) => cardRepeat === 2).length;
    return (jokers === 0 && twos === 2) || jokers === 1;

  };

  private countMaxCardRepeat = (hand: Hand): number[] => {
    let cardRepeats: number[] = [];    
    for (let index = 0; index < 5; index++) {
      let cardRepeat = hand.cards.filter((card) => !(this.includeJoker && card === "J") && card === hand.cards[index]).length;
      cardRepeats.push(cardRepeat);
    }
    return cardRepeats;
  }

  public countJokers = (hand: Hand): number => {
    if (this.includeJoker) {
        return hand.cards.filter((card) => card === "J").length;
    } else {
        return 0;
    }
  }


  public compareHands = (handOne: Hand, handTwo: Hand): number => {
    let handOneCombination = this.getCombination(handOne);
    let handTwoCombination = this.getCombination(handTwo);

    if (
      this.combinationStrengths.indexOf(handOneCombination) >
      this.combinationStrengths.indexOf(handTwoCombination)
    ) {
      return 1;
    } else if (
      this.combinationStrengths.indexOf(handOneCombination) <
      this.combinationStrengths.indexOf(handTwoCombination)
    ) {
      return -1;
    } else {
      return this.compareCards(handOne, handTwo);
    }
  };

  public getCombination = (hand: Hand): Combination => {
    if (this.isFiveOfAKind(hand)) {
      return "five-of-a-kind";
    } else if (this.isFourOfAKind(hand)) {
      return "four-of-a-kind";
    } else if (this.isFullHouse(hand)) {
      return "full-house";
    } else if (this.isThreeOfAKind(hand)) {
      return "three-of-a-kind";
    } else if (this.isTwoPairs(hand)) {
      return "two-pairs";
    } else if (this.isOnePair(hand)) {
      return "one-pair";
    } else {
      return "high-card";
    }
  };

  private compareCards = (handOne: Hand, handTwo: Hand): number => {
    let handOneCards = handOne.cards;
    let handTwoCards = handTwo.cards;

    for (let index = 0; index < 5; index++) {
      if (
        this.cardStrengths.indexOf(handOneCards[index]) >
        this.cardStrengths.indexOf(handTwoCards[index])
      ) {
        return 1;
      } else if (
        this.cardStrengths.indexOf(handOneCards[index]) <
        this.cardStrengths.indexOf(handTwoCards[index])
      ) {
        return -1;
      }
    }
    return 0;
  };
}
