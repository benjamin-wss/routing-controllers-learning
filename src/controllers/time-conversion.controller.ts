import { JsonController, Post, Body } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

import * as Services from "../services";

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
  async ConvertTime(
    @Body({ required: true })
    payload: Services.TimeConversion.ConvertTimeRequest
  ) {
    return new Services.TimeConversion.TimeConversionService().ConvertUtcStringToTimeZone(
      payload
    );
  }
}
