interface ICard {
  index: number;
  title: string;
  comment: string;
}

interface ICards {
  uuid: string;
  situation: string;
  target: string[];
  creator: string;
  cards: ICard[];
}

interface IUser {
  name: string;
}

export type { ICard, ICards, IUser };
