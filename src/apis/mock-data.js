export const customer = [
  {
    'customerId': 'DTB1234567890123',
    'customerCityCode': 1,
    'customerName': 'John Doe',
    'customerPassword': '12345678a',
    'customerDescription': 'Regular customer',
    'customerIdentity': 'ID123456',
    'customerDOB': '1990-01-01',
    'customerGender': 'Male',
    'customerAddress': '123 Main St',
    'customerPhone': '123-456-7890',
    'customerEmail': 'john.doe@example.com',
    'customerIsActive': true,
    'customerCreateAt': '2023-01-01T00:00:00Z',
    'customerUpdatedAt': '2023-01-01T00:00:00Z'
  },
  {
    'customerId': 'DTB9876543210987',
    'customerCityCode': 2,
    'customerName': 'Jane Smith',
    'customerPassword': '12345678a',
    'customerDescription': 'Premium customer',
    'customerIdentity': 'ID654321',
    'customerDOB': '1985-05-05',
    'customerGender': 'Female',
    'customerAddress': '456 Elm St',
    'customerPhone': '987-654-3210',
    'customerEmail': 'jane.smith@example.com',
    'customerIsActive': true,
    'customerCreateAt': '2023-02-01T00:00:00Z',
    'customerUpdatedAt': '2023-02-01T00:00:00Z'
  }
]

export const Employee = [
  {
    'employeeId': 'EMP001',
    'employeeName': 'Alice Johnson',
    'employeePassword': '12345678a',
    'employeeRole': 'Sales Manager',
    'employeeDescription': 'Sales Manager',
    'employeeIdentity': 'ID789012',
    'employeeDOB': '1980-10-10',
    'employeeGender': 'Female',
    'employeeAddress': '789 Oak St',
    'employeePhone': '555-123-4567',
    'employeeEmail': 'alice.johnson@example.com',
    'employeeSalary': 5000.00,
    'employeeIsActive': true,
    'accountCreateAt': '2023-01-15T00:00:00Z',
    'accountUpdatedAt': '2023-01-15T00:00:00Z'
  }
]

export const DepositSubscription = [
  {
    'depositId': 1,
    'subscriptionId': 1,
    'subscriptionPlan': 'Basic Plan',
    'status': 'Processing',
    'createdAt': '2023-01-02T00:00:00Z'
  },
  {
    'depositId': 1,
    'subscriptionId': 2,
    'subscriptionPlan': 'Basic Plan',
    'status': 'Pending',
    'createdAt': '2023-01-03T00:00:00Z'
  },
  {
    'depositId': 2,
    'subscriptionId': 3,
    'subscriptionPlan': 'Basic Plan',
    'status': 'Processing',
    'createdAt': '2023-01-04T00:00:00Z'
  }
]


export const Deposit = [
  {
    'depositId': 1,
    'depositName': 'Initial Deposit',
    'depositDescription': 'First deposit for account activation',
    'customerId': 'DTB1234567890123',
    'depositCreateAt': '2023-01-02T00:00:00Z',
    'depositStatus': 'Completed'
  }
]

export const Order = [
  {
    'orderId': 'D1234567890',
    'orderName': 'Order 1',
    'orderDescription': 'Monthly subscription',
    'orderAmount': 100.00,
    'accountId': 'DTB1234567890123', // Đổi từ customerId sang accountId
    'planId': 1,
    'employeeId': 'EMP001',
    'storeId': 'STORE001',
    'orderIsFeasible': true, // Thêm trường mới
    'orderStatus': 'Processing', // Đổi từ Completed sang Processed
    'orderCreatedAt': '2023-01-03T00:00:00Z', // Đổi tên trường
    'orderUpdatedAt': '2023-01-03T00:00:00Z' // Thêm trường mới
  },
  {
    'orderId': 'D1234567891',
    'orderName': 'Order 2',
    'orderDescription': 'Monthly subscription',
    'orderAmount': 100.00,
    'accountId': 'DTB1234567890123',
    'planId': 1,
    'employeeId': 'EMP001',
    'storeId': 'STORE001',
    'orderIsFeasible': true,
    'orderStatus': 'Processing',
    'orderCreatedAt': '2023-01-03T00:00:00Z',
    'orderUpdatedAt': '2023-01-03T00:00:00Z'
  },
  {
    'orderId': 'D1234567892',
    'orderName': 'Order 3',
    'orderDescription': 'Monthly subscription',
    'orderAmount': 100.00,
    'accountId': 'DTB1234567890123',
    'planId': 1,
    'employeeId': 'EMP001',
    'storeId': 'STORE001',
    'orderIsFeasible': true,
    'orderStatus': 'Cancelled',
    'orderCreatedAt': '2023-01-03T00:00:00Z',
    'orderUpdatedAt': '2023-01-03T00:00:00Z'
  }
]

export const Subscription = [
  {
    'subscriptionId': 1,
    'orderId': 'D1234567890',
    'customerId': 'DTB1234567890123',
    'planId': 1,
    'subscriptionStartDate': '2023-01-04T00:00:00Z',
    'subscriptionBillingDate': '2023-02-04T00:00:00Z',
    'subscriptionStatus': 'Active',
    'subscriptionCreateAt': '2023-01-04T00:00:00Z'
  }
]

export const Billing = [
  {
    'billingId': 1,
    'billingName': 'Billing 1', // Thêm trường billingName
    'subscriptionId': 1,
    'depositId': 1, // Thêm trường depositId
    'billingSubTotal': 100.00,
    'billingDiscount': 10.00,
    'Tax': 0.00, // Thêm trường Tax
    'billingTotal': 90.00,
    'billingDueDate': '2023-02-04T00:00:00Z',
    'billingNote': 'First billing',
    'billingStatus': 'Paid', // Các giá trị có thể là 'Unpaid', 'Paid', 'Overdue', 'Cancelled'
    'billingCreatedAt': '2023-01-05T00:00:00Z' // Đổi tên trường từ billingCreateAt
  }
]

export const Payment = [
  {
    'paymentId': 1, // Primary key
    'billingId': 1, // Foreign key to Billing
    'orderId': 'D1234567890', // Foreign key to Orders
    'paymentMethod': 'Credit Card', // Phương thức thanh toán
    'paymentAmount': 90.00, // Số tiền thanh toán
    'paymentNote': 'Payment for subscription', // Ghi chú thanh toán
    'paymentStatus': 'Success', // Trạng thái: 'Success' hoặc 'Failed'
    'paymentCreatedAt': '2023-01-06T00:00:00Z' // Ngày thanh toán (đổi tên trường)
  },
  {
    'paymentId': 2, // Primary key
    'billingId': 2, // Foreign key to Billing
    'orderId': 'D1234567891', // Foreign key to Orders
    'paymentMethod': 'Credit Card', // Phương thức thanh toán
    'paymentAmount': 90.00, // Số tiền thanh toán
    'paymentNote': 'Payment for subscription', // Ghi chú thanh toán
    'paymentStatus': 'Success', // Trạng thái: 'Success' hoặc 'Failed'
    'paymentCreatedAt': '2023-01-06T00:00:00Z' // Ngày thanh toán (đổi tên trường)
  },
  {
    'paymentId': 3, // Primary key
    'billingId': 3, // Foreign key to Billing
    'orderId': 'D1234567892', // Foreign key to Orders
    'paymentMethod': 'Credit Card', // Phương thức thanh toán
    'paymentAmount': 90.00, // Số tiền thanh toán
    'paymentNote': 'Payment for subscription', // Ghi chú thanh toán
    'paymentStatus': 'Success', // Trạng thái: 'Success' hoặc 'Failed'
    'paymentCreatedAt': '2023-01-06T00:00:00Z' // Ngày thanh toán (đổi tên trường)
  }
]
export const Feedback = [
  {
    'feedbackId': 1, // Primary key
    'accountId': 'DTB1234567890123', // Foreign key to tbCustomer
    'orderId': 'D1234567890', // Foreign key to tbOrder
    'feedbackSubject': 'Great service', // Subject of feedback
    'feedbackMessage': 'Very satisfied with the service.', // Feedback content
    'feedbackRating': 10, // Rating from 1 to 10
    'feedbackStatus': 'Reviewed', // Status: Pending, Reviewed, Resolved
    'feedbackCreatedAt': '2023-01-07T00:00:00Z' // Timestamp when feedback was created
  },
  {
    'feedbackId': 2, // Primary key
    'accountId': 'DTB1234567890123', // Foreign key to tbCustomer
    'orderId': 'D1234567891', // Foreign key to tbOrder
    'feedbackSubject': 'Great service', // Subject of feedback
    'feedbackMessage': 'Very satisfied with the service.', // Feedback content
    'feedbackRating': 10, // Rating from 1 to 10
    'feedbackStatus': 'Resolved', // Status: Pending, Reviewed, Resolved
    'feedbackCreatedAt': '2023-01-07T00:00:00Z' // Timestamp when feedback was created
  }
]

export const Reply = [
  {
    'replyId': 1, // Primary key
    'feedbackId': 1, // Foreign key to tbFeedback
    'employeeId': 'EMP001', // Foreign key to tbEmployee
    'replyMessage': 'Thank you for your feedback!', // Reply content
    'replyCreatedAt': '2023-01-08T00:00:00Z' // Timestamp when reply was created
  },
  {
    'replyId': 2, // Primary key
    'feedbackId': 2, // Foreign key to tbFeedback
    'employeeId': 'EMP001', // Foreign key to tbEmployee
    'replyMessage': 'Thank you for your feedback!', // Reply content
    'replyCreatedAt': '2023-01-08T00:00:00Z' // Timestamp when reply was created
  }
]
export const Store = [
  {
    id: 1,
    storeName: 'Main Store',
    storeAddress: '123 Le Loi Street',
    storeCity: 'Hanoi',
    storeLatitude: '21.0278',
    storeLongitude: '105.8342',
    storeOpenHours: '8:00 - 22:00',
    storePhone: '024 3824 5678',
    storeStatus: 'Active'
  },
  {
    id: 2,
    storeName: 'District 1 Store',
    storeAddress: '456 Nguyen Hue Street',
    storeCity: 'Ho Chi Minh City',
    storeLatitude: '10.7769',
    storeLongitude: '106.7009',
    storeOpenHours: '9:00 - 21:00',
    storePhone: '028 3822 1234',
    storeStatus: 'Inactive'
  }
]
export const Vendors = [
  {
    'vendorId': 1,
    'cityId': 1,
    'vendorName': 'Vendor A',
    'vendorAddress': '123 Vendor St',
    'vendorPhone': '987-654-3210',
    'vendorStatus': 'Active'
  }
]
export const CityCode = [
  {
    'cityId': 1,
    'cityName': 'New York'
  },
  {
    'cityId': 2,
    'cityName': 'Los Angeles'
  }
]
export const Plan = [
  {
    'planId': 1,
    'connectionId': 1,
    'planName': 'Basic Plan',
    'planDetails': 'Includes 100 minutes and 100 texts',
    'planPrice': 50.00,
    'planValidity': '30 days',
    'planLocalCallCharge': '0.10',
    'planSTDCallCharge': '0.20',
    'planMessaging': '0.05',
    'planDescription': 'Basic subscription plan',
    'planIsActive': true
  }
]
export const Connection = [
  {
    'connectionId': 1,
    'connectionName': 'Connection A',
    'connectionIsActive': true
  }
]