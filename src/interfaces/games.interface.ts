export interface IGames {
  id: number;
  title: string;
  platform: string;
  score: number;
  genre: string;
  editorsChoice: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IGamesAdd {
  title: string;
  platform: string;
  score: number;
  genre: string;
  userId: number;
  editorsChoice: string;
}

export interface IGameFields {
  title?: string;
  platform?: string;
  score?: number;
  genre?: string;
  userId?: number;
  editorsChoice?: string;
}
