package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.LogDAO;
import com.nutresa.exemplary_provider.dtl.LogDTO;
import com.nutresa.exemplary_provider.dtl.LogDTO.ErrorType;
import com.nutresa.exemplary_provider.utils.Common;

public class LogBLO extends GenericBLO<LogDTO, LogDAO> {

    public LogBLO() {
        super(LogDAO.class);
    }

    public static void log(String message) {
        log(null, null, message, null);
    }

    public static void log(Exception exception) {
        log(ErrorType.ERROR, null, null, exception);
    }

    public static void log(ErrorType type, String message) {
        log(type, null, message, null);
    }

    public static void log(String message, Exception exception) {
        log(ErrorType.ERROR, null, message, exception);
    }

    public static void log(ErrorType type, String entity, String message) {
        log(type, entity, message, null);
    }

    public static void logError(String entity, String message, Exception exception) {
        log(ErrorType.ERROR, entity, message, exception);
    }

    public static void logWarning(String entity, String message, Exception exception) {
        log(ErrorType.WARNING, entity, message, exception);
    }

    public static void logInfo(String entity, String message, Exception exception) {
        log(ErrorType.INFORMATION, entity, message, exception);
    }

    public static void logDebug(String entity, String message, Exception exception) {
        log(ErrorType.DEBUG, entity, message, exception);
    }

    public static void log(ErrorType type, String entity, String message, Exception exceptionLog) {
        try {
            String exceptionMessage = Common.getExceptionMessage(exceptionLog);
            if (null != message && !message.isEmpty()) {
                if (!exceptionMessage.isEmpty()) {
                    message += ", Exception: " + exceptionMessage;
                }
            } else {
                message = exceptionMessage;
            }

            // Este fragmento fue comentado porque se tomó la decisión de usar
            // FTSearch

            // LogDTO log = new LogDTO(type, entity, message, exceptionLog);
            // LogDAO logDAO = new LogDAO();
            // logDAO.save(log);
        } catch (Exception exception) {
            Common.logError("Error saving to log ", exception);
        }
    }

}
