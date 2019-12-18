interface ISeqModel {
  id?: number,
  createdAt?: string,
  updatedAt?: string,
}

export interface IClickDataModel extends ISeqModel {
  sessionId: string,
  reactionTime: number,
  correct: boolean,
  question: string,
}
