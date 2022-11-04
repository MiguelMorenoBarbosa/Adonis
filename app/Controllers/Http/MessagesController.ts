import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'
import MessageValidator from 'App/Validators/MessageValidator'

export default class MessagesController {

  public async index({ }: HttpContextContract) {
    const topic = await Message.query().preload('user').orderBy('id')
    return topic
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(MessageValidator)
    const message = await Message.create({
      title: data.title,
      message: data.message,
      userId: auth.user?.id
    })
    await message.related('messageTopic').attach(data.topic)
    return message
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const topic = await Message.findOrFail(params.id)
      return topic
    } catch (error) {
      response.status(400).send("Mensagem não encontrada!!!")
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { title, message } = await request.validate(MessageValidator)
    try {
      const topic = await Message.findOrFail(params.id)
      topic.title = title
      topic.message = message
      await topic.save()
      return topic

    } catch (error) {
      response.status(400).send("Mensagem não encontrada!!!")
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const topic = await Message.findOrFail(params.id)
      await topic.delete()
      return topic
    } catch (error) {
      response.status(400).send("Mensagem não encontrada!!!")
    }
  }
}