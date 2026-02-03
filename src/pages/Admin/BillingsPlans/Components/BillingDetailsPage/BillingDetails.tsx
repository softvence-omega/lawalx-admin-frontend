import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Save } from "lucide-react";
import {
  useGetPaymentByIdQuery,
  useUpdatePaymentMutation,
} from "@/store/Api/PaymentApi/PaymentApi";
import { toast } from "sonner";

const BillingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = location.pathname.includes("edit");

  const { data, isLoading } = useGetPaymentByIdQuery(id as string);
  const [updatePayment] = useUpdatePaymentMutation();
  const paymentData = data?.data;

  // Form state
  const [formData, setFormData] = useState({
    userId: "",
    plan: "Business",
    billingCycle: "Half-Yearly",
    joinedDate: "",
    customPrice: "0.00",
    promoCode: "",
    autoRenew: false,
    trialEnabled: false,
    trialDays: 0,
    projectsLimit: 0,
    usersLimit: 0,
    storageLimit: 0,
    customBranding: false,
    chartLibrary: false,
    contactPerson: "",
    billingEmail: "",
    paymentMethod: "Stripe",
    taxVatNumber: "",
    billingAddress: "",
  });

  useEffect(() => {
    if (paymentData) {
      setFormData({
        userId: paymentData.userId || "",
        plan: paymentData.plan || "Business",
        billingCycle: paymentData.billingCycle || "MONTHLY",
        joinedDate: paymentData.joinedDate || "",
        customPrice: paymentData.customPrice?.toString() || "0.00",
        promoCode: paymentData.promoCode || "",
        autoRenew: paymentData.autoRenew || false,
        trialEnabled: paymentData.trialEnabled || false,
        trialDays: paymentData.trialDays || 0,
        projectsLimit: paymentData.projectsLimit || 0,
        usersLimit: paymentData.usersLimit || 0,
        storageLimit: paymentData.storageLimit || 0,
        customBranding: paymentData.customBranding || false,
        chartLibrary: paymentData.chartLibrary || false,
        contactPerson: paymentData.billingInfo?.contactName || "",
        billingEmail: paymentData.billingInfo?.email || "",
        paymentMethod: paymentData.billingInfo?.paymentMethod || "Stripe",
        taxVatNumber: paymentData.billingInfo?.taxVatNumber || "",
        billingAddress: paymentData.billingInfo?.billingAddress || "",
      });
    }
  }, [paymentData]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    const toastId = toast.loading("Updating billing information...");
    try {
      await updatePayment({
        id: id as string,
        data: {
          userId: formData.userId || id,
          plan: formData.plan,
          billingCycle: formData.billingCycle,
          joinedDate:
            formData.joinedDate || new Date().toISOString().split("T")[0],
          customPrice: parseFloat(formData.customPrice),
          promoCode: formData.promoCode,
          autoRenew: formData.autoRenew,
          trialEnabled: formData.trialEnabled,
          trialDays: Number(formData.trialDays),
          projectsLimit: Number(formData.projectsLimit),
          usersLimit: Number(formData.usersLimit),
          storageLimit: Number(formData.storageLimit),
          customBranding: formData.customBranding,
          chartLibrary: formData.chartLibrary,
          billingContactName: formData.contactPerson,
          billingEmail: formData.billingEmail,
          billingPaymentMethod: formData.paymentMethod,
          billingTaxVatNumber: formData.taxVatNumber,
          billingAddress: formData.billingAddress,
        },
      }).unwrap();

      toast.success("Billing information updated successfully", {
        id: toastId,
      });
      navigate(`/admin/billings/${id}`);
    } catch {
      toast.error("Failed to update billing information", { id: toastId });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading billing details...</div>
      </div>
    );
  }

  const projectsProgress =
    ((paymentData?.projectsCreated || 0) / (paymentData?.projectsLimit || 1)) *
    100;
  const usersProgress =
    ((paymentData?.totalUsers || 0) / (paymentData?.usersLimit || 1)) * 100;
  const storageProgress =
    ((paymentData?.storageUsed || 0) / (paymentData?.storageLimit || 1)) * 100;

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/billings")}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {isEdit ? "Edit Billing Information" : "Billing Details"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {isEdit
                ? "Update subscription and billing settings"
                : "View subscription and billing information"}
            </p>
          </div>
        </div>
        {!isEdit && (
          <Button
            onClick={() => navigate(`/admin/billings/edit/${id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Edit Billing
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6 border border-gray-200 rounded-xl p-8">
          {/* Subscription Settings */}
          <div className="bg-white">
            <h2 className="text-lg font-semibold text-blue-600 mb-6">
              Subscription Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Plan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Plan
                </label>
                {isEdit ? (
                  <select
                    name="plan"
                    value={formData.plan}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                  >
                    <option value="TRIAL">Trial</option>
                    <option value="BUSINESS">Business</option>
                    <option value="ENTERPRISE">Enterprise</option>
                    <option value="PROFESSIONAL">Professional</option>
                  </select>
                ) : (
                  <div className="px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm">
                    {formData.plan}
                  </div>
                )}
              </div>

              {/* Billing Cycle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Billing Cycle
                </label>
                {isEdit ? (
                  <select
                    name="billingCycle"
                    value={formData.billingCycle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                  >
                    <option value="MONTHLY">Monthly</option>
                    <option value="QUARTERLY">Quarterly</option>
                    <option value="HALF_YEARLY">Half-Yearly</option>
                    <option value="YEARLY">Yearly</option>
                  </select>
                ) : (
                  <div className="px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm">
                    {formData.billingCycle}
                  </div>
                )}
              </div>

              {/* Custom Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Price*
                </label>
                {isEdit ? (
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      $
                    </span>
                    <input
                      type="number"
                      name="customPrice"
                      value={formData.customPrice}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                ) : (
                  <div className="px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm">
                    ${formData.customPrice}
                  </div>
                )}
              </div>

              {/* Discount/Promo Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount/Promo Code*
                </label>
                <div className="flex gap-2">
                  {isEdit ? (
                    <div className="border border-gray-200 rounded-lg w-full flex">
                      <input
                        type="text"
                        name="promoCode"
                        value={formData.promoCode}
                        onChange={handleInputChange}
                        placeholder="THEFADEDEV26"
                        className="flex-1 px-4 py-2.5 text-sm"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="border-none px-6 rounded-l-none h-full bg-[#E2E8F0]"
                      >
                        Applied
                      </Button>
                    </div>
                  ) : (
                    <div className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm flex items-center justify-between">
                      <span>{formData.promoCode || "No code applied"}</span>
                      {formData.promoCode && (
                        <Badge className="bg-green-100 text-green-700">
                          Applied
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Trial Days */}
              {isEdit && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trial Days*
                  </label>
                  <input
                    type="number"
                    name="trialDays"
                    value={formData.trialDays}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              )}
            </div>

            {/* Toggles */}
            <div className="mt-6 flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={!isEdit}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      autoRenew: !prev.autoRenew,
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.autoRenew ? "bg-blue-600" : "bg-gray-300"
                  } ${!isEdit ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.autoRenew ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-sm font-medium text-gray-700">
                  Auto Renew
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={!isEdit}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      trialEnabled: !prev.trialEnabled,
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.trialEnabled ? "bg-blue-600" : "bg-gray-300"
                  } ${!isEdit ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.trialEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-sm font-medium text-gray-700">
                  Trial Period
                </span>
              </div>
            </div>
          </div>

          {/* Usage Overview */}
          <div className="bg-white">
            <h2 className="text-lg font-semibold text-blue-600 mb-6">
              Usage Overview
            </h2>

            <div className="space-y-6">
              {/* Project Created */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Project Created
                  </span>
                  {isEdit ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Limit:</span>
                      <input
                        type="number"
                        name="projectsLimit"
                        value={formData.projectsLimit}
                        onChange={handleInputChange}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  ) : (
                    <span className="text-sm font-semibold text-gray-900">
                      {paymentData?.projectsCreated || 0}/
                      {paymentData?.projectsLimit || 10}
                    </span>
                  )}
                </div>
                {!isEdit && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(projectsProgress, 100)}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Total Users */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Total Users
                  </span>
                  {isEdit ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Limit:</span>
                      <input
                        type="number"
                        name="usersLimit"
                        value={formData.usersLimit}
                        onChange={handleInputChange}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  ) : (
                    <span className="text-sm font-semibold text-gray-900">
                      {paymentData?.totalUsers || 0}/
                      {paymentData?.usersLimit || 600}
                    </span>
                  )}
                </div>
                {!isEdit && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(usersProgress, 100)}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Storage Usage */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Storage Usage
                  </span>
                  {isEdit ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Limit (GB):</span>
                      <input
                        type="number"
                        name="storageLimit"
                        value={formData.storageLimit}
                        onChange={handleInputChange}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  ) : (
                    <span className="text-sm font-semibold text-gray-900">
                      {paymentData?.storageUsed || 0}gb/
                      {paymentData?.storageLimit || 12}gb
                    </span>
                  )}
                </div>
                {!isEdit && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(storageProgress, 100)}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Native Add-ons */}
              <div>
                <span className="text-sm font-medium text-gray-700 block mb-3">
                  Native Add-ons
                </span>
                {isEdit ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            customBranding: !prev.customBranding,
                          }))
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          formData.customBranding
                            ? "bg-blue-600"
                            : "bg-gray-300"
                        } cursor-pointer`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.customBranding
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                      <span className="text-sm font-medium text-gray-700">
                        Custom Branding
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            chartLibrary: !prev.chartLibrary,
                          }))
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          formData.chartLibrary ? "bg-blue-600" : "bg-gray-300"
                        } cursor-pointer`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.chartLibrary
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                      <span className="text-sm font-medium text-gray-700">
                        Chart Library
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {paymentData?.customBranding && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 border border-blue-200"
                      >
                        Custom Branding
                      </Badge>
                    )}
                    {paymentData?.chartLibrary && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 border border-blue-200"
                      >
                        Chart Library
                      </Badge>
                    )}
                    {!paymentData?.customBranding &&
                      !paymentData?.chartLibrary && (
                        <span className="text-sm text-gray-500">
                          No add-ons enabled
                        </span>
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Billing Information */}
          <div className="bg-white">
            <h2 className="text-lg font-semibold text-blue-600 mb-6">
              Billing Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Billing Contact Person */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Billing Contact Person*
                </label>
                {isEdit ? (
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder="Jhon Ibne Sinha"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <div className="px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm">
                    {formData.contactPerson || "N/A"}
                  </div>
                )}
              </div>

              {/* Billing Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Billing Email*
                </label>
                {isEdit ? (
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="billingEmail"
                      value={formData.billingEmail}
                      onChange={handleInputChange}
                      placeholder="service.xyz@builder.io"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                ) : (
                  <div className="px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {formData.billingEmail || "N/A"}
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method*
                </label>
                {isEdit ? (
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                  >
                    <option value="STRIPE">Stripe</option>
                    <option value="PAYPAL">PayPal</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                  </select>
                ) : (
                  <div className="px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm">
                    {formData.paymentMethod}
                  </div>
                )}
              </div>

              {/* Tax ID/VAT Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax ID/VAT Number*
                </label>
                {isEdit ? (
                  <input
                    type="text"
                    name="taxVatNumber"
                    value={formData.taxVatNumber}
                    onChange={handleInputChange}
                    placeholder="US12345678"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <div className="px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm">
                    {formData.taxVatNumber || "N/A"}
                  </div>
                )}
              </div>

              {/* Billing Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Billing Address*
                </label>
                {isEdit ? (
                  <textarea
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                    placeholder="123 Business Ave&#10;Suite 500&#10;San Francisco, CA 94105"
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                  />
                ) : (
                  <div className="px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm whitespace-pre-line">
                    {formData.billingAddress || "N/A"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEdit && (
            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/admin/billings/${id}`)}
                className="px-6 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                className="px-6 bg-blue-600 hover:bg-blue-700 text-white gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        {/* Right Sidebar - Current Plan & Account Info */}
        <div className="space-y-6 border border-gray-200 rounded-xl p-8 bg-white h-fit sticky top-20 md:top-32 self-start">
          {/* Company Logo/Badge */}
          <div className=" flex items-center justify-between mb-14 mt-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16">
                <img src="/Vector.png" className="w-full h-full" alt="" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                BUILDER.IO
              </h3>
            </div>
            <Badge className="mt-2 bg-green-100 text-green-700 border-green-200">
              {paymentData?.status || "Active"}
            </Badge>
          </div>

          {/* Current Plan */}
          <div className="bg-[#F4F8FC] rounded-lg p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Current Plan
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Plan:</span>
                <span className="text-sm font-medium text-gray-900">
                  {paymentData?.plan || "Business"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Billing Cycle:</span>
                <span className="text-sm font-medium text-gray-900">
                  {paymentData?.billingCycle || "Yearly"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Next Renewal:</span>
                <span className="text-sm font-medium text-gray-900">
                  {paymentData?.nextRenewal
                    ? new Date(paymentData.nextRenewal).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-[#F4F8FC] rounded-lg p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Account Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Trial Period:</span>
                <span className="text-sm font-medium text-gray-900">
                  {paymentData?.trialCompleted ? "Completed" : "Active"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Trial Duration:</span>
                <span className="text-sm font-medium text-gray-900">
                  {paymentData?.trialDays || 0} Day
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Joined:</span>
                <span className="text-sm font-medium text-gray-900">
                  {paymentData?.joinedDate
                    ? new Date(paymentData.joinedDate).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
