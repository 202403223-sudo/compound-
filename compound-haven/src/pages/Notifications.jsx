
import { useState } from "react";
import {
  Bell,
  CreditCard,
  CalendarDays,
  CarFront,
  ShieldCheck,
  Megaphone,
  CheckCheck,
} from "lucide-react";

import notificationsData from "../data/notifications";

const iconMap = {
  payment: CreditCard,
  facility: CalendarDays,
  parking: CarFront,
  security: ShieldCheck,
  community: Megaphone,
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(
    notificationsData
  );

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const markAllRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f5ef]">
      
      {/* HEADER */}
      <section className="bg-[#e9e0d4] px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#a48664]">
                Resident Center
              </p>

              <h1 className="serif text-4xl text-[#44372c] md:text-5xl">
                Notifications
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#7c7167]">
                Stay updated with payments, reservations, parking,
                security, and community announcements.
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="secondary-btn inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
              >
                <CheckCheck size={17} />
                Mark all as read
              </button>
            )}
          </div>
        </div>
      </section>

      {/* NOTIFICATIONS */}
      <section className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
        
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6d5945] text-white">
            <Bell size={20} />
          </div>

          <div>
            <p className="font-semibold text-[#44372c]">
              Your updates
            </p>

            <p className="text-sm text-[#8a7c6d]">
              {unreadCount} unread notification
              {unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon = iconMap[notification.type] || Bell;

            return (
              <article
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`cursor-pointer rounded-3xl border p-5 transition duration-300 hover:-translate-y-0.5 ${
                  notification.read
                    ? "border-[#e8dfd3] bg-white"
                    : "border-[#d9c5aa] bg-[#fffdf9] shadow-[0_12px_35px_rgba(77,61,45,0.08)]"
                }`}
              >
                <div className="flex gap-4">
                  
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                      notification.read
                        ? "bg-[#eee7dc] text-[#7d6955]"
                        : "bg-[#6d5945] text-white"
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row">
                      
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-[#44372c]">
                          {notification.title}
                        </h2>

                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-[#a48664]" />
                        )}
                      </div>

                      <span className="text-xs text-[#9a8b7c]">
                        {notification.time}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-[#7c7167]">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

