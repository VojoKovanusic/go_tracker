package com.project.error_advice;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Controller advice used to handle exceptions.
 */
@RestControllerAdvice
@Slf4j
@AllArgsConstructor
public class ControllerAdvice {
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessageResource handle(final UserNotFoundException exception) {
        log.debug(exception.getMessage(), exception);
        return create(exception.getMessage());
    }

    @ExceptionHandler(MsisdnNotValidEception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessageResource handle(final MsisdnNotValidEception exception) {
        log.debug(exception.getMessage(), exception);
        return create(exception.getMessage());
    }
    private ErrorMessageResource create(final String message) {
        return ErrorMessageResource.builder().message(message).build();
    }
}

