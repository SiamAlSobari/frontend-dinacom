"use client";

import { useUser } from "@/common/stores/user";
import BillingService from "@/services/BillingService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/common/shadcn-ui/dialog";
import { Button } from "@/common/shadcn-ui/button";
import { useRouter } from "next/navigation";

export const PRICE_MAP = {
  MONTHLY_1: 100_000,
  MONTHLY_2: 180_000,
  MONTHLY_3: 250_000,
  YEARLY_1: 900_000,
} as const;

const plans = [
  {
    id: "MONTHLY_1",
    name: "Starter",
    price: PRICE_MAP.MONTHLY_1,
    period: "bulan",
    features: [
      "POS & Inventory Dasar",
      "Laporan Penjualan Mingguan",
      "1 User Admin",
      "Support via Chat",
    ],
  },
  {
    id: "MONTHLY_2",
    name: "Professional",
    price: PRICE_MAP.MONTHLY_2,
    period: "bulan",
    popular: true,
    features: [
      "POS Lengkap + Inventory",
      "Laporan Penjualan & Analitik",
      "Hingga 5 User Admin",
      "Support Prioritas",
      "Integrasi Payment Gateway",
    ],
  },
  {
    id: "MONTHLY_3",
    name: "Enterprise",
    price: PRICE_MAP.MONTHLY_3,
    period: "bulan",
    features: [
      "POS Multi-Outlet",
      "Laporan & Analitik Lengkap",
      "User Admin Tak Terbatas",
      "Support 24/7",
      "Integrasi API & Custom Feature",
      "Keamanan & Backup Otomatis",
    ],
  },
  {
    id: "YEARLY_1",
    name: "Professional",
    price: PRICE_MAP.YEARLY_1,
    period: "tahun",
    save: true,
    features: [
      "POS Lengkap + Inventory",
      "Laporan Penjualan & Analitik",
      "Hingga 5 User Admin",
      "Support Prioritas",
      "Integrasi Payment Gateway",
    ],
  },
];

export default function BillingPage() {
  const router = useRouter();
  const user = useUser();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate: midtransWebhook } = useMutation({
    mutationFn: BillingService.midtransWebhook,
  });

  const { mutate: subscribe } = useMutation({
    mutationFn: BillingService.subscribe,
    onSuccess: (response) => {
      if (response.data) {
        window.snap.pay(response.data.snap_token, {
          onSuccess: (result: any) => {
            midtransWebhook({
              fraud_status: result.fraud_status,
              gross_amount: result.gross_amount,
              order_id: result.order_id,
              payment_type: result.payment_type,
              status_code: result.status_code,
              transaction_status: result.transaction_status,
            });
          },
        });
      }
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredPlans = plans.filter((plan) =>
    billingPeriod === "monthly"
      ? plan.period === "bulan"
      : plan.period === "tahun",
  );

  const handleSubscribe = () => {
    if (!selectedPlan) return;
    subscribe(selectedPlan);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {user !== null ? (
        <Button
          onClick={() => router.push("/dashboard")}
          className="absolute bg-blue-700 hover:bg-blue-600 text-white top-4 right-4">Dashboard</Button>
      ) : (
        <Button
          onClick={() => router.push("/")}
          className="absolute bg-blue-700 hover:bg-blue-600 text-white top-4 right-4">Kembali</Button>
      )}
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pilih Paket Subscription
          </h1>
          <p className="text-lg text-gray-600">
            Pilih paket yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        {/* TOGGLE */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${billingPeriod === "monthly"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Bulanan
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${billingPeriod === "yearly"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Tahunan
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                Hemat 25%
              </span>
            </button>
          </div>
        </div>

        {/* PRICING */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all hover:shadow-lg flex flex-col h-full ${plan.popular ? "border-blue-600" : "border-gray-200"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Paling Populer
                  </span>
                </div>
              )}

              <div className="p-8 flex flex-col h-full">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(plan.price)}
                    </span>
                    <span className="text-gray-600 ml-2">/ {plan.period}</span>
                  </div>
                </div>

                {/* FEATURES */}
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* BUTTON */}
                <Dialog
                  open={isDialogOpen && selectedPlan === plan.id}
                  onOpenChange={setIsDialogOpen}
                >
                  <DialogTrigger asChild>
                    <button
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${plan.popular
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                        }`}
                    >
                      Pilih Paket
                    </button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-100">
                    {user ? (
                      <>
                        {/* ✅ SUDAH LOGIN */}
                        <DialogHeader>
                          <DialogTitle>Konfirmasi Pembelian</DialogTitle>
                        </DialogHeader>

                        <p className="mb-4">
                          Apakah Anda yakin ingin berlangganan paket{" "}
                          <strong>{plan.name}</strong> seharga{" "}
                          <strong>{formatPrice(plan.price)}</strong>?
                        </p>

                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Batal
                          </Button>
                          <Button
                            className="bg-blue-600 hover:bg-blue-500"
                            onClick={handleSubscribe}
                          >
                            Ya, Lanjutkan
                          </Button>
                        </DialogFooter>
                      </>
                    ) : (
                      <>
                        {/* ❌ BELUM LOGIN */}
                        <DialogHeader>
                          <DialogTitle>Login Diperlukan</DialogTitle>
                        </DialogHeader>

                        <p className="mb-4 text-gray-600">
                          Anda harus login terlebih dahulu sebelum berlangganan paket.
                        </p>

                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Batal
                          </Button>
                          <Button
                            className="bg-blue-600 hover:bg-blue-500"
                            onClick={() => {
                              setIsDialogOpen(false);
                              window.location.href = "/login"; // 👉 ganti kalau route login beda
                            }}
                          >
                            Login Sekarang
                          </Button>
                        </DialogFooter>
                      </>
                    )}
                  </DialogContent>
                </Dialog>

              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            Semua paket termasuk update gratis dan dapat dibatalkan kapan saja
          </p>
        </div>
      </div>
    </div>
  );
}
