const CurrentDate = () => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );

  return <div className="text-zinc-100 text-2xl">{formattedDate}</div>;
};

export default CurrentDate;
