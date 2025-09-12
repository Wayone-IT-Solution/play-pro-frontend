import React from 'react';
import Image from 'next/image';
import {
    FiUser,
    FiMail,
    FiPhone,
    FiMapPin,
    FiPackage,
    FiShoppingBag
} from 'react-icons/fi';
import {
    MdPayment,
    MdPersonOutline,
} from 'react-icons/md';
import { getLocalizedText, getLocalizedValues } from '@/hooks/general';

interface OrderItem {
    brand: string;
    name: string;
    price: number;
    image: string;
    productId: string;
    category: string;
    quantity: number;
    description: string;
}

interface UserProfile {
    sms: boolean;
    push: boolean;
    email: boolean;
}

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    phoneNumber: string;
    userProfile: UserProfile;
}

export interface IAddress {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

interface OrderData {
    _id: string;
    user: User;
    items: OrderItem[];
    totalAmount: number;
    finalAmount: number;
    paymentMethod: string;
    paymentStatus: string;
    orderStatus: string;
    address: IAddress;
    createdAt: string;
    updatedAt: string;
}

const OrderDetailsPage = ({ data }: { data: OrderData }) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'processing':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'shipped':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getPaymentStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'failed':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatCurrency = (amount: number) => {
        return `SAR ${amount.toLocaleString('en-IN')}`;
    };

    return (
        <div className="w-full">
            <div className="">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {getLocalizedText("Order Details", "تفاصيل الطلب")}
                        </h1>
                        <p className="text-sm text-gray-600">
                            {getLocalizedText("Order ID", "رقم الطلب")}: #{data._id.slice(-8).toUpperCase()}
                        </p>
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(data.orderStatus)}`}>
                                <FiPackage className="inline mr-1" />
                                {data.orderStatus.charAt(0).toUpperCase() + data.orderStatus.slice(1)}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(data.paymentStatus)}`}>
                                <MdPayment className="inline mr-1" />
                                {data.paymentStatus.charAt(0).toUpperCase() + data.paymentStatus.slice(1)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Items */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-4 md:p-6 border-b border-gray-200">
                                {/* Order Items Header */}
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <FiShoppingBag className="mr-2" />
                                    {getLocalizedText("Order Items", "عناصر الطلب")} ({data.items.length})
                                </h2>
                            </div>
                            <div className="md:p-6 space-y-4">
                                {data.items.map((item) => {
                                    item = getLocalizedValues(item);
                                    return <div key={item.productId} className="flex gap-5 items-start space-x-4 p-4 pl-0 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                                        <div className="flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={80}
                                                height={80}
                                                className="rounded-xl w-24 h-24 object-cover border border-gray-200"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <div className='text-left'>
                                                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                                                    <p className="text-sm text-gray-600 lg:mt-1">
                                                        <span className="font-medium">{item.brand}</span> • {item.category}
                                                    </p>
                                                    <p className="text-sm text-gray-500 lg:mt-1">{item.description}</p>
                                                    <div className="flex items-center mt-2 text-sm text-gray-600">
                                                        <span>Qty: {item.quantity}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-gray-900">{formatCurrency(item.price)}</p>
                                                    <p className="text-xs text-gray-500 mt-1">per item</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Customer Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-4 md:p-6 border-b border-gray-200">
                                {/* Customer Details Header */}
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <MdPersonOutline className="mr-2" />
                                    {getLocalizedText("Customer Details", "تفاصيل العميل")}
                                </h2>
                            </div>
                            <div className="p-4 md:p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <FiUser className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-900">
                                        {data.user.firstName} {data.user.lastName}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FiMail className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-900">{data.user.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FiPhone className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-900">{data.user.phoneNumber}</span>
                                </div>
                                <div className="flex items-start text-left gap-3">
                                    <div className='w-5'>
                                        <FiMapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                    </div>
                                    <span className='text-sm'>
                                        {[
                                            data.address.street,
                                            data.address.city,
                                            data.address.state,
                                            data.address.postalCode,
                                            data.address.country,
                                        ]
                                            .filter(Boolean)
                                            .join(", ")}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-4 md:p-6 border-b border-gray-200">
                                {/* Order Summary Header */}
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    {getLocalizedText("Order Summary", "ملخص الطلب")}
                                </h2>
                            </div>
                            <div className="p-4 md:p-6 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">{getLocalizedText("Subtotal", "المجموع الفرعي")}</span>
                                    <span className="text-gray-900">{formatCurrency(data.totalAmount)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">{getLocalizedText("Shipping", "الشحن")}</span>
                                    <span className="text-gray-900">{getLocalizedText("Free", "مجاني")}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">{getLocalizedText("Tax", "الضريبة")}</span>
                                    <span className="text-gray-900">{getLocalizedText("Included", "مضمنة")}</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between font-semibold text-lg">
                                        <span className="text-gray-900">{getLocalizedText("Total", "الإجمالي")}</span>
                                        <span className="text-gray-900">{formatCurrency(data.finalAmount)}</span>
                                    </div>
                                </div>
                                <div className="pt-3 border-t">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">{getLocalizedText("Payment Method", "طريقة الدفع")}</span>
                                        <span className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                                            {data.paymentMethod}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;