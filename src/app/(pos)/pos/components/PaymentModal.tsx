"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/shadcn-ui/dialog"
import TransactionService from "@/services/TransactionService"
import { useMutation } from "@tanstack/react-query"
import { Banknote, QrCode, Check, X, ArrowLeft } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

type PaymentModalProps = {
  isOpen: boolean
  onClose: () => void
  total: number
  onPaymentSuccess: (paymentMethod: "CASH" | "QRIS") => void
}

type PaymentMethod = "cash" | "qris" | null

export function PaymentModal({ isOpen, onClose, total, onPaymentSuccess }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
  const [cashAmount, setCashAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)


  const cashAmountNum = parseFloat(cashAmount) || 0
  const change = cashAmountNum - total


  const quickAmounts = [
    { label: "Uang Pas", value: total },
    { label: "50K", value: 50000 },
    { label: "100K", value: 100000 },
    { label: "200K", value: 200000 },
  ]

  const handlePayment = async () => {
    if (paymentMethod === "cash" && cashAmountNum < total) {
      toast.error("Jumlah uang tidak mencukupi.")

      return
    }

    setIsProcessing(true)

    // Simulate payment processing

    setIsProcessing(false)
    onPaymentSuccess(
      paymentMethod === "cash" ? "CASH" : "QRIS"
    )
    handleClose()
  }

  const handleClose = () => {
    setPaymentMethod(null)
    setCashAmount("")
    setIsProcessing(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {paymentMethod ? (
              <button
                onClick={() => setPaymentMethod(null)}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
              >
                <ArrowLeft size={20} />
                Kembali
              </button>
            ) : (
              "Pilih Metode Pembayaran"
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          {/* Total Amount Display */}
          <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white p-4 rounded-xl mb-4">
            <p className="text-xs opacity-90 mb-1">Total Pembayaran</p>
            <p className="text-2xl font-bold">Rp {total.toLocaleString('id-ID')}</p>
          </div>

          {!paymentMethod ? (
            /* Payment Method Selection */
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod("cash")}
                className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition">
                    <Banknote size={32} className="text-green-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-base text-gray-900 mb-0.5">Cash</h3>
                    <p className="text-xs text-gray-500">Tunai</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod("qris")}
                className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition">
                    <QrCode size={32} className="text-purple-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-base text-gray-900 mb-0.5">QRIS</h3>
                    <p className="text-xs text-gray-500">Scan QR</p>
                  </div>
                </div>
              </button>
            </div>
          ) : paymentMethod === "cash" ? (
            /* Cash Payment */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Uang Diterima
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm">
                    Rp
                  </span>
                  <input
                    type="number"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    placeholder="0"
                    className="w-full pl-10 pr-3 py-3 text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    autoFocus
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount.label}
                    onClick={() => setCashAmount(amount.value.toString())}
                    className="px-3 py-2 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-lg text-sm font-semibold transition"
                  >
                    {amount.label}
                  </button>
                ))}
              </div>

              {/* Change Display */}
              {cashAmountNum > 0 && (
                <div className={`p-3 rounded-xl ${change >= 0 ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
                  }`}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm text-gray-700">Kembalian</span>
                    <span className={`text-xl font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                      Rp {Math.abs(change).toLocaleString('id-ID')}
                    </span>
                  </div>
                  {change < 0 && (
                    <p className="text-xs text-red-600 mt-1">Uang tidak mencukupi!</p>
                  )}
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={cashAmountNum < total || isProcessing}
                className="w-full bg-linear-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Memproses...
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    Proses Pembayaran
                  </>
                )}
              </button>
            </div>
          ) : (
            /* QRIS Payment */
            <div className="space-y-4">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4 flex flex-col items-center">
                <div className="w-48 h-48 bg-white border-4 border-gray-300 rounded-xl flex items-center justify-center mb-3">
                  <div className="text-center">
                    <QrCode size={120} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">QR Code</p>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 mb-1">
                  Scan QR dengan aplikasi pembayaran
                </p>
                <p className="text-xs text-gray-500 text-center">
                  GoPay • OVO • Dana • ShopeePay
                </p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3">
                <p className="text-center text-xs text-blue-800">
                  Menunggu pembayaran...
                </p>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-linear-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-purple-800 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Memverifikasi...
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    Konfirmasi (Demo)
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {paymentMethod && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={18} />
          </button>
        )}
      </DialogContent>
    </Dialog>
  )
}