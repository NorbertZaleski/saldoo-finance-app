const getDay = (date) => date.slice(0, 10);

export const sortTransactionsByDateDesc = (transactions) =>
  [...transactions].sort((a, b) => b.date.localeCompare(a.date));

export const groupTransactionsByDay = (transactions) => {
  const groups = sortTransactionsByDateDesc(transactions).reduce((acc, t) => {
    const day = getDay(t.date);
    (acc[day] ||= []).push(t);
    return acc;
  }, {});

  return Object.entries(groups);
};