package mk.ukim.finki.vbs.web.service;

import mk.ukim.finki.vbs.web.model.Member;
import mk.ukim.finki.vbs.web.model.enumerations.MemberRole;
import mk.ukim.finki.vbs.web.model.exceptions.EmailAlreadyExistsException;
import mk.ukim.finki.vbs.web.model.exceptions.InvalidUsernameOrPasswordException;
import mk.ukim.finki.vbs.web.model.exceptions.PasswordsDoNotMatchException;
import mk.ukim.finki.vbs.web.model.exceptions.UsernameAlreadyExistsException;
import mk.ukim.finki.vbs.web.repository.MemberRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    private final MemberRepository memberRepo;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepo, PasswordEncoder passwordEncoder) {
        this.memberRepo = memberRepo;
        this.passwordEncoder = passwordEncoder;
    }


    public Member register(String username, String email, String password, String repeat, String firstName, String lastName, MemberRole role) {
        if (username==null || username.isEmpty()  || password==null || password.isEmpty())
            throw new InvalidUsernameOrPasswordException();
        if (!password.equals(repeat))
            throw new PasswordsDoNotMatchException();
        if(this.memberRepo.findByUsername(username).isPresent())
            return this.memberRepo.findByUsername(username).get();
        if(this.memberRepo.findByEmail(email).isPresent())
            return this.memberRepo.findByEmail(email).get();
        Member member = new Member(username, email,
                passwordEncoder.encode(password), firstName, lastName, role);
        return memberRepo.save(member);
    }


    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return memberRepo.findByUsername(s).orElseThrow(()->new UsernameNotFoundException(s));
    }

}
