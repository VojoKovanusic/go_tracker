package com.project.util;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class Email {

    @Autowired
    private JavaMailSender emailSender;

    public void sentDailyCheckoutReport(String clients) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("Lista osoba koje se nisu odjavile dana: " + UtilDate.today());
        message.setText("Lista odoba: " + clients +
				"\nAutomatski je podeseno njihovo odjavljivanje, podeseno provedeno radno vrjeme na poslu je 8h" +
				"\nZa dodatnu provjeru obratite se rukovodiocu smjene." +
                "\nSvako dobro, vas rcteslic");
        message.setTo("leptiri.test@gmail.com");
        message.setTo("rcteslic@gmail.com");
        message.setFrom("leptiri.test@gmail.com");
        emailSender.send(message);
        log.info("Email sent....");
    }

    /*
    void forRegistration(User user) {
		SimpleMailMessage message = new SimpleMailMessage();

		message.setSubject("Podatci za logovanje na sajtu Lepidoptera");
		message.setText("Vas email  :" + user.getEmail() + "\r\nVas password: "
				+ "\r\nLink : http://localhost:4200/login");
		message.setSubject("Youtr data for loging");
		message.setText("Login email :" + user.getEmail() + "\r\nLogin password: "
				+ user.getPassword() + "\r\nLink for web site : http://localhost:4200/login");
		message.setTo(user.getEmail());
		message.setFrom("leptiri.test@gmail.com");
		emailSender.send(message);
	}
	*/
}
