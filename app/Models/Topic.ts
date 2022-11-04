import { DateTime } from 'luxon'
import {
  BaseModel, column, HasMany, hasMany, ManyToMany,
  manyToMany
} from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'
import MessageTopic from './MessageTopic'

export default class Topic extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Message, {
    localKey: 'id',
    pivotForeignKey: 'topic_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'message_id',
    pivotTable: 'message_topic'
  })
  public topicMessage: ManyToMany<typeof Message>

  @hasMany(() => MessageTopic)
  public topicMessages: HasMany<typeof MessageTopic>
}