import { ValidationError } from "class-validator";
import { ErrorResponseInterface } from "../error-response.interface";
import { I18nContext, I18nService } from "nestjs-i18n";
import { ArgumentsHost } from "@nestjs/common";

export function formatInputValidationError(
  errors: ValidationError[],
  i18nService: I18nService,
  host: ArgumentsHost
): ErrorResponseInterface[] {

  const lang = I18nContext.current(host)?.lang;

  return errors
    .map((error: ValidationError) => {

      const messages: string[] = Object.values(
        error.constraints ?? {}
      );

      return messages.map(
        (message: string): ErrorResponseInterface => {

          const translationKey = message;

          let translatedMessage: string;

          try {
            translatedMessage = i18nService.t(
              translationKey,
              { lang }
            ) as string;

          } catch (e) {
            translatedMessage = message;
          }

          return {
            message: translatedMessage,
            field: error.property,
          };
        }
      );
    })
    .flat();
}