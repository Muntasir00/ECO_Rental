const now = new Date();

const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const startOfWeek = new Date();
startOfWeek.setDate(now.getDate() - 7);

const prevWeekStart = new Date();
prevWeekStart.setDate(now.getDate() - 14);

const prevWeekEnd = startOfWeek;

export { startOfToday, startOfWeek, prevWeekStart, prevWeekEnd };
