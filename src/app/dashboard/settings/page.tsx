"use client";
import React from 'react';
import { ArrowLeft, ChevronRight, LogOut } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import AuthService from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import ConfirmDialog from '@/common/components/ConfirmModal';
import toast from 'react-hot-toast';

const Settings = () => {
  const router = useRouter();
  const [signOutShowModal, setSignOutShowModal] = React.useState(false);
  const { mutateAsync: signOut } = useMutation({
    mutationFn: AuthService.signOut,
    onSuccess: () => {
      router.replace('/auth');
    },
  });
  return (
    <>
    <ConfirmDialog  
      isOpen={signOutShowModal}
      onClose={() => setSignOutShowModal(false)}
      onConfirm={() => {
        toast.promise(
          signOut(),
          {
            loading: 'loading...',
            success: 'Sign out berhasil',
            error: 'Sign out gagal',  
          }
        )
      }}
      title="Sign Out"
      description="Apakah Anda yakin ingin keluar dari akun Anda?"
      confirmText="Sign Out"
      cancelText="Cancel"
      className="bg-red-500 text-white hover:bg-red-600"
    />
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6 space-y-5">
        {/* Profile Section */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
              67
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg">Six Seven</p>
              <p className="text-gray-500">sixseven@yopmail.com</p>
            </div>
          </div>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition">
            <div className="flex items-center gap-3">
              <span className="font-medium">Edit Profile</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Notification Section */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base font-semibold">🔔 Notification</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-base">Stock Alerts</p>
                <p className="text-sm text-gray-500">Get notified about low stock levels</p>
              </div>
              <label className="relative inline-block w-14 h-7">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-7 peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-base">Restock Recommendations</p>
                <p className="text-sm text-gray-500">Receive smart restock suggestion</p>
              </div>
              <label className="relative inline-block w-14 h-7">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-7 peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-base">Weekly Report</p>
                <p className="text-sm text-gray-500">Receive a your inventory performance</p>
              </div>
              <label className="relative inline-block w-14 h-7">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-7 peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-base">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <label className="relative inline-block w-14 h-7">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-7 peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5  after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Help & Support Section */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base font-semibold">📖 Help & Support</span>
          </div>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition">
            <span className="font-medium">Help Center</span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition">
            <span className="font-medium">Contact Support</span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition">
            <span className="font-medium">Tutorial Videos</span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Legal Section */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base font-semibold">📋 Legal</span>
          </div>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition">
            <span className="font-medium">Terms of Service</span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition">
            <span className="font-medium">Privacy Policy</span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Sign Out Button */}
        <button onClick={() => setSignOutShowModal(true)} className="w-full bg-red-50 text-red-500 py-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-base hover:bg-red-100 transition">
          <LogOut size={20} />
          Sign Out
        </button>

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-sm text-gray-500">Invento v1.0.0</p>
          <p className="text-sm text-gray-400">© 2025 Invento. All rights reserved.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Settings;