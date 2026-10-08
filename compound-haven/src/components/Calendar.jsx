
import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const createCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month, -i),
      currentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      date: new Date(year, month, day),
      currentMonth: true,
    });
  }

  let nextMonthDay = 1;

  while (days.length < 42) {
    days.push({
      date: new Date(year, month + 1, nextMonthDay),
      currentMonth: false,
    });

    nextMonthDay++;
  }

  return days;
};

export default function Calendar({
  selectedDate,
  onSelectDate,
  bookedDates = [],
}) {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    selectedDate
      ? new Date(`${selectedDate}T00:00:00`).getMonth()
      : today.getMonth()
  );

  const [currentYear, setCurrentYear] = useState(
    selectedDate
      ? new Date(`${selectedDate}T00:00:00`).getFullYear()
      : today.getFullYear()
  );

  const days = useMemo(
    () => createCalendarDays(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const monthTitle = new Date(
    currentYear,
    currentMonth
  ).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const goPrevious = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((year) => year - 1);
    } else {
      setCurrentMonth((month) => month - 1);
    }
  };

  const goNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((year) => year + 1);
    } else {
      setCurrentMonth((month) => month + 1);
    }
  };

  const isToday = (date) => {
    return formatDate(date) === formatDate(today);
  };

  return (
    <div className="w-full rounded-3xl border border-[#e8dfd3] bg-white p-5 shadow-sm dark:border-[#40382f] dark:bg-[#1b1815]">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eee7dc] text-[#80674d] dark:bg-[#30271f] dark:text-[#d8c3aa]">
            <CalendarDays size={20} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#a48664]">
              Booking Calendar
            </p>

            <h3 className="mt-1 text-lg font-semibold text-[#44372c] dark:text-[#f4ede3]">
              {monthTitle}
            </h3>
          </div>
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={goPrevious}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#75695e] transition hover:bg-[#f4eee5] dark:hover:bg-[#30271f]"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#75695e] transition hover:bg-[#f4eee5] dark:hover:bg-[#30271f]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="mb-2 grid grid-cols-7">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-[11px] font-bold uppercase text-[#9a8c7d]"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map(({ date, currentMonth }, index) => {
          const dateKey = formatDate(date);
          const selected = selectedDate === dateKey;
          const booked = bookedDates.includes(dateKey);
          const todayDate = isToday(date);

          return (
            <button
              key={`${dateKey}-${index}`}
              type="button"
              disabled={booked}
              onClick={() => {
                if (!booked) {
                  onSelectDate?.(dateKey);
                }
              }}
              className={`relative flex h-11 items-center justify-center rounded-xl text-sm font-medium transition ${
                !currentMonth
                  ? "text-[#c8bfb5] dark:text-[#514940]"
                  : "text-[#594936] dark:text-[#ded4c7]"
              } ${
                selected
                  ? "bg-[#80674d] text-white"
                  : booked
                    ? "cursor-not-allowed bg-[#eee8dd] text-[#aaa096] line-through dark:bg-[#29231e]"
                    : "hover:bg-[#f4eee5] dark:hover:bg-[#30271f]"
              }`}
            >
              {date.getDate()}

              {todayDate && !selected && !booked && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#80674d]" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-4 border-t border-[#eee8dd] pt-4 text-xs dark:border-[#40382f]">
        <span className="flex items-center gap-2 text-[#7c7167] dark:text-[#a99b8d]">
          <span className="h-2 w-2 rounded-full bg-[#80674d]" />
          Today
        </span>

        <span className="flex items-center gap-2 text-[#7c7167] dark:text-[#a99b8d]">
          <span className="h-3 w-3 rounded bg-[#eee8dd] dark:bg-[#29231e]" />
          Booked
        </span>

        <span className="flex items-center gap-2 text-[#7c7167] dark:text-[#a99b8d]">
          <span className="h-3 w-3 rounded bg-[#80674d]" />
          Selected
        </span>
      </div>
    </div>
  );
}

