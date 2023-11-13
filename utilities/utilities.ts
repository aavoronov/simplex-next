import axios from "axios";
import { getCookie } from "cookies-next";

export type SetState<T> = (value: T | ((value: T) => T)) => void;
export type valueOf<T> = T[keyof T];
export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
export type Not<T extends boolean> = T extends true ? false : true;

export const sumToLocale = (number: number) => {
  let res = new Intl.NumberFormat("ru-RU").format(number);
  return res;
};

export const getPreciseAverage = (avg: string | number) => {
  const maybeParseFloat = (avg: string | number) => {
    if (!avg) return 0;
    if (typeof avg === "string") return parseFloat(avg);
    return avg;
  };
  return maybeParseFloat(avg).toPrecision(2);
};

export const notImplemented = () => {
  throw new Error("Not implemented. Please report");
};

export const currentDatetime = (date: string | Date) => {
  const datetime = typeof date === "object" ? date : new Date(Date.parse(date));

  return (
    datetime.getDate().toString().padStart(2, "0") +
    "." +
    (datetime.getMonth() + 1).toString().padStart(2, "0") +
    "." +
    datetime.getFullYear().toString().slice(2) +
    " " +
    datetime.getHours().toString().padStart(2, "0") +
    ":" +
    datetime.getMinutes().toString().padStart(2, "0")
  );
};

export const getHumanReadableDate = (date: string | Date) => {
  const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  const datetime = typeof date === "object" ? date : new Date(Date.parse(date));

  return datetime.getDate() + " " + monthNames[datetime.getMonth()];
};

export const getHumanReadableDateCompare = (datePrev: string | Date, date: string | Date) => {
  const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  const datetimePrev = typeof datePrev === "object" ? datePrev : new Date(Date.parse(datePrev));
  const datetime = typeof date === "object" ? date : new Date(Date.parse(date));

  return datetimePrev.getDate() === datetime.getDate() && datetimePrev.getMonth() === datetime.getMonth()
    ? ""
    : datetime.getDate() + " " + monthNames[datetime.getMonth()];
};

export const getPrettyAge = (date: Date | string) => {
  const getAge = (date: Date | string) => {
    const creationTime = typeof date === "object" ? date : new Date(Date.parse(date));
    const today = new Date();

    const isLeapYear = (today: Date) => {
      const year = today.getFullYear();
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    };

    const getDaysInMonth = (today: Date) => {
      const previousMonth = today.getMonth() - 1;
      const daysInMonths = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if (previousMonth === -1) {
        return daysInMonths[11];
      }
      if (previousMonth === 1) {
        return isLeapYear(today) ? daysInMonths[1][1] : daysInMonths[1][0];
      }
      return daysInMonths[previousMonth];
    };

    let days = today.getDate() - creationTime.getDate();
    let months = today.getMonth() - creationTime.getMonth();
    let years = today.getFullYear() - creationTime.getFullYear();
    if (months < 0 || (months === 0 && today.getDate() < creationTime.getDate())) {
      years--;
      months = 12 + months;
    }

    if (days < 0) {
      days = getDaysInMonth(today) + days;
      months--;
    }

    return { days, months, years };
  };

  const { days, months, years } = getAge(date);

  if (days < 16 && months === 0 && years === 0) {
    const root = "дн";
    const suffix = days < 5 ? "я" : "ей";

    return days === 0 || days === 1 ? "1 день" : `${days} ${root}${suffix}`;
  }

  if (months === 0 && years === 0) {
    return "менее месяца";
  }

  if (years === 0) {
    const root = "месяц";
    const suffix = months < 5 ? "а" : "ев";

    return `${months} ${root}${months > 1 ? suffix : ""}`;
  }

  const yearsWord = (years) => {
    const lastTwoDigits = years % 100;
    if (lastTwoDigits % 10 === 1 && Math.floor(lastTwoDigits / 10) !== 1) return "год";
    if (lastTwoDigits % 10 < 5 && Math.floor(lastTwoDigits / 10) !== 1) return "года";
    return "лет";
  };

  return `${years} ${yearsWord(years)}`;
};

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface AxiosConfigProps {
  url: string;
  payload?: {};
  noAuth?: boolean;
  method?: HttpMethod;
  onError?: (e: Error) => void;
}

interface AxiosConfigInstanceParams {
  url: string;
  payload?: {};
  authorization?: string;
  method?: HttpMethod;
}

// export const axiosConfig = async ({ url, payload, noAuth, method }: AxiosConfigProps) => {
//   return {
//     url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
//     data: payload,
//     method: method || "get",
//     headers: {
//       Authorization: !noAuth ? getCookie("simple-token") : void 0,
//       "Content-Type": payload instanceof FormData ? "multipart/form-data" : "application/json",
//     },
//   };
// };

export class AxiosConfig {
  static async createAsync({ method = "get", url, noAuth = false, payload }: AxiosConfigProps) {
    const authorization = !noAuth ? await getCookie("simple-token") : void 0;
    return new AxiosConfig({ url, payload, authorization, method });
  }

  static createSync({ method = "get", url, noAuth = false, payload }: AxiosConfigProps) {
    const authorization = !noAuth ? getCookie("simple-token") : void 0;
    return new AxiosConfig({ url, payload, authorization, method });
  }

  constructor({ url, payload, authorization, method }: AxiosConfigInstanceParams) {
    this.url = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
    this.data = payload;
    this.method = method;
    this.headers = {
      Authorization: authorization,
      ["Content-Type"]: payload instanceof FormData ? "multipart/form-data" : "application/json",
    };
  }

  method: HttpMethod = "get";
  url: string;
  data?: {};
  headers: {
    Authorization?: string;
    "Content-Type": string;
  };
}

export const axiosQuery = async ({ method, url, noAuth, payload, onError }: AxiosConfigProps) => {
  try {
    const res = await axios(AxiosConfig.createSync({ method, url, noAuth, payload }));
    return res;
  } catch (e) {
    console.log("e", e.response.data.message);
    onError && onError(e);
    throw new Error(e.response.data.message);
  }
};

export class GetRequestParams {
  constructor() {}
  addParam(key: string, value: string) {
    this[key] = value;
  }
  addParamsFromObject(obj: Record<string, any>) {
    const objArray = Object.entries(obj);
    objArray.forEach((entry) => (this[entry[0]] = entry[1]));
  }
  serialize() {
    const params = new URLSearchParams(this as unknown as Record<string, string>);
    return params.toString();
  }
}
