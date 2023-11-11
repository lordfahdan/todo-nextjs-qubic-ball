export const dateFormat = (date: string) => {
  const convertDate = new Date(date)
  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let newDate = new Intl.DateTimeFormat("id-ID", options).format(convertDate)

  return newDate
}