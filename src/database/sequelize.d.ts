export interface ISeqModel {
  id?: number,
  createdAt?: string,
  updatedAt?: string,
}

export interface ISessionGameTypeConfigBase extends ISeqModel {
  sessionId: string,
  gameType: string,
}