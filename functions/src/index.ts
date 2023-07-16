interface OrderAttributes {
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

import { onRequest } from 'firebase-functions/v2/https'
import { initializeApp } from 'firebase-admin/app'
import { messaging } from 'firebase-admin'

initializeApp()

exports.sendPushNotification = onRequest(
  {
    cors: true
  },
  async (req, res) => {
    const deviceToken = String(req.query.token) // get from firestore
    const newOrder = { ...req.body } as OrderAttributes
    console.log(newOrder)
    if (!deviceToken || !newOrder.attributes) {
      res.status(400).send('Missing device token or order')
      return
    }

    if (newOrder.attributes.status !== 'paid') {
      res.status(200).send('Order is not paid')
      return
    }

    const message = {
      notification: {
        title: `New Order for ${newOrder.attributes.total_formatted}`,
        body: `Order #${newOrder.attributes.order_number} was just placed`
      },
      token: deviceToken
    }

    try {
      const response = await messaging().send(message)
      console.log('Successfully sent message:', response)
      res.status(200).send('Notification sent successfully')
    } catch (error) {
      console.log('Error sending message:', error)
      res.status(500).send('Notification failed')
    }
  }
)
