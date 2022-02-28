const dateShow = (date) => {
  const editDate = date - 1;

  if (editDate < 1) return "Today";
  if (editDate === 1) {
    return "Yesterday";
  }
  if (editDate <= 30) {
    return editDate + " days ago";
  }
  if (editDate > 30) {
    const month = editDate / 30;
    return month + " month ago";
  }
  if (editDate > 365) {
    const year = editDate / 365;
    return year + " year ago";
  }
};

export default dateShow;
