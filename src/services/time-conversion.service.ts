import moment from "moment-timezone";
import { IsString, IsDateString } from "class-validator";

export interface IConvertTimeRequest {
  isoDateTimeString: string;
  timeZone: string;
}

export interface IConvertTimeRequestResult extends IConvertTimeRequest {
  convertedTime: string;
}

export class ConvertTimeRequest implements IConvertTimeRequest {
  @IsDateString()
  public isoDateTimeString: string;

  @IsString()
  timeZone: string;
}

export class TimeConversionService {
  ConvertUtcStringToTimeZone(
    payload: IConvertTimeRequest
  ): IConvertTimeRequestResult {
    const currentMoment = moment(payload.isoDateTimeString, moment.ISO_8601);
    const covertedMoment = currentMoment.tz(payload.timeZone);

    return {
      ...payload,
      convertedTime: covertedMoment.format(),
    };
  }
}
