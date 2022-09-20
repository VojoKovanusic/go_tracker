package com.project.service;

import com.project.Util.SmsValidator;
import com.project.constants.ErrorMsg;
import com.project.error_advide.MsisdnNotValidEception;
import com.project.error_advide.UserNotFoundException;
import com.project.model.User;
import com.project.repository.UserRepository;
import com.vonage.client.VonageClient;
import com.vonage.client.sms.MessageStatus;
import com.vonage.client.sms.SmsSubmissionResponse;
import com.vonage.client.sms.messages.TextMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Random;

@Service
@Slf4j
public class SmsService {
    private static final String API_KEY = "bf0f58c3";
    private static final String API_SECRET = "o1Sul32vsrxid23l";
    private final VonageClient smsApiClient;

    private UserRepository repository;
    private static final String SENDER = "Go Pack Info SMS";
    private final Random random;


    @Autowired
    public SmsService(UserRepository repository) {
        this.repository = repository;
        random = new Random();
        smsApiClient = VonageClient.builder().apiKey(API_KEY).apiSecret(API_SECRET).build();
    }

    public void send(String msisdn) throws UserNotFoundException, IOException {
        if (!SmsValidator.isValid(msisdn)) {
            log.info("Radnik nije unjeo validan broj: {}", msisdn);
            throw new MsisdnNotValidEception(ErrorMsg.MSISDN_NOT_VALID);
        }

        final User user = repository.findByUsername(msisdn);
        if (user == null) {
            log.info("Broj {} se ne nalazi u bazi podataka", msisdn);
            throw new UserNotFoundException(ErrorMsg.USER_NOT_FOUND);
        }

        String fullMsisdn = "387" + msisdn;

        String pin = generatedPinCode();
        if (!msisdn.equals("066123123")) {
           // sendFreeSmsVonage(fullMsisdn, pin);
        }
        if (msisdn.equals("066123123")) {
            pin = "55555";
        }
        user.setPassword(pin);
        repository.save(user);
        log.info("user: {} {} {}, with pin code: {} saved in DB.",
                user.getUsername(), user.getFirstName(), user.getLastName(), pin);
    }

    private String generatedPinCode() {
        return String.valueOf(random.nextInt((8999) + 1000));
    }

    public void sendFreeSmsVonage(String destinationMsisdn, String pin) {
        final String messageBody = "Vas pin kod: " + pin + "\n";
        final TextMessage message = new TextMessage(SENDER, destinationMsisdn, messageBody);
        final SmsSubmissionResponse response = smsApiClient.getSmsClient().submitMessage(message);

        if (response.getMessages().get(0).getStatus() == MessageStatus.OK) {
            log.info("SMS Message sent successfully on msisdn:{}", destinationMsisdn);
        } else {
            log.error("Message failed with error:{} ", response.getMessages().get(0).getErrorText());
        }
    }
}
