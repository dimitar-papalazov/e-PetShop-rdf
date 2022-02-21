package mk.ukim.finki.wp.project.epetshop.demo.service;

import mk.ukim.finki.wp.project.epetshop.demo.model.Member;

public interface EmailService {
    public void sendVerificationEmail(String to, Integer code);
    public void sendTrackingNumberUpdateEmail(Long id,Member member,
                                              Integer code);
}
