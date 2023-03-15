import { environment } from '../../../environments/environment';
import { Constant } from '../constants/Constant';
import { RegistroEstado } from '../interfaces';

export class Util {
  static formatDateToHour(date): string {
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    if (hours.length == 1) {
      hours = `0${hours}`;
    }
    if (minutes.length == 1) {
      minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
  }

  static isInvalidRangeHour(start: Date, end: Date): boolean {
    if (start && end) {
      if (start.getTime() >= end.getTime()) {
        return true;
      }
      return false;
    }
    return false;
  }

  static formatHourToDate(hour): Date {
    let date = new Date();
    date.setHours(parseInt(hour.slice(0, 2)));
    date.setMinutes(parseInt(hour.slice(3, 5)));
    return date;
  }

  static getRestDaysOfWeek(registrohistorialusuarios: RegistroEstado, dayOfWeek: number) {
    const newDate = new Date();
    const date =
      registrohistorialusuarios == undefined
        ? new Date(newDate.setDate(newDate.getDate()))
        : registrohistorialusuarios.date;

    let listRestOfDays: any[] = [];
    for (let i = 0; i < Constant.TOTAL_DAY_OF_WEEK - dayOfWeek; i++) {
      const result = new Date(date);
      listRestOfDays.push(
        new Date(result.setDate(result.getDate() + i + 1)).toLocaleString('en-US', {
          timeZone: environment.TIME_ZONE,
        }),
      );
    }
    return listRestOfDays;
  }

  static currentSeconds(): number {
    const now = new Date();
    return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  }


  static totalSecondsOfSchedule(exitHour: string): number ;
  static totalSecondsOfSchedule(exitHour: string, entryHour: string): number ;
  static totalSecondsOfSchedule(exitHour: string, entryHour: string, pauseTime: string): number ;

  static totalSecondsOfSchedule(exitHour: string, entryHour?: string, pauseTime?: string): number {

    const hoursToSecondsExitHour = parseInt(exitHour.slice(0, 2)) * 60 * 60;
    const minutesToSecondsExitHour = parseInt(exitHour.slice(3, 5)) * 60;
    let total = hoursToSecondsExitHour + minutesToSecondsExitHour;
    if (entryHour) {
      const hoursToSecondsEntryHour = parseInt(entryHour.slice(0, 2)) * 60 * 60;
      const minutesToSecondsEntryHour = parseInt(entryHour.slice(3, 5)) * 60;
      total = total - (hoursToSecondsEntryHour + minutesToSecondsEntryHour)
    }
    if (pauseTime) {
      const hoursToSecondsPauseTime = parseInt(pauseTime.slice(0, 2)) * 60 * 60;
      const minutesToSecondsPauseTime = parseInt(pauseTime.slice(3, 5)) * 60;
      total =  total - (hoursToSecondsPauseTime + minutesToSecondsPauseTime)
    }

    return (
      total
    );
  }

  /**
   * Devuelve el tiempo en segundos que llevas en la oficina
   * @param exitHour Hora de entrada
   * @returns
   */
  static passSecondsOfDay(exitHour: string): number {
    const currentSeconds = Util.currentSeconds();

    // const currentSeconds = 32400;
    const hoursToSecondsExitHour = parseInt(exitHour.slice(0, 2)) * 60 * 60;
    const minutesToSecondsExitHour = parseInt(exitHour.slice(3, 5)) * 60;
    return currentSeconds - (hoursToSecondsExitHour + minutesToSecondsExitHour);
  }


  static restSecondsOfDay(exitHour: string): number {
    // const currentSeconds = Util.currentSeconds();
    const currentSeconds = 28800;
    const hoursToSecondsExitHour = parseInt(exitHour.slice(0, 2)) * 60 * 60;
    const minutesToSecondsExitHour = parseInt(exitHour.slice(3, 5)) * 60;
    return hoursToSecondsExitHour + minutesToSecondsExitHour - currentSeconds;
  }

  static currentDayOfWeek(currentDate: string): number {
    const dayOfWeek: number = new Date(currentDate).getDay();
    if (dayOfWeek == 0) {
      return 7;
    }
    return dayOfWeek;
  }
}
