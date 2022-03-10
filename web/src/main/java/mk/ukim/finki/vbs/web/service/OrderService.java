package mk.ukim.finki.vbs.web.service;

import mk.ukim.finki.vbs.web.model.Member;
import mk.ukim.finki.vbs.web.model.Order;
import mk.ukim.finki.vbs.web.model.Product;
import mk.ukim.finki.vbs.web.model.dto.OrderDto;
import mk.ukim.finki.vbs.web.model.exceptions.InvalidOrder;
import mk.ukim.finki.vbs.web.model.exceptions.InvalidUsernameException;
import mk.ukim.finki.vbs.web.repository.MemberRepository;
import mk.ukim.finki.vbs.web.repository.OrderRepository;
import mk.ukim.finki.vbs.web.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepo;
    private final MemberRepository memberRepo;
    private final ProductRepository productRepo;

    public OrderService(OrderRepository orderRepo, MemberRepository memberRepo, ProductRepository productRepo) {
        this.orderRepo = orderRepo;
        this.memberRepo = memberRepo;
        this.productRepo = productRepo;
    }

    public List<Order> findAllOrders() {
        return this.orderRepo.findAll();
    }

    public List<Order> findAllOrdersByMember(String username) {
        return this.orderRepo.findAllByMember_Username(username);
    }


    public Order findOrder(Long id) {
        return this.orderRepo.findById(id).orElseThrow(InvalidOrder::new);
    }

    public Order editTrackingNumber(Long id, Long number) {
        Order o = findOrder(id);
        o.setTrackingNumber(number);
        return this.orderRepo.save(o);
    }

    public Optional<Order> addOrder(OrderDto orderDto) {
        Member member = this.memberRepo.findById(orderDto.getUsername())
                .orElseThrow(() -> new InvalidUsernameException());
        List<Product> products = new ArrayList<>();
        for (Long id: orderDto.getProductIds()) {
            Product p = this.productRepo.findById(id).get();
            products.add(p);
            p.setQuantity(p.getQuantity() - 1);
            p.setSold(p.getSold() + 1);
            this.productRepo.save(p);
        }
            return Optional.of(this.orderRepo.save(new Order(member,
                orderDto.getPhoneNumber(), orderDto.getAddress(),
                orderDto.getCity(), orderDto.getPostalCode(),
                orderDto.getToDoor(), products)));
    }
}
