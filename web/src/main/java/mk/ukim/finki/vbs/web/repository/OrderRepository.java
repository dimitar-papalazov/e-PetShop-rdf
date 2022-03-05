package mk.ukim.finki.vbs.web.repository;

import mk.ukim.finki.vbs.web.model.Order;
import mk.ukim.finki.vbs.web.model.Product;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.List;

public interface OrderRepository extends Neo4jRepository<Order, Long> {
    List<Order> findAllByMember_Username(String username);
}
