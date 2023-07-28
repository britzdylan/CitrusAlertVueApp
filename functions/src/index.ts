interface OrderAttributes {
  data: {
    id: number
    type: string
    attributes: {
      updated_at: string
      created_at: string
      test_mode: boolean
      store_id: number
      customer_id: number
      identifier: string
      order_number: number
      user_name: string
      user_email: string
      currency: string
      currency_rate: string
      tax_name: string | null
      tax_rate: string
      status: string
      status_formatted: string
      refunded: boolean
      refunded_at: null
      subtotal: number
      discount_total: number
      tax: number
      total: number
      subtotal_usd: number
      discount_total_usd: number
      tax_usd: number
      total_usd: number
      subtotal_formatted: string
      discount_total_formatted: string
      tax_formatted: string
      total_formatted: string
      urls: {
        receipt: string
      }
    }
  }
}

import { onRequest } from 'firebase-functions/v2/https'
import { initializeApp } from 'firebase-admin/app'
import { messaging, firestore } from 'firebase-admin'

initializeApp()

exports.sendPushNotification = onRequest(
  {
    cors: true
  },
  async (req, res) => {
    // const signature = Buffer.from(req.get("X-Signature") || "", "utf8");

    // if (!signature) {
    //   res.status(400).send("Invalid secret");
    //   return;
    // }
    const userId = req.query.id
    if (!userId) {
      res.status(400).send('Invalid id')
      return
    }
    const db = firestore()

    // fetch user from firestore
    const user = await db.collection('users').doc(String(userId)).get()
    if (!user.exists) {
      res.status(400).send('User not found')
      return
    }
    const deviceToken = user.data()?.device_token // get from firestore
    if (!deviceToken) {
      res.status(400).send('Device token not found')
      return
    }
    const newOrder = { ...req.body } as OrderAttributes

    // console.log(newOrder);
    if (!deviceToken || !newOrder.data.attributes) {
      res.status(400).send('Missing device token or order')
      return
    }

    if (newOrder.data.attributes.status !== 'paid') {
      res.status(200).send('Order is not paid')
      return
    }

    const message = {
      notification: {
        title: `New Order for ${newOrder.data.attributes.total_formatted}`,
        body: `Order #${newOrder.data.attributes.order_number} was just placed`
      },
      token: deviceToken
    }

    try {
      console.log('Sending message:', message)
      const id = await messaging().send(message)
      res.status(200).json(id)
    } catch (error) {
      console.log('Error sending message:', error)
      res.status(500).send('Notification failed')
      return
    }
  }
)
