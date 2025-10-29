import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card className="h-[80vh] flex flex-col">
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        <div className="border rounded h-full flex flex-col">
          <Table className="min-w-full">
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
          </Table>

          {/* 🔽 Only scroll the rows (TableBody) */}
          <div className="overflow-y-auto flex-1">
            <Table className="min-w-full">
              <TableBody>
                {orderList && orderList.length > 0 ? (
                  orderList.map((orderItem) => (
                    <TableRow key={orderItem._id}>
                      <TableCell>{orderItem._id}</TableCell>
                      <TableCell>
                        {orderItem.orderDate?.split("T")[0]}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`py-1 px-3 ${
                            orderItem.orderStatus === "confirmed"
                              ? "bg-green-500"
                              : orderItem.orderStatus === "rejected"
                              ? "bg-red-600"
                              : "bg-black"
                          }`}
                        >
                          {orderItem.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>₹{orderItem.totalAmount}</TableCell>
                      <TableCell>
                        <Dialog
                          open={openDetailsDialog}
                          onOpenChange={() => {
                            setOpenDetailsDialog(false);
                            dispatch(resetOrderDetails());
                          }}
                        >
                          <Button
                            onClick={() =>
                              handleFetchOrderDetails(orderItem._id)
                            }
                          >
                            View Details
                          </Button>
                          <AdminOrderDetailsView orderDetails={orderDetails} />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
