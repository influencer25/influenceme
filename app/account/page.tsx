"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const [tab, setTab] = useState<"details" | "settings">("settings");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [farewell, setFarewell] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<string | null>(null);
  const router = useRouter();

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch("/api/account/delete", { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setFarewell(data.message || "Your account has been deleted.");
        setTimeout(() => {
          router.push("/");
        }, 3500);
      } else {
        setErrorType(data.error);
        setErrorMsg(data.message || "Failed to delete account.");
      }
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (farewell) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded shadow p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Account Deleted</h2>
          <p className="mb-2">{farewell}</p>
          <p className="text-gray-500 text-sm">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded shadow p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Account Deletion Failed</h2>
          <p className="mb-2">{errorMsg}</p>
          {errorType === 'not_authenticated' || errorType === 'invalid_token' ? (
            <a href="/login" className="text-indigo-600 hover:underline">Log in</a>
          ) : errorType === 'not_found' ? (
            <a href="/" className="text-indigo-600 hover:underline">Go to Home</a>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      <div className="w-full max-w-2xl bg-white rounded shadow p-8">
        <h1 className="text-3xl font-bold mb-6">Account</h1>
        <div className="flex space-x-4 mb-8 border-b pb-2">
          <button
            className={`px-4 py-2 font-semibold rounded-t ${tab === "details" ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:text-indigo-600"}`}
            onClick={() => setTab("details")}
          >
            Details
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded-t ${tab === "settings" ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:text-indigo-600"}`}
            onClick={() => setTab("settings")}
          >
            Settings
          </button>
        </div>
        {tab === "details" && (
          <form className="space-y-6 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="input w-full" placeholder="Email" defaultValue="user@email.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input type="password" className="input w-full" placeholder="Enter Current Password" minLength={6} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" className="input w-full" placeholder="Enter New Password" minLength={6} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input type="password" className="input w-full" placeholder="Confirm New Password" minLength={6} />
            </div>
            <button className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition">Save</button>
          </form>
        )}
        {tab === "settings" && (
          <div className="space-y-8 max-w-md mx-auto">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">SMS Alerts</div>
              <button className="w-full bg-gray-200 text-gray-700 py-2 rounded font-semibold cursor-not-allowed">Enable SMS Alerts</button>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Log Out</div>
              <button className="w-full bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600 transition" onClick={() => { window.location.href = '/logout'; }}>Sign Out</button>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Delete Account</div>
              <button
                className="w-full bg-gray-100 text-red-600 py-2 rounded font-semibold hover:bg-red-100 border border-red-200 transition"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isDeleting}
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded shadow p-8 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-red-600">Delete Account</h2>
            <p className="mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button className="px-4 py-2 rounded bg-gray-200" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>Cancel</button>
              <button className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700" onClick={handleDeleteAccount} disabled={isDeleting}>{isDeleting ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 