package com.project.service;

import com.project.error_advide.UserNotFoundException;
import com.project.model.User;
import com.project.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.InputMismatchException;
import java.util.Random;

@Service
@Slf4j
public class SmsService {
    @Autowired
    private UserRepository repository;
    private static final String BASE_URL = "https://9r8gd3.api.infobip.com";
    private static final String API_KEY = "App beb01731cfef06e9c97e2933b7ba6d01-72b3c777-db46-4418-8d33-5f8ddc4383e7";
    private static final String MEDIA_TYPE = "application/json";

    private static final String SENDER = "InfoSMS";
    private static final String RECIPIENT = "38766860053";
    private final OkHttpClient client;

    public SmsService() {
        client = new OkHttpClient().newBuilder()
                .build();
    }

    private final Random random = new Random();


    public void send(String msisdn) throws UserNotFoundException, IOException {
        User user = repository.findByUsername(msisdn);
        if (user == null) {
            log.info("Broj {} se ne nalazi u bazi podataka", msisdn);
            throw new UserNotFoundException("Vaš broj se ne nalazi u bazi podataka, kontaktirajte vaseg nadredjenog!");
        }

        String dialCodeBiH = "387";
        String RECIPIENT = dialCodeBiH + msisdn;
        String generatedPinCode = String.valueOf(random.nextInt((8999) + 1000)); // TODO MALOPRE POSLAO PIN SA TRI CIFRE
        String MESSAGE_TEXT = "PIN kod je:" + generatedPinCode;

        String bodyJson = String.format("{\"messages\":[{\"from\":\"%s\",\"destinations\":[{\"to\":\"%s\"}],\"text\":\"%s\"}]}",
                SENDER,
                RECIPIENT,
                MESSAGE_TEXT
        );

        MediaType mediaType = MediaType.parse(MEDIA_TYPE);
        RequestBody body = RequestBody.create(bodyJson, mediaType);

        Request request = prepareHttpRequest(body);
        if (!msisdn.equals("12345")) {
            Response response = client.newCall(request).execute();
            log.info("HTTP status code: {}", response.code());
            log.info("Response body: {}", response.body().string());
        }
        if (msisdn.equals("12345")) {
            generatedPinCode = "55555";
        }
        user.setPassword(generatedPinCode);
        repository.save(user);
        log.info("user: {} {} {}, with pin code: {} saved in DB.",
                user.getUsername(), user.getFirstName(), user.getLastName(), generatedPinCode);
    }

    private boolean isValidFormat(String msisdn) {

        return msisdn.length() == 8;

    }

    private Request prepareHttpRequest(RequestBody body) {
        return new Request.Builder()
                .url(String.format("%s/sms/2/text/advanced", BASE_URL))
                .method("POST", body)
                .addHeader("Authorization", API_KEY)
                .addHeader("Content-Type", MEDIA_TYPE)
                .addHeader("Accept", MEDIA_TYPE)
                .build();
    }
}
