import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Table } from "flowbite-react"

import AdminSidebar from "@/components/AdminSidebar"
import { AppDispatch } from "@/tookit/store"
import { fetchOrders } from "@/tookit/slices/OrdersSlice copy"
import useOrderState from "@/hooks/useOrderState"

export const AdminOrders = () => {
  const { orders, order, isLoading, error } = useOrderState()

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchOrders())
    }
    fetchData()
  }, [])

  return (
    <div className="wrap">
      {isLoading && <p>Loading</p>}
      {error && <p>error{error}</p>}
      <AdminSidebar />
      <div className="dashboard__container">
        <div className="dashboard__content">
          <h2>List all orders</h2>
          <Table className="table__orders">
            <Table.Head>
              <Table.HeadCell className="table-head-cell">First Name</Table.HeadCell>
              <Table.HeadCell className="table-head-cell">Order Date</Table.HeadCell>
              <Table.HeadCell className="table-head-cell">Order Status</Table.HeadCell>
              <Table.HeadCell className="table-head-cell">Quantity</Table.HeadCell>
              <Table.HeadCell className="table-head-cell">Product Name</Table.HeadCell>
              <Table.HeadCell className="table-head-cell">Product Price</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {orders.map((order) => (
                <Table.Row className="table-row" key={order.orderId}>
                  <Table.Cell className="table-cell">{order.user.firstName}</Table.Cell>
                  <Table.Cell className="table-cell">{order.orderDate}</Table.Cell>
                  <Table.Cell className="table-cell">{order.orderStatus}</Table.Cell>
                  {order.orderProducts.map((orderProduct, index) => (
                    <React.Fragment key={index}>
                      <Table.Cell className="table-cell">{orderProduct.quantity}</Table.Cell>
                      <Table.Cell className="table-cell">
                        {orderProduct.product.productName}
                      </Table.Cell>
                      <Table.Cell className="table-cell">
                        {orderProduct.product.productPrice}
                      </Table.Cell>
                    </React.Fragment>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  )
}
