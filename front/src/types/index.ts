interface ICard {
  index: number;
  title: string;
  comment: string;
}

interface ICards {
  uuid: string;
  title: string;
  targets: ITargets[];
  user: IUser;
  contents: ICard[];
  isLikes: boolean;
}

interface ITargets {
  body: string;
}

interface IUser {
  uuid: string;
  name: string;
}

export type { ICard, ICards, IUser };
