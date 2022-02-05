import { IsString, IsDateString } from "class-validator";
import { JsonController, Post, Body } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import moment from "moment-timezone";

interface IConvertTimeRequest {
  isoDateTimeString: string;
  timeZone: string;
}

class ConvertTimeRequest implements IConvertTimeRequest {
  @IsDateString()
  public isoDateTimeString: string;

  @IsString()
  timeZone: string;
}

@JsonController("/api/date-time-conversion")
export default class TimeCoversion {
  @OpenAPI({
    description: "Converts UTC strings to a time for a given time zone.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ConvertTimeRequest",
          },
        },
      },
    },
  })
  @Post("")
  async ConvertTime(@Body({ required: true }) payload: ConvertTimeRequest) {
    const currentMoment = moment(payload.isoDateTimeString, moment.ISO_8601);
    const covertedMoment = currentMoment.tz(payload.timeZone);

    return {
      ...payload,
      convertedTime: covertedMoment.format(),
    };
  }
}
