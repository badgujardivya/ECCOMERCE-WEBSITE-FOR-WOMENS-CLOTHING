import { useRef, useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const printRef = useRef();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  function handlePrint() {
    const printWindow = window.open("", "", "width=800,height=600");

    printWindow.document.write(`
      <html>
        <head>
          <title>Order Details</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            h2 {
              margin-top: 30px;
              border-bottom: 2px solid #000;
              padding-bottom: 5px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              text-align: left;
              padding: 8px;
              border: 1px solid #ccc;
            }
            th {
              background-color: #f9f9f9;
              width: 30%;
            }
          </style>
        </head>
        <body>
          <h2>Order Summary</h2>
          <table>
            <tr><th>Order ID</th><td>${orderDetails?._id}</td></tr>
            <tr><th>Order Date</th><td>${orderDetails?.orderDate.split("T")[0]}</td></tr>
            <tr><th>Total Price</th><td>₹${orderDetails?.totalAmount}</td></tr>
            <tr><th>Payment Method</th><td>${orderDetails?.paymentMethod}</td></tr>
            <tr><th>Payment Status</th><td>${orderDetails?.paymentStatus}</td></tr>
            <tr><th>Order Status</th><td>${orderDetails?.orderStatus}</td></tr>
          </table>

          <h2>Cart Items</h2>
          <table>
            <thead>
              <tr><th>Title</th><th>Quantity</th><th>Price</th></tr>
            </thead>
            <tbody>
              ${
                orderDetails?.cartItems
                  ?.map(
                    (item) => `
                <tr>
                  <td>${item.title}</td>
                  <td>${item.quantity}</td>
                  <td>₹${item.price}</td>
                </tr>`
                  )
                  .join("") || ""
              }
            </tbody>
          </table>

          <h2>Shipping Info</h2>
          <table>
            <tr><th>Customer Name</th><td>${user?.userName}</td></tr>
            <tr><th>Address</th><td>${orderDetails?.addressInfo?.address}</td></tr>
            <tr><th>City</th><td>${orderDetails?.addressInfo?.city}</td></tr>
            <tr><th>Pincode</th><td>${orderDetails?.addressInfo?.pincode}</td></tr>
            <tr><th>Phone</th><td>${orderDetails?.addressInfo?.phone}</td></tr>
            <tr><th>Notes</th><td>${orderDetails?.addressInfo?.notes}</td></tr>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
      <div className="grid gap-6" ref={printRef}>
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>₹{orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems?.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>Title: {item.title}</span>
                  <span>Quantity: {item.quantity}</span>
                  <span>Price: ₹{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🔘 Print and Status Form Buttons */}
      <div className="mt-6 flex flex-col gap-4">
        <CommonForm
          formControls={[
            {
              label: "Order Status",
              name: "status",
              componentType: "select",
              options: [
                { id: "pending", label: "Pending" },
                { id: "inProcess", label: "In Process" },
                { id: "inShipping", label: "In Shipping" },
                { id: "delivered", label: "Delivered" },
                { id: "rejected", label: "Rejected" },
              ],
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Update Order Status"}
          onSubmit={handleUpdateStatus}
        />

        {/* 🖨️ Print Button */}
        <Button variant="outline" onClick={handlePrint}>
          Print Bill
        </Button>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
