import { getSql } from '@/lib/db';
import { ORDER_STATUS, OrderDraft, PlacedOrder } from '@/types';

export async function insertOrder(order: OrderDraft): Promise<string> {
  const sql = getSql();
  const [row] = await sql`
    INSERT INTO orders (order_number, email, items, shipping_address, shipping_method, payment_method, subtotal, shipping, tax, total)
    VALUES (
      ${order.orderNumber}, ${order.shippingAddress.email}, ${JSON.stringify(order.items)},
      ${JSON.stringify(order.shippingAddress)}, ${JSON.stringify(order.shippingMethod)}, ${JSON.stringify(order.paymentMethod)},
      ${order.subtotal}, ${order.shipping}, ${order.tax}, ${order.total}
    )
    RETURNING id
  `;
  return row.id;
}

export async function findOrderById(id: string): Promise<PlacedOrder | null> {
  const sql = getSql();
  const [row] = await sql`
    SELECT id, order_number AS "orderNumber", created_at AS date, items,
      shipping_address AS "shippingAddress", shipping_method AS "shippingMethod", payment_method AS "paymentMethod",
      subtotal::float8 AS subtotal, shipping::float8 AS shipping, tax::float8 AS tax, total::float8 AS total, status
    FROM orders
    WHERE id = ${id}
  `;
  return (row as PlacedOrder | undefined) ?? null;
}

export async function markOrderPaid(orderId: string, stripeSessionId: string): Promise<boolean> {
  const sql = getSql();
  const rows = await sql`
    UPDATE orders
    SET status = ${ORDER_STATUS.paid}, stripe_session_id = ${stripeSessionId}
    WHERE id = ${orderId} AND status = ${ORDER_STATUS.pending}
    RETURNING id
  `;
  return rows.length > 0;
}
