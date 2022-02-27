package mk.ukim.finki.vbs.web.repository;

import mk.ukim.finki.vbs.web.model.Product;
import mk.ukim.finki.vbs.web.model.enumerations.Type;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.List;

public interface ProductRepository extends Neo4jRepository<Product, Long> {
    List<Product> findAllByTypeLike(Type type);

    void deleteByName(String name);
}
