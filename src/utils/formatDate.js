const formatMessageDate = (createdAt) => {
  const dateTime = new Date(createdAt);
  const formattedTime = dateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${formattedTime}`;
};

export default formatMessageDate;
