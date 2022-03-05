package mk.ukim.finki.vbs.web.service;

import mk.ukim.finki.vbs.web.model.Member;
import mk.ukim.finki.vbs.web.model.exceptions.InvalidArgumentsException;
import mk.ukim.finki.vbs.web.model.exceptions.InvalidUserCredentialsException;
import mk.ukim.finki.vbs.web.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService{

    private final MemberRepository memberRepo;
    private final PasswordEncoder passwordEncoder;


    public AuthService(MemberRepository memberRepo, PasswordEncoder passwordEncoder) {
        this.memberRepo = memberRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public Member login(String username, String password) {
        if (username==null || username.isEmpty() || password==null || password.isEmpty()) {
            throw new InvalidArgumentsException();
        }
        Member member = memberRepo.findByUsername(username).get();
        if(member != null) {
            if(passwordEncoder.matches(password, member.getPassword())) {
                return member;
            }
            throw new InvalidUserCredentialsException();
        }
        throw new InvalidUserCredentialsException();
    }

}