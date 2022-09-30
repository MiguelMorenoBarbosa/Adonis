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
    const topic = await Message.create({ ...data, userId: auth.user?.id })
    return topic
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