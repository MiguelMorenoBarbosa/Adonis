import { DateTime } from 'luxon'
import {
  BaseModel, BelongsTo, belongsTo,
  column
} from '@ioc:Adonis/Lucid/Orm'
import Topic from './Topic'
import Message from './Message'

export default class MessageTopic extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public messageId: number

  @column()
  public topicId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Topic)
  public topic: BelongsTo<typeof Topic>

  @belongsTo(() => Message)
  public message: BelongsTo<typeof Message>
}
