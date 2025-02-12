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
    'planId': 1,
    'customerId': 'DTB1234567890123',
    'employeeId': 'EMP001',
    'storeId': 'STORE001',
    'depositId': 1,
    'orderCreateAt': '2023-01-03T00:00:00Z',
    'orderStatus': 'Completed'
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
    'subscriptionId': 1,
    'customerId': 'DTB1234567890123',
    'billingSubTotal': 100.00,
    'billingDiscount': 10.00,
    'billingTotal': 90.00,
    'billingDueDate': '2023-02-04T00:00:00Z',
    'billingNote': 'First billing',
    'billingStatus': 'Paid',
    'billingCreateAt': '2023-01-05T00:00:00Z'
  }
]

export const Payment = [
  {
    'paymentId': 1,
    'billingId': 1,
    'customerId': 'DTB1234567890123',
    'paymentMethod': 'Credit Card',
    'paymentAmount': 90.00,
    'paymentNote': 'Payment for subscription',
    'paymentStatus': 'Success',
    'paymentCreateAt': '2023-01-06T00:00:00Z'
  }
]


export const Feedback = [
  {
    'feedbackId': 1,
    'customerId': 'DTB1234567890123',
    'orderId': 'D1234567890',
    'feedbackSubject': 'Great service',
    'feedbackMessage': 'Very satisfied with the service.',
    'feedbackRating': 10,
    'feedbackStatus': 'Reviewed',
    'feedbackCreateAt': '2023-01-07T00:00:00Z'
  }
]
export const Reply = [
  {
    'replyId': 1,
    'feedbackId': 1,
    'employeeId': 'EMP001',
    'replyMessage': 'Thank you for your feedback!',
    'replyCreateAt': '2023-01-08T00:00:00Z'
  }
]
export const Store = [
  {
    'storeId': 'STORE001',
    'storeName': 'Main Store',
    'storeAddress': '123 Main St',
    'storeCity': 'New York',
    'storeLatitude': '40.7128',
    'storeLongitude': '-74.0060',
    'storeOpenHours': '9AM - 9PM',
    'storePhone': '123-456-7890',
    'storeStatus': 'Open'
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