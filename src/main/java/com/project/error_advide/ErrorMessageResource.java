package com.project.error_advide;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Used to present error message.
 */
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class ErrorMessageResource {

    /**
     * Message describing error.
     */
    private String message;
}

