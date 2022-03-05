package mk.ukim.finki.vbs.web.web;

import mk.ukim.finki.vbs.web.model.Member;
import mk.ukim.finki.vbs.web.model.enumerations.MemberRole;
import mk.ukim.finki.vbs.web.service.AuthService;
import mk.ukim.finki.vbs.web.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/api/members")
public class MemberRestController {

    private final AuthService authService;
    private final MemberService memberService;

    public MemberRestController(AuthService authService, MemberService memberService) {
        this.authService = authService;
        this.memberService = memberService;
    }

    @PostMapping("/registration")
    public ResponseEntity<Member> registration(@RequestParam String username,
                                               @RequestParam String email,
                                               @RequestParam String password,
                                               @RequestParam String repeat,
                                               @RequestParam String firstName,
                                               @RequestParam String lastName) {
        try {
            Member m = this.memberService.register(username, email, password, repeat,
                    firstName, lastName, MemberRole.ROLE_USER);
            return ResponseEntity.ok().body(m);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/login")
    public Member login(@RequestParam String username, @RequestParam String password){
        return this.authService.login(username, password);
    }

}
