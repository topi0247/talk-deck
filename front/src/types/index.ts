interface ICard {
  index: number;
  title: string;
  content: string;
}

interface ICards {
  uuid: string;
  situation: string;
  target: string[];
  creator: string;
  cards: ICard[];
}

export type { ICard, ICards };
