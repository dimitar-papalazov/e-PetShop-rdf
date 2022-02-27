package mk.ukim.finki.vbs.web.service;

import mk.ukim.finki.vbs.web.model.Product;
import mk.ukim.finki.vbs.web.model.dto.ProductDto;
import mk.ukim.finki.vbs.web.model.enumerations.Type;
import mk.ukim.finki.vbs.web.model.exceptions.InvalidProduct;
import mk.ukim.finki.vbs.web.model.exceptions.InvalidType;
import mk.ukim.finki.vbs.web.model.exceptions.ProductNotFoundException;
import mk.ukim.finki.vbs.web.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> findAll() {
        return this.productRepository.findAll();
    }

    public Product findProduct(Long id) {
        return this.productRepository.findById(id).orElseThrow(InvalidProduct::new);
    }

    public List<Product> findMostSellingProducts() {
        List<Product> products = findAll();
        products.sort((p1, p2) -> p2.getSold().compareTo(p1.getSold()));

        if (products.size() <= 6) {
            return products;
        }
        return products.subList(0, 6);
    }

    public List<Product> findSimilarProducts(Long id) {
        Product product = this.findProduct(id);
        List<Product> products = findAll();
        products.sort((p1, p2) -> p2.getSold().compareTo(p1.getSold()));
        return products.stream()
                .filter((x) -> x.getType().equals(product.getType()))
                .collect(Collectors.toList())
                .subList(0, 4);
    }

    public Product deleteById(Long id) {
        Product product = findProduct(id);
        this.productRepository.delete(product);
        return product;
    }

    public List<Product> findAllByTypeLike(Long typeId) {
        Type type = Type.values()[typeId.intValue()];
        if (type == null) {
            throw new InvalidType();
        }
        return this.productRepository.findAllByTypeLike(type);
    }

    public Optional<Product> addProduct(ProductDto productDto) {
        Type type = Type.values()[productDto.getType().intValue()];
        if (type == null) {
            throw new InvalidType();
        }
        this.productRepository.deleteByName(productDto.getName());
        return Optional.of(this.productRepository.save(new Product(type,
                productDto.getImageUrl(), productDto.getName(),
                productDto.getPrice(), productDto.getQuantity(),
                productDto.getSale(), productDto.getSold())));
    }

    public Optional<Product> updateProduct(Long id, ProductDto productDto) {
        Product product =
                this.productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));

        product.setName(product.getName());
        product.setPrice(productDto.getPrice());
        product.setQuantity(productDto.getQuantity());

        Type type = Type.values()[productDto.getType().intValue()];
        if (type == null) {
            throw new InvalidType();
        }
        product.setType(type);

        product.setSold(productDto.getSold());
        product.setSale(productDto.getSale());
        product.setImageUrl(productDto.getImageUrl());

        return Optional.of(this.productRepository.save(product));
    }
}
