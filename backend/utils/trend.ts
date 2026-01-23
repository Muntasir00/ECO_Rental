const trend = (current: number, previous: number) => {
  if (previous === 0) {
    return { percent: 100, direction: 'up' };
  }

  const diff = current - previous;
  const percent = Math.round((diff / previous) * 100);

  return {
    percent: Math.abs(percent),
    direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'same',
  };
};

export { trend };
