package mk.ukim.finki.vbs.web.repository;

import mk.ukim.finki.vbs.web.model.Member;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.Optional;

public interface MemberRepository extends Neo4jRepository<Member, String> {
    Optional<Member> findByUsername(String username);
    Optional<Member> findByEmail(String email);
}
