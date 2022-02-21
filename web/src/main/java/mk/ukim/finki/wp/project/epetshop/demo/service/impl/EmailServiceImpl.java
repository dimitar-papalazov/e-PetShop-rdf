package mk.ukim.finki.wp.project.epetshop.demo.service.impl;

import mk.ukim.finki.wp.project.epetshop.demo.model.Member;
import mk.ukim.finki.wp.project.epetshop.demo.service.EmailService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;

    public EmailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendVerificationEmail(String to, Integer code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("verification@epetshop.com");
        message.setTo(to);
        message.setSubject("Верифицирајте го вашиот e-PetShop акаунт");
        message.setText("Ве молиме внесете го следниот код во " +
                "формата за верификацијa: " + code);
        javaMailSender.send(message);
    }

    public void sendTrackingNumberUpdateEmail(Long id,Member member,
                                              Integer code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("admin@epetshop.com");
        message.setTo(member.getEmail());
        message.setSubject("Вашата e-PetShop пратка е испратена");
        message.setText("Почитувани, " + member.getFirstName() + " " + member.getLastName() + ",\n"
        + "Вашата пратка со id: " + id + " е штотуку испратена.\n"
        + "Mожете да ја пратите на веб страната на карго компанијата со " +
                "следниот код: " + code);
        javaMailSender.send(message);
    }
}
